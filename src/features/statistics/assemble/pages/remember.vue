<template>
  <div>
    <card v-for='(error, index) in AssembleRemember.index.list' :key='index'>
      <div class="weui-panel__hd" slot="header">
        <flexbox>
          <flexbox-item :span="8" style='color:#4cc0be'>{{error.workbookName}}</flexbox-item>
          <flexbox-item :span="4" style="text-align:right">{{error.time | ymd}}</flexbox-item>
        </flexbox>
      </div>
      <div slot="content">
        <div @click="show(error.photo)">
          <img v-lazy="error.photo.url+'-errorList'"/>
        </div>
      </div>
      <div slot="footer">
        <div class="weui-cell">
          <flexbox class="weui-cell__bd">
            <flexbox-item :span="4">
              <x-button mini type="primary" :plain="error.errorComment.length > 0" @click.native="_showErrorPopup(error, index)">{{error.errorComment.length ? error.errorComment : '错误原因'}}</x-button>
            </flexbox-item>
            <flexbox-item :span="4">
              <x-button mini type="primary" plain @click.native="$router.push({name: 'comment', params: {wbeid: error.id}})" v-if='error.comment'>查看点评</x-button>
            </flexbox-item>
            <flexbox-item :span="4" style='text-align:right;'
              @click.native="setStatisticsRememberAssembleUpdate({id: error.id, index: index})">
              <i v-if='error.isAssembly' class="icon iconfont icon-correct" style="color:#4cc0be;margin-right:1rem;"></i>
              <i v-else class="icon iconfont icon-icon073102" style="color:#4cc0be;margin-right:1rem;" ></i>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
    </card>
    <div style="text-align:center;padding:20px 0;">
      <spinner v-if="loading" type="lines"></spinner>
      <div>
        <p style="font-size:16px;color:#4cc0be" v-if="loadingNoData">已经加载全部错题~</p>
        <p style="font-size:16px;color:#4cc0be" v-if="!loadingNoData && !loading" @click="_getData">点我加载更多</p>
      </div>
    </div>
    <!--照片放大 -->
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
    <!--组卷个数
    <div class='assembleCount'
      @click="$router.push({name: 'statisticsRemember_assemble', params: {subject: $route.params.subject}})">
      已选<br/>{{AssembleRemember.count}}
    </div>-->
    <!--错误选择 -->
    <div v-transfer-dom>
      <popup v-model="showErrorPopup" class="checker-popup">
        <group title='选择错误原因：'>
          <div style="padding:10px 10px 0 10px;">
            <checker type="radio" v-model="errorType.errorComment" default-item-class="check-item" selected-item-class="check-item-selected" disabled-item-class="check-item-disabled">
              <checker-item value="审题不清" @on-item-click="onItemClick">审题不清</checker-item>
              <checker-item value="概念模糊" @on-item-click="onItemClick">概念模糊</checker-item>
              <checker-item value="思路不清" @on-item-click="onItemClick">思路不清</checker-item>
              <checker-item value="运算错误" @on-item-click="onItemClick">运算错误</checker-item>
              <checker-item value="粗心大意" @on-item-click="onItemClick">粗心大意</checker-item>
              <checker-item value="方法不对" @on-item-click="onItemClick">方法不对</checker-item>
              <checker-item value="时间不够" @on-item-click="onItemClick">时间不够</checker-item>
              <checker-item value="我不知道" @on-item-click="onItemClick">我不知道</checker-item>
            </checker>
          </div>
        </group>
      </popup>
    </div>
  </div>
</template>

<script>
import {XHeader, Group, Card, Cell, Checker, CheckerItem, Spinner, Flexbox, FlexboxItem, XButton, Popup, Previewer, TransferDomDirective as TransferDom} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'remember',
  components: {
    XHeader, Group, Card, Cell, Checker, CheckerItem, Spinner, Flexbox, FlexboxItem, XButton, Popup, Previewer
  },
  computed: {
    ...mapGetters(['AssembleRemember'])
  },
  data () {
    return {
      loading: false,
      loadingNoData: false,
      showErrorPopup: false,
      errorType: {
        chapterId: '',
        id: '',
        errorComment: '',
        index: ''
      },
      list: [{
        w: 0,
        h: 0,
        src: ``
      }],
      options: {
        preload: [1, 1],
        bgOpacity: 1,
        fullscreenEl: false,
        history: true
      }
    }
  },
  directives: {
    TransferDom
  },
  methods: {
    ...mapActions(['getStatisticsRemember', 'setStatisticsRememberAssembleUpdate', 'setStatisticsScroll', 'getStatisticsComment']),
    _getData () {
      this.loading = true
      this.getStatisticsRemember()
        .then((res) => {
          if (res.data.data.offset.length === 0) {
            this.loadingNoData = true
          }
          console.log(res.data.data.offset)
          console.log(res.data.data.offset.length)
          this.loading = false
        })
    },
    show (img) {
      this.list[0].w = img.width
      this.list[0].h = img.height
      this.list[0].src = img.url
      this.$nextTick(() => {
        this.$refs.previewer.show(0)
      })
    },
    // 类型错误弹窗
    _showErrorPopup (error, index) {
      this.showErrorPopup = true
      this.errorType.index = index
      this.errorType.errorComment = error.errorComment
      this.errorType.id = error.id
      this.errorType.chapterId = error.chapterId
    },
    // 选择错误原因
    onItemClick (value) {
      this.showErrorPopup = false
      this.getStatisticsComment({
        chapterId: this.errorType.chapterId,
        index: this.errorType.index,
        errorComment: value,
        id: this.errorType.id,
        type: 'remember'
      }).then(() => {
        this.errorType.errorComment = ''
        this.$vux.toast.show({text: '设置错误原因成功!', type: 'text', time: 1500, position: 'bottom'})
      }).catch(() => {
        this.errorType.errorComment = ''
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.AssembleRemember.index.reset) {
        vm._getData()
      }
      vm.$parent.$refs.viewBoxBody.scrollTop = vm.AssembleRemember.index.scroll
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setStatisticsScroll({type: 'remember', height: this.$parent.$refs.viewBoxBody.scrollTop})
    if (this.showErrorPopup) {
      this.showErrorPopup = false
      next(false)
    } else {
      next()
    }
  }
}
</script>
<style scoped>
.weui-btn + .weui-btn{
  margin-top:0;
}
.assembleCount{
  position: fixed;
  background:#4cc0be;
  color:#fff;
  font-size: .9rem;
  height: 3.5rem;
  width: 3.5rem;
  box-shadow: 2px 2px 7px #4cc0be;
  box-sizing: border-box;
  padding:.5rem .75rem;
  border-radius: 50%;
  bottom: 10%;
  right: 5%;
  text-align: center;
}
.checker-popup{
  background: #fff;
}
.check-item {
  background-color: #ddd;
  color: #222;
  font-size: 14px;
  padding: 8px 0;
  width:32%;
  margin-right: 0px;
  line-height: 18px;
  text-align:center;
  margin-bottom: 10px;
  border-radius: 15px;
}
.check-item-selected {
  background-color: #4cc0be;
  color: #fff;
}
.check-item-disabled {
  color: #999;
}
</style>
