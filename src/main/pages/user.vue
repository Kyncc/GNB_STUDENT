<template>
<view-box v-ref:view-box class='user vux-scroller-header-box'>
  <div style="height:46px;">
    <x-header :left-options="{showBack: false}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">个人中心<a slot="right" v-touch:tap="_quit">退出</a></x-header>
  </div>
  <scroller lock-x v-ref:scroller height="-46px">
    <div>
      <div class="info">
        <img class="defaultimg" :src="fetchHeadImg" />
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
</view-box>
</template>

<script>
import {XHeader,Cell,Group,Confirm,Scroller,Actionsheet,ViewBox} from 'vux'
import * as _ from '../../config/whole.js'
import { fetchPhone, fetchHeadImg } from '../getters.js'
import { setHeadPhoto } from '../actions.js'

export default {
    components: {
        XHeader,Cell,Group,Confirm,Scroller,Actionsheet,ViewBox
    },
    vuex:{
        getters:{
            fetchPhone,
            fetchHeadImg
        },
        actions:{
            setHeadPhoto
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

        getImage(){
            let self  = this
            let cmr = plus.camera.getCamera();
			cmr.captureImage(function(p) {
				plus.io.resolveLocalFileSystemURL(p, function(entry) {
					self.setHeadPhoto(entry.toLocalURL())
                    self.$router.go('user/photo')
				})
			})
        },
        galleryImgs(){
            let self = this
            plus.gallery.pick(function(e) {
                self.setHeadPhoto(e.files[0])
                self.$router.go('user/photo')
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
        }
    },
    data(){
        return {
            show: false,
            showsheet: false,
            menus: {
                menu1: '拍照',
                menu2: '从相册选择'
            },
        }
    },
    ready () {
        this.$nextTick(() => {
            this.$refs.scroller.reset()
        })
    }
}
