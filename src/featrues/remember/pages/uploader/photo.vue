<template>
  <view-box class="cameraIndex">
  <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
    <x-header :left-options="{showBack: true}">
      剪裁<a slot="right" @click="_img">完成</a>
    </x-header>
  </div>
  <div style="margin-top:46px;" >
    <img v-el:img :src="workbookStuUploader.camera" style="width:100%;"/> -->
    <!--<img v-el:img src="http://img.guinaben.com/workbookPic/429answer5810/1/Untitled.FR12%20-%200001.png?imageMogr2/auto-orient/thumbnail/!50p/format/jpg/interlace/1/quality/30|imageslim" style="width:100%;"/>
   -->
  </div>
  </view-box>
</template>
<script>

import {XHeader,ViewBox} from 'vux'
import {mapActions,mapGetters} from 'vuex'
import Cropper from 'Cropperjs'
import 'Cropperjs/dist/cropper.min.css'

export default {
  components: {
     XHeader,ViewBox
  },
  route: {
    data:function(transition){
        if(this.cropper){
            this.cropper.destroy()
            let minHeight= document.documentElement.clientHeight - 46
            let minWidth= document.documentElement.clientWidth
            this.cropper = new Cropper(this.$els.img, {
              minContainerHeight:minHeight,
              minContainerWidth:minWidth,
              build: function (e) {
                _.busy()
              },  
              built: function (e) {
                _.leave()
              }
            });
        }
    }
  },
  methods: {
    ...mapActions(['uploadHeadImg','workbookStuUploadAdd']),
    _img(){
      this.workbookStuUploadAdd(this.cropper.getCroppedCanvas({width:480}).toDataURL("image/jpeg", 0.5))
      history.back()
    }
  },
  data(){
    return{
       cropper:'',
    }
  },
  computed:{
    ...mapGetters(['workbookStuUploader']),
  },
  ready(){
    let minHeight= document.documentElement.clientHeight - 46
    let minWidth= document.documentElement.clientWidth
    this.cropper = new Cropper(this.$els.img, {
      minContainerHeight:minHeight,
      minContainerWidth:minWidth,
      build: function (e) {
        _.busy()
      },  
      built: function (e) {
        _.leave()
      }
    });
  }
}
</script>
