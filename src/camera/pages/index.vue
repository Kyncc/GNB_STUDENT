<template>
    <view-box v-ref:view-box class="cameraIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true,preventGoBack:true}"  @on-click-back="_back()">
                拍错题
                <a slot="right" v-link="{path: '/camera/history'}">拍题记录</a>
            </x-header>
        </div>

        <div style="margin-top:46px;" >
            <div class="img">
                <i class="icon iconfont icon-camera"  v-touch:tap="getImage()"></i>
                <p>横屏拍照，尽量注意对焦哦</p>
            </div>
        </div>
        <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom" >
            <!--<x-button style="width:40%;margin:3% 0 3% 7%;border-radius:5px;"  type="primary" v-touch:tap="getImage()">拍照</x-button>-->
            <x-button style="width:100%;border-radius:0px;background:#fff;color:#000" type="primary" v-touch:tap="galleryImgs()">从相册选择</x-button>
       </tabbar>
</template>

<script>
import {XHeader,Panel,ViewBox,Tabbar,TabbarItem,XButton} from 'vux'
import * as _ from '../../config/whole.js'
import { setCameraImg } from '../actions.js'

export default {
    components: {
       XHeader,Panel,ViewBox,Tabbar,TabbarItem,XButton
    },
    vuex:{
        actions:{
            setCameraImg
        }
    },
    methods: {
        _back(){
            this.$router.go(`/main`);
        },
        getImage(){
            let cmr = plus.camera.getCamera()
            let self = this
			cmr.captureImage(function(p) {
				plus.io.resolveLocalFileSystemURL(p, function(entry) {
					self.setCameraImg(entry.toLocalURL())
                    self.$router.replace('/camera/photo')
				})
			})
        },
        galleryImgs(){
            let self = this
            plus.gallery.pick(function(e) {
                self.setCameraImg(e.files[0])
                self.$router.replace('/camera/photo')
			}, function(e) {
                 _.toast("取消选择图片")
			}, {
				filter: "image",
				multiple: true
			})
        }
    }
}
</script>
