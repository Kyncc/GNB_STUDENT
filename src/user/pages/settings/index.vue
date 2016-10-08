<template>
<div class='settings'>
  <x-header :left-options="{showBack: true}">设置</x-header>
  <group>
    <cell title="应用评分" link="javascript:;" v-touch:tap="_openStore">
      <span class="demo-icon" slot="icon"></span>
    </cell>
    <cell title="意见反馈" link="advice">
      <span class="demo-icon" slot="icon"></span>
    </cell>
    <cell title="退出登录" v-touch:tap="_quitlogin"  link="javascript:void(0);">
      <span class="demo-icon" slot="icon"></span>
    </cell>
     <cell title="清除缓存" v-touch:tap="_clear">
      <span class="demo-icon" slot="icon"></span>
    </cell>
    <cell title="检查更新" :value="'当前版本号:V'+ version" v-touch:tap="_update">
      <span class="demo-icon" slot="icon"></span>
    </cell>
  </group>
  <alert :show.sync="show" title="清除缓存成功"></alert>
  <confirm :show.sync="confirm" confirm-text="确定" cancel-text="取消" title="发现新版本是否更新" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>
  <confirm :show.sync="quit" confirm-text="确定" cancel-text="取消" title="是否退出登录" @on-confirm="_quit('确认')" @on-cancel="_quit('取消')"></confirm>
</div>
</template>

<script>
import {  XHeader,  Cell,  Group,  Alert,  Confirm} from 'vux'
import './setting.less'
import {  updateVersion, quitToken} from '../../actions.js'
import {  fetchVersion,  fetchToken} from '../../getters.js'

export default {
  components: {
    XHeader,
    Cell,
    Group,
    Alert,
    Confirm
  },
  data() {
    return {
      version: '1.0.0',
      show: false,
      confirm: false,
      quit:false
    }
  },
  vuex: {
    actions: {
      updateVersion,quitToken
    },
    getters: {
      fetchVersion,
      fetchToken
    }
  },
  methods: {
    _clear() {
      this.show = true
    },
    _quitlogin(){
        this.quit = true
    },
    _quit(type) {
        if(type=='确认'){
          this.$router.replace('/');
            // this.quitToken({token:this.fetchToken},()=>{
            //     this.$router.replace('/')
            // })
        }
    },
    onAction(type) {
      if (type == '确认') {
        let start = true;
        let dtask = plus.downloader.createDownload("http://www.chinasanbao.com/app/gnb-student.apk", {}, (d, status)=> {
          if (status == 200) {
            console.log('下载完成：' + d.filename);
            plus.ui.toast('下载完成：' + d.filename);
            void plus.runtime.install('_downloads/gnb-student.apk');
          } else {
            console.log('下载失败：' + status);
            plus.ui.toast('下载失败：' + status);
          }
        });
        if (start) {
          if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_WIFI) {
            console.log("开始下载");
            plus.ui.toast('开始下载');
            dtask.start();
            start = false;
          } else {
            plus.ui.toast('非WIFI环境无法下载');
          }
        } else {
          console.log("任务已经开始下载");
          plus.ui.toast('任务已经开始下载');
        }
      }
    },
    _update() {
      this.updateVersion({
        token: this.fetchToken
      }, () => {
        if (this.fetchVersion.currentVersion != this.version) {
          this.confirm = true
        }
      })
    },
    _openQQ() {
      window.location.href = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=458410557&card_type=group&source=qrcode";
    },
    _openStore() {
      window.location.href = "market://details?id=io.dcloud.HelloH5";
    }
  }
}
</script>

<style lang="less">
body {
    -webkit-touch-callout: none;
}
.settings {
    .vux-header {
        color: #fff;
        background-color: #4bb7aa;
    }
    .weui_cells {
        margin-top: 0;
    }
    .vux-no-group-title {
        margin-top: 0;
    }
    .vux-header .vux-header-left,
    .vux-header .vux-header-right {
        font-size: 16px;
    }
    .vux-header .vux-header-left .vux-header-back:before {
        border-color: #fff;
    }
    .vux-header .vux-header-title,
    .vux-header h1 {
        margin-left: 88px;
    }
}
</style>
