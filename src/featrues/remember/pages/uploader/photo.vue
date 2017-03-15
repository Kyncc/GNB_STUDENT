<template>
  <view-box class="cameraIndex">
  <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
    <x-header :left-options="{showBack: true}">
      剪裁<a slot="right" @click="_img">完成</a>
    </x-header>
  </div>
  <div style="margin-top:46px;" >
    <img v-el:img :src="userImgBuffer" style="width:100%;"/>
  </div>
  </view-box>
</template>
<script>

import {XHeader,ViewBox} from 'vux'
import {mapActions,mapGetters} from 'vuex'
import Cropper from 'Cropperjs'
import 'Cropperjs/dist/cropper.min.css'
import * as _ from 'config/whole'

export default {
  components: {
     XHeader,ViewBox
  },
  methods: {
    ...mapActions(['uploadHeadImg']),
    _img(){
      // this.uploadHeadImg({
      //   file:this.cropper.getCroppedCanvas({width:140,height:140}).toDataURL('image/png'),
      //   token:this.fetchToken
      // })
      // .then((res)=>{
      //   _.toast("上传成功");
      //   setTimeout(()=>{
      //     history.back();
      //   },500);
      // })
    }
  },
  data(){
    return{
       cropper:'',
    }
  },
  computed:{
    ...mapGetters(['User']),
    // userImgBuffer(){
    //   return this.User.bufferImg;
    // }
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
