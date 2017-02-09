<template>
  <view-box v-ref:view-box class='user vux-scroller-header-box'>
    <div style="height:46px;">
      <x-header :left-options="{showBack: false}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">个人中心</x-header>
    </div>

    <scroller lock-x v-ref:scroller height="-47px">
      <div>
        <div class="info">
          <img class="defaultimg" :src="userImg" @click="_upload"/>
          <p class="phone">&nbsp;{{userName}}&nbsp;</p>
          <div class="upload" @click="_upload">
            上传头像
          </div>
        </div>
        <group style="padding-bottom:10px;">
          <cell title="个人资料" link="/main/user/settings/info">
            <span class="icon iconfont icon-userInfo" style="color:#5ECFE7" slot="icon"></span>
          </cell>
          <cell title="我的班级" link="/main/user/class/">
            <span class="icon iconfont icon-hat" style="color:#73D179" slot="icon"></span>
          </cell>
        </group>
        <group>
          <cell title="设置" link="/main/user/settings/">
            <span class="icon iconfont icon-settingfull" style="color:#794BB8"  slot="icon"></span>
          </cell>
          <cell title="检查更新" @click="_update" is-link>
            <div v-if="isUpdate" class="badge-value" slot="value" class="vux-center-v" style="display:inline-block">
              <badge text="新版本"></badge>
            </div>
            <span class="icon iconfont icon-update" style="color:#ABC97C;" slot="icon"></span>
          </cell>
        </group>
      </div>
    </scroller>
    <actionsheet :show.sync="showsheet" cancel-text="取消" :menus="menus" @on-click-menu="_uploadclick" show-cancel></actionsheet>
  </view-box>
</template>

<script>
import {XHeader,Cell,Group,Confirm,Scroller,Actionsheet,ViewBox,Badge} from 'vux'
import {mapActions,mapGetters} from 'vuex'
import * as _ from 'config/whole'
import './index.less'

export default {
  components: {
    XHeader,Cell,Group,Confirm,Scroller,Actionsheet,ViewBox,Badge
  },
  methods: {
    ...mapActions(['setHeadImg']),
    //从相机获取图片
    getImage(){
      let self  = this
      //唤起本机相机
      let cmr = plus.camera.getCamera();
      cmr.captureImage(function(p) {
        plus.io.resolveLocalFileSystemURL(p,function(entry){
          self.setHeadImg(entry.toLocalURL())
          self.$router.go('user/photo');
        })
      });
    },
    //从相册获取图片
    galleryImgs(){
      let self = this
      //唤起本机相册选择图片并获取路径
      plus.gallery.pick(function(e) {
        self.setHeadImg(e.files[0])
        self.$router.go('user/photo');
      }, function(e) {
         _.toast("取消选择图片")
      }, {
        filter: "image",
        multiple: true
      });
    },
    _upload(){
      this.showsheet = true
    },
    //更新APP
    _update(){
        if(this.isUpdate){
            if(this.System == 'IOS'){
              window.location.href = "itms-apps://itunes.apple.com/gb/app/yi-dong-cai-bian/id391945719?mt=8";
              return;
            }
            let start = true;
            let dtask = plus.downloader.createDownload("http://www.chinasanbao.com/app/com.sanbao.guinaben.student.apk", {}, (d, status)=> {
              if (status == 200) {
                console.log('下载完成：' + d.filename);
                plus.ui.toast('下载完成：' + d.filename);
                void plus.runtime.install('_downloads/com.sanbao.guinaben.student.apk');
              } else {
                console.log('下载失败：' + status);
                plus.ui.toast('下载失败：' + status);
              }
            });
            if (start) {
                console.log("开始下载");
                plus.ui.toast('开始下载');
                dtask.start();
                start = false;
            } else {
              console.log("任务已经开始下载");
              plus.ui.toast('任务已经开始下载');
            }
        }else{
          _.toast("您当前是最新版本");
        }
    },
    _uploadclick (val) {
      if(val == 'menu1'){
        this.getImage()
      }else if(val =='menu2'){
        this.galleryImgs()
      }
    }
  },
  data(){
    return {
      showsheet: false,
      menus: {
        menu1: '拍照',
        menu2: '从相册选择'
      }
    }
  },
  ready () {
    this.$nextTick(() => {
      this.$refs.scroller.reset()
    });
  },
  computed:{
    ...mapGetters(['User','System']),
    userName(){
      return this.User.name;
    },
    userImg(){
      return this.User.headImg;
    },
    version(){
      return this.User.version;
    },
    isUpdate(){
      if(this.version == '2.0.0'){
        return false;
      }
      return true
    }
  }
}
