<template>
  <view-box v-ref:view-box class="cameraIndex">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
          剪裁<a slot="right" @click="_img">完成</a>
      </x-header>
    </div>
    <div style="margin-top:46px;" >
      <img id="defaultimg" v-el:img :src="fetchHeadPhoto" style="width:100%;"/>
    </div>
  </view-box>
</template>
<script>
import {XHeader,Panel,ViewBox,Tabbar, TabbarItem,XButton} from 'vux'
import { fetchHeadPhoto } from '../getters.js'
import { fetchToken } from '../../user/getters.js'
import { postHeadImg } from '../actions.js'
import { setHeadImg } from '../../login/actions.js'
import * as _ from '../../config/whole'
import Cropper from 'Cropperjs'

export default {
    components: {
       XHeader,Panel,ViewBox,Tabbar, TabbarItem,XButton
    },
    methods: {
        _img(){
            let self = this
            self.postHeadImg({
                file:self.cropper.getCroppedCanvas({width:140,height:140}).toDataURL('image/png'),
                token:self.fetchToken
            },(data)=>{
                _.toast("上传成功");
                self.setHeadImg(data.headImg);
                setTimeout(()=>{
                    self.$router.replace('/user');
                },300);
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
        }
    },
    ready(){
        let minHeight= document.documentElement.clientHeight - 46
        this.cropper = new Cropper(this.$els.img, {
            aspectRatio: 1/1,
            minContainerHeight:minHeight
        });
    }
}
</script>
