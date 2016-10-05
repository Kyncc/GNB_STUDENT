<template>
    <view-box v-ref:view-box class="cameraIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                拍错题
                <a slot="right" v-link="{path: 'camera/history'}" >历史记录</a>
            </x-header>
        </div>

        <div style="margin-top:46px;" >
            <div class="img">
                <i class="icon iconfont icon-camera"></i>
                <p>横屏拍照，注意尽量对焦哦</p>
            </div>
        </div>
      <x-button @click="getImage()">拍照</x-button>
      <x-button @click="galleryImgs()">从相册选择</x-button>
</template>

<script>
import {XHeader,Panel,ViewBox,Tabbar, TabbarItem,XButton} from 'vux'
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
        getImage(){
            let cmr = plus.camera.getCamera()
            let self = this
			cmr.captureImage(function(p) {
				plus.io.resolveLocalFileSystemURL(p, function(entry) {
					self.setCameraImg(entry.toLocalURL())
                    self.$router.go('/camera/photo')
				})
			})
        },
        galleryImgs(){
            let self = this
            plus.gallery.pick(function(e) {
                self.setCameraImg(e.files[0])
                self.$router.go('/camera/photo')
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
