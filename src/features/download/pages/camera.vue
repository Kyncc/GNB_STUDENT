<template>
  <view-box ref="about" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '拍错题'}">
      <div slot="right" style="margin:0">
        <gnbChangeSub :change.sync='subject'></gnbChangeSub>
      </div>
    </x-header>
    <div>
      <group :gutter='0' title='只展示最近一个月的试卷' v-show='DownloadCamera.list.length'>
        <cell :title='item.name' v-for='(item, index) in DownloadCamera.list' :key='index'>
          <div slot="value" style='color:#4cc0be'>
            <span style='padding:0 5px;line-height:24px;' @click="_download(item)">
              <i class="icon iconfont icon-download" style="font-size:16px;"></i>下载
            </span>
            <span style='padding:0 5px;line-height:24px;' @click="$router.push({name:'myDownload_list', params:{id: item.downloadId}})">
              <i class="icon iconfont icon-chakan" style="font-size:16px;"></i>查看
            </span>
          </div>
        </cell>
      </group>
      <div style="text-align:center;padding:10px 0;">
        <spinner v-if="loading" type="lines"></spinner>
        <p v-else-if="!DownloadCamera.list.length" style="font-size:16px;color:#4cc0be">近一月还未有下载记录</p>
        <p v-else-if="error" @click='_getData()' style="font-size:16px;color:#4cc0be">出错了点我重新加载</p>
      </div>
    </div>
    <share :change.sync='showAction' :showAction='showAction' :content='share.content' :title='share.title' :href='share.href'></share>
  </view-box>
</template>

<script>
import { XButton, XHeader, ViewBox, Group, Cell, PopupPicker, Spinner } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import gnbChangeSub from '@/components/gnb_changeSub'
import Share from '@/components/share'

export default {
  name: 'index',
  components: {
    XButton, XHeader, ViewBox, Group, Cell, PopupPicker, Spinner, Share, gnbChangeSub
  },
  computed: {
    ...mapGetters(['DownloadCamera'])
  },
  data () {
    return {
      loading: true,
      error: false,
      showAction: false,
      share: {
        content: '',
        title: '我的拍错题',
        href: ''
      }
    }
  },
  methods: {
    ...mapActions(['getDownloadCamera', 'clearDownloadCamera']),
    _download (item) {
      this.share.href = item.url
      this.share.content = item.name
      this.showAction = true
    },
    _getData () {
      this.clearDownloadCamera()
      this.loading = true
      this.getDownloadCamera({subject: this.subject}).then(() => {
        this.error = false
        this.loading = false
      }).catch((e) => {
        this.error = true
        this.loading = false
      })
    }
  },
  watch: {
    subject () {
      this._getData()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'download') {
        vm._getData()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    // 弹窗的返回键处理
    if (this.showAction) {
      this.showAction = false
      next(false)
    } else {
      next()
    }
  }
}
</script>
