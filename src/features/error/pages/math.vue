<template>
  <div>
    <group>
      <card v-for='(error, index) in errorMath.list' :key='index'>
        <div class="weui-panel__hd" slot="header">
          <flexbox>
            <flexbox-item :span="8" style="color:#4bb7aa">来源：{{error.from}}</flexbox-item>
            <flexbox-item :span="4" style="text-align:right">{{error.time | ymd}}</flexbox-item>
          </flexbox>
        </div>
        <div slot="content" @click="show()">
          <img src="http://img.guinaben.com/workbookPlatePic/f1b3233be034496999a7cb894845eace-stem-088838.png-errorList"/>
        </div>
        <div slot="footer">
          <div class="weui-cell">
            <div class="weui-cell__bd" style="text-align:right">
              <x-button mini type="primary" @click.native="showErrorPopup=true">错误类型</x-button>
              <x-button mini plain type="primary">参考例题</x-button>
              <x-button mini plain type="primary" @click.native="showCommentPopup=true">查看点评</x-button>
            </div>
          </div>
        </div>
      </card>
    </group>
    <div style="text-align:center;padding:20px 0;">
      <spinner v-if="loading" type="lines"></spinner>
      <div>
        <p style="font-size:16px;color:#4BB7AA" v-if="loadingNoData">已经加载全部错题~</p>
        <p style="font-size:16px;color:#4BB7AA" v-if="!loadingNoData && !loading" >点我加载更多</p>
      </div>
    </div>
    <!--照片放大 -->
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
    <!--错误选择 -->
    <div v-transfer-dom>
      <popup v-model="showErrorPopup" class="checker-popup">
        <div style="padding:10px 10px 0 10px;">
          <checker type="radio" v-model="errorType" default-item-class="check-item" selected-item-class="check-item-selected" disabled-item-class="check-item-disabled">
            <checker-item value="1" @on-item-click="onItemClick">审题不清</checker-item>
            <checker-item value="2" @on-item-click="onItemClick">概念模糊</checker-item>
            <checker-item value="3" @on-item-click="onItemClick">思路不清</checker-item>
            <checker-item value="4" @on-item-click="onItemClick">运算错误</checker-item>
            <checker-item value="5" @on-item-click="onItemClick">粗心大意</checker-item>
            <checker-item value="6" @on-item-click="onItemClick">方法不对</checker-item>
            <checker-item value="7" @on-item-click="onItemClick">时间不够</checker-item>
            <checker-item value="0" @on-item-click="onItemClick">我不知道</checker-item>
          </checker>
        </div>
      </popup>
    </div>
    <!--教师点评 -->
    <div v-transfer-dom>
      <popup v-model="showCommentPopup" height="200px" @on-first-show="resetScroller">
        <scroller height="200px" lock-x ref="scroller">
          <div>
            <p v-for="i of 10">{{i}}</p>
          </div>
        </scroller>
      </popup>
    </div>
  </div>
</template>

<script>
import {Group, Card, Cell, Checker, CheckerItem, Spinner, Flexbox, FlexboxItem, XButton, Popup, Previewer, Scroller, TransferDomDirective as TransferDom} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'math',
  components: {
    Group, Card, Cell, Checker, CheckerItem, Spinner, Flexbox, FlexboxItem, XButton, Previewer, Popup, Scroller
  },
  computed: {
    ...mapGetters(['errorMath'])
  },
  data () {
    return {
      loading: false,
      loadingNoData: false,
      showCommentPopup: false,
      showErrorPopup: false,
      errorType: '',
      check: '花跟叶',
      list: [{
        w: 800,
        h: 800,
        src: `http://img.guinaben.com/workbookPlatePic/f1b3233be034496999a7cb894845eace-stem-088838.png-errorList`
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
    ...mapActions(['setCollectScroll', 'getError', 'clearError']),
    _getData () {
      this.loading = true
      this.getError().then((res) => {
        if (res.data.data.list.length < 10) {
          this.loadingNoData = true
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    show () {
      this.$refs.previewer.show()
    },
    resetScroller () {
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    },
    onItemClick (value, disabled) {
      if (!this.disabled) {
        this.errorType = ''
        this.showErrorPopup = false
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'index') {
        vm.clearError()
        vm._getData()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    // this.setCollectScroll(this.$parent.$refs.viewBoxBody.scrollTop)
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
.check-item {
  width:20%;
  background-color: #ddd;
  color: #222;
  font-size: 14px;
  padding: 8px 12px;
  margin-right: 10px;
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
