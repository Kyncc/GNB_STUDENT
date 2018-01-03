<template>
  <div>
    <card v-for='(error, index) in AssembleCamera.index.list' :key='index'>
      <div class="weui-panel__hd" slot="header">
        <flexbox>
          <flexbox-item :span="8" style='color:#999999'>{{error.chapterName}}</flexbox-item>
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
          <flexbox class="weui-cell__bd" style='color:#586C94;font-size:.7rem;'>
            <flexbox-item :span="4">
              <select v-model="error.errorComment" @change='_changeErrorComment(pindex, index, error, error.errorComment)' class='select-btn weui-btn weui-btn_primary'>
                <option>概念模糊</option>
                <option>粗心大意</option>
                <option>能力不够</option>
                <option>思路不清</option>
              </select>
            </flexbox-item>
            <flexbox-item :span="4"></flexbox-item>
            <flexbox-item :span="4" style='text-align:right;' @click.native="setStatisticsCameraAssembleUpdate({id: error.id, index: index})">
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
  </div>
</template>

<script>
import {Spinner, Tabbar, TabbarItem, Checker, CheckerItem, Group, Card, Cell, Previewer, Flexbox, XButton, FlexboxItem, PopupRadio, TransferDomDirective as TransferDom} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'camera',
  components: {
    Spinner, Tabbar, TabbarItem, Checker, CheckerItem, Group, Card, Cell, Previewer, Flexbox, XButton, FlexboxItem, PopupRadio
  },
  computed: {
    ...mapGetters(['AssembleCamera'])
  },
  data () {
    return {
      loading: false,
      loadingNoData: false,
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
    ...mapActions(['getStatisticsCamera', 'setStatisticsCameraAssembleUpdate', 'setStatisticsScroll', 'getStatisticsComment']),
    _getData () {
      this.loading = true
      this.getStatisticsCamera().then((res) => {
        if (res.data.data.offset.length === 0) {
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
    // 选择错误原因
    _changeErrorComment (pindex, index, error, val) {
      this.getStatisticsComment({
        errorComment: val,
        wbeid: error.wbeid
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.AssembleCamera.index.reset) {
        vm._getData()
      }
      vm.$parent.$refs.viewBoxBody.scrollTop = vm.AssembleCamera.index.scroll
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setStatisticsScroll({type: 'camera', height: this.$parent.$refs.viewBoxBody.scrollTop})
    next()
  }
}
</script>
<style scoped>
.select-btn{
  font-size: .7rem;
  -webkit-appearance: none;
  border: 0;
  outline: 0;
  margin: 0 !important;
}
</style>
