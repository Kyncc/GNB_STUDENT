<template>
    <view-box v-ref:view-box class="cameraIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                剪裁
                <a slot="right" @click="_img">完成</a>
            </x-header>
        </div>
        <div style="margin-top:46px;" >
            <img id="defaultimg" v-el:img :src="fetchHeadPhoto"/>
        </div>
	</view-box>
</template>

<script>
import {XHeader,Panel,ViewBox,Tabbar, TabbarItem,XButton} from 'vux'
import Cropper from 'Cropperjs'
import { fetchHeadPhoto } from '../getters.js'
import { fetchToken } from '../../user/getters.js'
import { postHeadImg } from '../actions.js'
import { setHeadImg } from '../../login/actions.js'

export default {
    components: {
       XHeader,Panel,ViewBox,Tabbar, TabbarItem,XButton
    },
    methods: {
        _img(){
            // let cropBoxData = this.cropper.getCropBoxData();
            //let canvasData = this.cropper.getCanvasData();
            let self = this
            self.postHeadImg({
                file:self.cropper.getCroppedCanvas().toDataURL('image/png'),
                token:self.fetchToken
            },(data)=>{
                console.log(data)
                self.setHeadImg(data.headImg)
                self.$router.replace('/main/user/')
            })
        }
    },
    vuex:{
        actions:{
            setHeadImg,postHeadImg
        },
        getters:{
            fetchHeadPhoto,fetchToken
        }
    },
    data(){
        return{
           cropper:'',
           //jpgData:''
        }
    },
    ready(){
        let minHeight= document.documentElement.clientHeight - 46
        this.cropper = new Cropper(this.$els.img, {
            aspectRatio: NaN,
            minContainerHeight: minHeight
        });
    }
}
</script>
