<template>
  <div>
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: this.$route.params.name}">
        <div slot="right">
          <i class="icon iconfont icon-filter" style="padding:10px;margin:0 -10px 0 0"
            @click="$router.push({name:'statisticsGood_options'})">
          </i>
        </div>
      </x-header>
    </div>
    <card v-for='(error, index) in AssembleCamera.index.list' :key='index'>
      <div class="weui-panel__hd" slot="header">
        <flexbox>
          <!-- <flexbox-item :span="8">{{error.from}}</flexbox-item> -->
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
          <div class="weui-cell__bd" style="text-align:right">
            <x-button mini type="primary" :plain="error.errorComment.length > 0" @click.native="_showErrorPopup(error, index)">{{error.errorComment.length ? error.errorComment : '错误类型'}}</x-button>
          </div>
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
    <!--错误选择 -->
    <div v-transfer-dom>
      <popup v-model="showErrorPopup" class="checker-popup">
        <group title='选择错误原因：'>
          <div style="padding:10px 10px 0 10px;">
            <checker type="radio" :value="errorType.errorComment" default-item-class="check-item" selected-item-class="check-item-selected" disabled-item-class="check-item-disabled">
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
  name: 'camera',
  components: {
    XHeader, Group, Card, Cell, Checker, CheckerItem, Spinner, Flexbox, FlexboxItem, XButton, Previewer, Popup
  },
  computed: {
    ...mapGetters(['AssembleCamera'])
  },
  data () {
    return {
      loading: false,
      loadingNoData: false,
      showErrorPopup: false,
      errorType: {
        errorComment: '',
        chapterId: '',
        wbeid: '',
        type: '',
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
    ...mapActions(['getStatisticsCamera', 'setStatisticsCameraAssembleUpdate', 'setStatisticsScroll', 'clearStatistics']),
    _getData () {
      this.loading = true
      this.getStatisticsCamera().then((res) => {
        if (!res.data.data.offset) {
          this.loadingNoData = true
        }
        this.loading = false
      }).catch(() => {
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
      this.errorType.wbeid = error.wbeid
      this.errorType.chapterId = error.chapterId
    },
    // 选择错误类型
    onItemClick (value) {
      this.showErrorPopup = false
      this.errorType.errorComment = ''
      this.setErrorType({
        chapterId: this.errorType.chapterId,
        index: this.errorType.index,
        errorComment: value,
        wbeid: this.errorType.wbeid,
        subject: this.$route.params.subject
      }).then(() => {
        this.$vux.toast.show({text: '设置错误类型成功!', type: 'text', time: 1500, position: 'bottom'})
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm._getData()
      vm.$parent.$refs.viewBoxBody.scrollTop = vm.AssembleCamera.scroll
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setStatisticsScroll({type: 'camera', height: this.$parent.$refs.viewBoxBody.scrollTop})
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
.popover-demo-content {
  padding: 5px 10px;
}
.checker-popup{
  background: #fff;
}
.check-item {
  background-color: #ddd;
  color: #222;
  font-size: 14px;
  padding: 8px 0;
  width:32.3%;
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
