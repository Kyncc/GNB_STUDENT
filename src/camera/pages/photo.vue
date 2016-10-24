<template>
    <view-box v-ref:view-box class="cameraIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                剪裁
                <a slot="right" @click="_next">下一步</a>
            </x-header>
        </div>
        <div style="margin-top:46px;" >
            <img id="defaultimg" v-el:img :src="fetchCameraImg" style="width:100%;"/>
        </div>
	</view-box>
</template>

<script>
import {XHeader,Panel,ViewBox,Tabbar, TabbarItem,XButton} from 'vux'
import Cropper from 'Cropperjs'
import * as _ from '../../config/whole.js'
import { fetchCameraImg,cameraResultId,cameraResultIds } from '../getters.js'
import { getCameraResultIds } from '../actions.js'
import { token,period_id,subject_id } from '../../common/getters.js'

export default {
    components: {
       XHeader,Panel,ViewBox,Tabbar,TabbarItem,XButton
    },
    methods: {
        _next(){
            let self = this
            _.busy()
            self.getCameraResultIds({
                file: self.cropper.getCroppedCanvas({width:640}).toDataURL('image/png'),
                token: self.token,
                options: {
                    period_id: self.period_id,
                    subject_id: self.subject_id
                }
            },()=>{
                /*上传图片成功回调*/
                // if(self.cameraResultIds.length){
                //     self.$router.go('/camera/result/'+ self.cameraResultId)                    
                // }else{
                //     _.toast('沒有合适例题')
                //     setTimeout(()=>{
                //         self.$router.replace('/camera')
                //     },500)
                // }

                /*上传成功*/
                self.$router.go('/camera/success');      
            })
        }
    },
    vuex:{
        actions:{
            getCameraResultIds
        },
        getters:{
            fetchCameraImg,token,period_id,subject_id,cameraResultId,cameraResultIds
        }
    },
    data(){
        return{
           cropper:''
        }
    },
    ready(){
        let minHeight= document.documentElement.clientHeight - 46
        this.cropper = new Cropper(this.$els.img, {
            aspectRatio: NaN,
            minContainerHeight: minHeight
        })
    }
}
</script>
