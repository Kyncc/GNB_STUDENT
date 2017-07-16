<template>
  <div>
    <card v-for='(error, index) in errorMath.list' :key='index'>
      <div class="weui-panel__hd" slot="header">
        <flexbox>
          <flexbox-item :span="8" style="color:#4bb7aa">来源：{{error.from}}</flexbox-item>
          <flexbox-item :span="4" style="text-align:right">{{error.time | ymd}}</flexbox-item>
        </flexbox>
      </div>
      <!--上传错题则显示题目，否则显示题干-->
      <div slot="content">
        <div v-if='!error.isUploader' @click="show(error.exerciseImg)">
          <img v-lazy="error.exerciseImg.src+'-errorList'"/>
        </div>
        <div v-else @click="show(error.errorImg[0])">
          <img v-lazy="error.errorImg[0].src+'-errorList'"/>
        </div>
      </div>
      <div slot="footer">
        <div class="weui-cell">
          <div class="weui-cell__bd" style="text-align:right">
            <x-button mini type="primary" :plain="error.errorType !== -1" @click.native="_showErrorPopup(error, index)">{{error.errorType | errorType}}</x-button>
            <!--<x-button mini plain type="primary">参考例题</x-button>-->
            <x-button mini type="primary" @click.native="_showCommentPopup(error)">查看点评</x-button>
          </div>
        </div>
      </div>
    </card>
    <div style="text-align:center;padding:20px 0;">
      <spinner v-if="loading" type="lines"></spinner>
      <div>
        <p style="font-size:16px;color:#4BB7AA" v-if="loadingNoData">已经加载全部错题~</p>
        <p style="font-size:16px;color:#4BB7AA" v-if="!loadingNoData && !loading" @click="_getData">点我加载更多</p>
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
            <checker type="radio" :value="errorType.type.toString()" default-item-class="check-item" selected-item-class="check-item-selected" disabled-item-class="check-item-disabled">
              <checker-item value="1" @on-item-click="onItemClick">审题不清</checker-item>
              <checker-item value="2" @on-item-click="onItemClick">概念模糊</checker-item>
              <checker-item value="3" @on-item-click="onItemClick">思路不清</checker-item>
              <checker-item value="4" @on-item-click="onItemClick">运算错误</checker-item>
              <checker-item value="5" @on-item-click="onItemClick">粗心大意</checker-item>
              <checker-item value="6" @on-item-click="onItemClick">方法不对</checker-item>
              <checker-item value="7" @on-item-click="onItemClick">时间不够</checker-item>
              <checker-item value="0" @on-item-click="onItemClick">不知道啊</checker-item>
            </checker>
          </div>
        </group>
      </popup>
    </div>
  </div>
</template>

<script>
import {Group, Card, Cell, Checker, CheckerItem, Spinner, Flexbox, FlexboxItem, XButton, Popup, Previewer, TransferDomDirective as TransferDom} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'math',
  components: {
    Group, Card, Cell, Checker, CheckerItem, Spinner, Flexbox, FlexboxItem, XButton, Previewer, Popup
  },
  computed: {
    ...mapGetters(['errorMath'])
  },
  data () {
    return {
      loading: false,
      loadingNoData: false,
      showErrorPopup: false,
      errorType: {
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
    ...mapActions(['setErrorScroll', 'getError', 'clearError', 'setErrorType']),
    _getData () {
      this.loading = true
      this.getError().then((res) => {
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
      this.list[0].src = img.src
      this.$nextTick(() => {
        this.$refs.previewer.show(0)
      })
    },
    // 类型错误弹窗
    _showErrorPopup (error, index) {
      this.showErrorPopup = true
      this.errorType.index = index
      this.errorType.type = error.errorType
      this.errorType.wbeid = error.wbeid
      this.errorType.chapterId = error.chapterId
    },
    // 评论
    _showCommentPopup (error) {
      if (!error.comment) {
        this.$vux.toast.show({text: '教师未点评!', type: 'text', time: 1500, position: 'bottom'})
      } else {
        this.$router.push({name: 'error_comment', params: {webid: error.wbeid}})
      }
    },
    // 选择错误类型
    onItemClick (value) {
      this.showErrorPopup = false
      this.setErrorType({
        chapterId: this.errorType.chapterId,
        index: this.errorType.index,
        type: value,
        wbeid: this.errorType.wbeid
      }).then(() => {
        this.$vux.toast.show({text: '设置错误类型成功!', type: 'text', time: 1500, position: 'bottom'})
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'index') {
        vm.clearError()
        if (vm.errorMath.isReset) {
          vm._getData()
        }
      }
      vm.$parent.$refs.viewBoxBody.scrollTop = vm.errorMath.scroll
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setErrorScroll(this.$parent.$refs.viewBoxBody.scrollTop)
    next()
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
  background-color: #FF3B3B;
  color: #fff;
}
.check-item-disabled {
  color: #999;
}
</style>
