<template>
  <div>
    <group>
      <card>
        <div class="weui-panel__hd" slot="header">
          <flexbox>
            <flexbox-item :span="8" style="color:#4bb7aa">来源：精英网</flexbox-item>
            <flexbox-item :span="4" style="text-align:right">2016-04-18</flexbox-item>
          </flexbox>
        </div>
        <div slot="content" @click="show()">
          <img src="http://img.guinaben.com/workbookPlatePic/f1b3233be034496999a7cb894845eace-stem-088838.png-errorList"/>
        </div>
        <div slot="footer">
          <div class="weui-cell weui-cell_access weui-cell_link">
            <div class="weui-cell__bd" style="text-align:right">
              <x-button mini type="primary" @click.native="showErrorPopup=true">错误类型</x-button>
              <x-button mini plain type="primary" >参考例题</x-button>
              <x-button mini plain type="primary"  @click.native="showCommentPopup=true">查看点评</x-button>
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
          <checker v-model="check" default-item-class="check-item" selected-item-class="check-item-selected" disabled-item-class="check-item-disabled">
            <checker-item value="花跟叶" @on-item-click="onItemClick">审题不清</checker-item>
            <checker-item value="鸟与树" @on-item-click="onItemClick">概念模糊</checker-item>
            <checker-item value="我和你" @on-item-click="onItemClick">思路不清</checker-item>
            <checker-item value="运算错误" @on-item-click="onItemClick">运算错误</checker-item>
            <checker-item value="粗心大意" @on-item-click="onItemClick">粗心大意</checker-item>
            <checker-item value="方法不对" @on-item-click="onItemClick">方法不对</checker-item>
            <checker-item value="时间不够" @on-item-click="onItemClick">时间不够</checker-item>
            <checker-item value="我不知道" @on-item-click="onItemClick">我不知道</checker-item>
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
    ...mapGetters([''])
  },
  data () {
    return {
      loading: false,
      loadingNoData: false,
      showCommentPopup: false,
      showErrorPopup: false,
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
    ...mapActions(['setCollectScroll']),
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
        this.showErrorPopup = false
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // vm.$parent.$refs.viewBoxBody.scrollTop = vm.collectMath.scroll
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
