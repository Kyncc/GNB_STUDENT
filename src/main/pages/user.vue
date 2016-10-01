<template>
<view-box v-ref:view-box class='user vux-scroller-header-box'>
  <div style="height:46px;">
    <x-header :left-options="{showBack: false}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">个人中心<a slot="right" v-touch:tap="_quit">退出</a></x-header>
  </div>
  <scroller lock-x v-ref:scroller height="-46px">
    <div>
      <div class="info">
        <img class="defaultimg" :src="imgSrc" />
        <p class="phone">&nbsp;{{fetchPhone}}&nbsp;</p>
        <div class="upload" v-touch:tap="_upload">
          上传头像
        </div>
      </div>
      <group style="padding-bottom:100px;">
        <cell title="个人资料" link="../user/info/">
          <span class="icon icon-info" slot="icon"></span>
        </cell>
        <!-- <cell title="我的教材" link="../user/textBook/">
            <span class="icon icon-textbook" slot="icon"></span>
        </cell> -->
        <cell title="我的班级" link="javascript:void(0);" v-touch:tap="_myClass">
          <span class="icon icon-class" slot="icon"></span>
        </cell>
        <cell title="我的会员" link="../user/member/">
          <span class="icon icon-member" slot="icon"></span>
        </cell>
        <cell title="邀请好友" link="../user/invite/">
          <span class="icon icon-invite" slot="icon"></span>
        </cell>
        <cell title="设置" link="../user/settings/">
          <span class="icon icon-settings" slot="icon"></span>
        </cell>
        <cell title="修改密码" link="../user/resetPwd/">
          <span class="icon icon-resetPwd" slot="icon"></span>
        </cell>
      </group>
    </div>
  </scroller>
  <actionsheet :show.sync="showsheet" cancel-text="取消" :menus="menus" @on-click-menu="_uploadclick" show-cancel></actionsheet>
  <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="确定退出归纳本吗" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>
  <!-- <file-base64 id="base64" :multiple="true" :done="galleryImgs" style="display:none"></file-base64> -->
</view-box>
</template>

<script>
import {XHeader,Cell,Group,Confirm,Scroller,Actionsheet,ViewBox} from 'vux'
import * as _ from '../../config/whole.js'
// import fileBase64 from 'vue-file-base64'
import { fetchPhone, fetchHeadImg } from '../getters.js'

export default {
    components: {
        XHeader,Cell,Group,Confirm,Scroller,Actionsheet,ViewBox
    },
    vuex:{
        getters:{
            fetchPhone,
            fetchHeadImg
        }
    },
    methods: {
        onAction(type) {
            if(type=='确认'){
                plus.runtime.quit()
            }else{
                return
            }
        },
        _quit(){
            this.show = true
        },
        // getFiles(files){
        //     this.imgSrc = files[0].base64
        // },
        getImage(){
            let self  = this
            let cmr = plus.camera.getCamera();
			cmr.captureImage(function(p) {
				plus.io.resolveLocalFileSystemURL(p, function(entry) {
					self.imgSrc = entry.toLocalURL()
                    console.log(self.imgSrc)
				})
			})
        },
        galleryImgs(){
            let self = this
            plus.gallery.pick(function(e) {
                self.imgSrc = e.files[0]
                console.log(self.imgSrc)
			}, function(e) {
                 _.toast("取消选择图片")
			}, {
				filter: "image",
				multiple: true
			})
        },
        _myClass(){
            _.toast('敬请期待')
        },
        _upload(){
            this.showsheet = true
        },
        _uploadclick (val) {
            if(val == 'menu1'){
                this.getImage()
            }else if(val =='menu2'){
                this.galleryImgs()
            }
            //document.getElementById('base64').click()
        }
    },
    data(){
        return {
            show: false,
            showsheet: false,
            imgSrc:'',
            mask: false,
            menus: {
                menu1: '拍照',
                menu2: '从相册选择'
            },
        }
    },
    ready () {
        this.imgSrc = this.fetchHeadImg
        this.$nextTick(() => {
            this.$refs.scroller.reset()
        })
    }
}
