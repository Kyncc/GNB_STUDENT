<template>
    <view-box v-ref:view-box class="cameraIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                拍错题
                <a slot="right" v-link="{path: 'camera/history'}" >历史记录</a>
            </x-header>
        </div>

        <div style="margin-top:46px;" >
              <img id="defaultimg" src="../../assets/logo.png" />
            <!--<div class="img" v-touch:tap="_camera()">
                <i class="icon iconfont icon-camera"></i>
                <p>横屏拍照，注意尽量对焦哦</p>
            </div>-->
        </div>

        <file-base64 id="base64" :multiple="true" :done="getFiles" style="display:none"></file-base64>


      
       

        <!--<tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
			 <x-button type="primary" v-touch:tap="_history()">拍题记录</x-button>
        </tabbar>-->

	</view-box>
</template>

<script>
import {XHeader,Panel,ViewBox,Tabbar, TabbarItem,XButton} from 'vux'
import fileBase64 from '../componts/vue-file-base64-camera.vue';
import Cropper from 'Cropperjs'


export default {
    components: {
       XHeader,Panel,ViewBox,Tabbar, TabbarItem,XButton,fileBase64
    },
    methods: {
        _history(){
            this.$router.go(`/camera/history`);
        },
        _camera(){
            document.getElementById('base64').click();
        },
        getFiles(files){
            this.imgSrc = files[0].base64;
            console.log(files);
        }
    },
    data(){
        return{
           imgSrc:''
        }
    },
    computed:{

    },
    ready(){

        var image = document.getElementById('defaultimg');
        var cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        crop: function(e) {
            console.log(e.detail.x);
            console.log(e.detail.y);
            console.log(e.detail.width);
            console.log(e.detail.height);
            console.log(e.detail.rotate);
            console.log(e.detail.scaleX);
            console.log(e.detail.scaleY);
        }
        });

    }
}
</script>
