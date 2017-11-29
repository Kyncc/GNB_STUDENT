<template>
 <view-box ref="sync" body-padding-top="96px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '试卷搜索'}">
        <div slot="right" style="margin:0">
          <gnbChangeSub :change.sync='subject'></gnbChangeSub>
        </div>
      </x-header>
      <search placeholder='请输入试卷名称' @on-change="getResult" :autoFixed="false" v-model="name" @on-submit="onSubmit" ref="search"></search>
    </div>
    <div>
      <group gutter="0">
        <template v-for="(list, index) in DownloadPaperSearch.list">
          <cell :title='list.name' :key='index'>
            <div style='color:#4cc0be'>
              <span style='padding:0 5px;line-height:24px;' @click="_download(list)">
                <i class="icon iconfont icon-download" style="font-size:16px;"></i>下载
              </span>
            </div>
          </cell>
        </template>
      </group>
      <div style="text-align:center;padding:20px 0;">
        <spinner v-if="loading" type="lines"></spinner>
        <div v-else>
          <p style="font-size:16px;color:#4cc0be" v-if="loadingNoData">暂无搜索结果~</p>
          <p style="font-size:16px;color:#4cc0be" v-else-if="!loadingNoData" @click="_getData">点我加载更多</p>
        </div>
      </div>
    </div>
    <share :change.sync='showAction' :showAction='showAction' :content='share.content' :title='share.title' :href='share.href'></share>
  </view-box>
</template>

<script>
import { XHeader, ViewBox, Cell, Group, Spinner, Search, PopupPicker } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import gnbChangeSub from '@/components/gnb_changeSub'
import Share from '@/components/share'

export default {
  name: 'PaperSearch',
  components: {
    XHeader, ViewBox, Cell, Group, Spinner, Search, PopupPicker, Share, gnbChangeSub
  },
  computed: {
    ...mapGetters(['User', 'DownloadPaperSearch'])
  },
  data () {
    return {
      name: '',
      loading: false,
      loadingNoData: true,
      subject: '',
      showAction: false,
      share: {
        content: '',
        title: '我的试卷',
        href: ''
      }
    }
  },
  watch: {
    subject (val) {
      if (val.toString().length) {
        this._getData()
      }
    }
  },
  methods: {
    ...mapActions(['getDownloadSearch', 'getDownloadPaper', 'clearDownloadPaperSearch']),
    _download (item) {
      this.getDownloadPaper({downloadId: item.downloadId}).then((res) => {
        this.share.href = res.data.data.url
        this.share.content = item.name
        this.showAction = true
      })
    },
    _getData () {
      this.loading = true
      this.getDownloadSearch({name: this.name, subject: this.subject}).then((res) => {
        if (res.data.data.list.length < 10) {
          this.loadingNoData = true
        }
        this.loadingNoData = false
        this.loading = false
      }).catch(() => {
        this.loadingNoData = true
        this.loading = false
      })
    },
    getResult (val) {
      this.clearDownloadPaperSearch()
      this._getData()
    },
    onSubmit () {
      this.$refs.search.setBlur()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.name = ''
      vm.clearDownloadPaperSearch()
    })
  },
  beforeRouteLeave (to, from, next) {
    this.loadingNoData = true
    this.loading = false
    if (this.showAction) {
      this.showAction = false
      next(false)
    } else {
      next()
    }
  }
}
</script>
<style>
.vux-header-title .vux-cell-box:before{
  border-top:none !important;
}
</style>