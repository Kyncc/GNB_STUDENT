<template>
  <view-box body-padding-top="46px" body-padding-bottom="40px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '记错题'}"></x-header>
    </div>
    <card v-for='(error, index) in AssembleRemember.download' :key='index'>
      <div class="weui-panel__hd" slot="header">
        <flexbox>
          <flexbox-item :span="8" style='color:#999999'>{{error.workbookName}}</flexbox-item>
          <flexbox-item :span="4" style="text-align:right">{{error.time | ymd}}</flexbox-item>
        </flexbox>
      </div>
      <div slot="content">
        <div @click="show(error.photo)">
          <img v-lazy="error.photo.url+'-errorList'"/>
        </div>
      </div>
    </card>
    <div style="text-align:center;padding:10px 0;">
      <spinner v-if="loading" type="lines"></spinner>
      <p v-else-if="AssembleRemember.download.length === 0" style="font-size:16px;color:#4cc0be">您还未有组卷</p>
      <p v-else-if="error" @click='_getData()' style="font-size:16px;color:#4cc0be">出错了点我重新加载</p>
    </div>
    <!--照片放大 -->
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
    <share :change.sync='showAction' :showAction='showAction'
      :content='share.content'
      :title='share.title'
      :href='share.href' @on-share-success='_shareSuccess()'>
    </share>
    <tabbar slot="bottom" style='background-color:#4cc0be;color:#fff' v-show='AssembleRemember.download && AssembleRemember.download.length'>
      <flexbox-item :span="12" style="font-size:.8rem;text-align:center;padding:.25rem 0;" @click.native="_download()">
        <i class="icon iconfont icon-download"></i>下载</flexbox-item>
      </flexbox>
    </tabbar>
  </view-box>
</template>

<script>
import {ViewBox, XHeader, Group, Card, Cell, Spinner, Flexbox, FlexboxItem, Tabbar, TabbarItem, Previewer, TransferDomDirective as TransferDom} from 'vux'
import {mapActions, mapGetters} from 'vuex'
import Share from '@/components/share'

export default {
  name: 'rememberAssemble',
  components: {
    ViewBox, XHeader, Group, Card, Cell, Spinner, Flexbox, FlexboxItem, Tabbar, TabbarItem, Previewer, Share
  },
  computed: {
    ...mapGetters(['AssembleRemember'])
  },
  data () {
    return {
      loading: true,
      error: false,
      showAction: false,
      share: {
        content: '试卷分享',
        title: '我的记错题组卷',
        href: ''
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
    ...mapActions(['getStatisticsRememberAssemble', 'clearStatisticsDownload', 'getStatisticsAssemblUrl', 'clearStatisticsAssemble']),
    _getData () {
      this.clearStatisticsDownload({type: 'remember'})
      this.loading = true
      this.getStatisticsRememberAssemble().then(() => {
        this.error = false
        this.loading = false
      }).catch((e) => {
        this.error = true
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
    _shareSuccess () {
      this._getData()
      this.clearStatisticsAssemble({type: 'remember'})
      this.$router.go(-1)
    },
    _download () {
      this.getStatisticsAssemblUrl({type: 'remember'})
        .then((res) => {
          this.share.href = res.data.data.url
          this.showAction = true
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm._getData()
    })
  },
  beforeRouteLeave (to, from, next) {
    // 弹窗的返回键处理
    if (this.showAction) {
      this.showAction = false
    }
    next()
  }
}
</script>
