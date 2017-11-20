<template>
  <view-box body-padding-top="95px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '试卷搜索'}">
        <gnbChangeSub :change.sync='subject'></gnbChangeSub>
      </x-header>
      <search @on-submit="_getData" @on-change="_getData" v-model.lazy="name" :auto-fixed="false" placeholder="请输入试卷名称" style="position:fixed;z-index:1;"></search>
    </div>
    <div style="padding-top:46px;">
      <group gutter="0" class="gnb_collapse" v-if="!loading">
        <cell :title='item.name' v-for='(item, index) in DownloadPaper.search' :key='index'>
          <div slot="value" style='color:#4cc0be'>
            <span style='padding:0 5px;line-height:24px;' @click="_download(item)">
              <i class="icon iconfont icon-download" style="font-size:16px;"></i>下载
            </span>
          </div>
        </cell>
      </group>
      <div style="text-align:center">
        <spinner v-if="loading" type="dots"></spinner>
      </div>
    </div>
    <share :change.sync='showAction' :showAction='showAction' :content='share.content' :title='share.title' :href='share.href'></share>
  </view-box>
</template>
<script>
import { XHeader, ViewBox, Cell, Group, Spinner, Search } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import gnbChangeSub from '@/components/gnb_changeSub'
import Share from '@/components/share'

export default {
  name: 'PaperSearch',
  components: {
    XHeader, ViewBox, Cell, Group, Spinner, Search, Share, gnbChangeSub
  },
  data () {
    return {
      name: '',
      loading: true,
      subject: '',
      share: {
        content: '',
        title: '我的试卷下载',
        href: ''
      }
    }
  },
  computed: {
    ...mapGetters(['User', 'DownloadPaper'])
  },
  methods: {
    ...mapActions(['getDownloadSearch', 'getDownloadPaper']),
    _getData () {
      this.loading = true
      this.getDownloadSearch({subject: this.subject, name: this.name}).then(() => {
        this.error = false
        this.loading = false
      }).catch((e) => {
        this.error = true
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.name = ''
    })
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  created () {
  }
}
</script>
