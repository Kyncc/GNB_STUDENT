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
    <card v-for='(error, index) in AssembleGood.index.list' :key='index'>
      <div class="weui-panel__hd" slot="header">
        <flexbox>
          <flexbox-item :span="8">来源：{{error.from}}</flexbox-item>
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
            <x-button mini type="primary" :plain="error.errorComment.length > 0" @click.native="_showErrorPopup(error, index)">{{error.errorComment.length ? error.errorComment : '错误类型'}}</x-button>
            <!--<x-button mini plain type="primary">参考例题</x-button>-->
            <x-button mini type="primary" plain @click.native="_showCommentPopup(error)" v-if='error.comment'>查看点评</x-button>
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
  </div>
</template>

<script>
import {XHeader, Group, Card, Cell, Checker, CheckerItem, Spinner, Flexbox, FlexboxItem, XButton} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'good',
  components: {
    XHeader, Group, Card, Cell, Checker, CheckerItem, Spinner, Flexbox, FlexboxItem, XButton
  },
  computed: {
    ...mapGetters(['AssembleGood'])
  },
  data () {
    return {
      loading: false,
      loadingNoData: false
    }
  },
  methods: {
    ...mapActions(['setErrorScroll', 'getError', 'clearError']),
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
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'index') {
        vm.clearError()
        if (vm.AssembleGood.isReset) {
          vm._getData()
        }
      }
      vm.$parent.$refs.viewBoxBody.scrollTop = vm.AssembleGood.scroll
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setErrorScroll({type: 'remember', height: this.$parent.$refs.viewBoxBody.scrollTop})
  }
}
</script>
<style scoped>
.weui-btn + .weui-btn{
  margin-top:0;
}
</style>
