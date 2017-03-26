<template>
  <view-box class="workbookStuUploader">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}" >
        上传作业
        <a slot="right" @click="_upload"><i class="icon iconfont icon-upload" style="font-size:22px"></i></a>
      </x-header>
    </div>

    <div style="padding-top:46px;">
      <group title="需要上传作业后方可查看答案,最多5张"></group>
      <div style="padding:.6rem" class="photoGroup">
        <div class="photo" v-for="item in workbookStuUploader.list" track-by="$index">
          <img :src="item"/>
          <i class="icon iconfont icon-error" style="font-size:30px" @click="_del($index)"></i>
        </div>
        <div class="photoAdd"  @click="_add" v-show="!(workbookStuUploader.list.length === 5)">
          <i class="icon iconfont icon-plus" style="font-size:44px"></i>
        </div>
      </div>
    </div>
  </view-box>
</template>

<script>
import {XHeader,ViewBox,Group,Cell,XButton,Tabbar} from 'vux'
import { mapActions,mapGetters} from 'vuex'
import * as _ from 'config/whole'

export default {
  components:{
    XHeader,ViewBox,Group,Cell,XButton
  },
  route: {
    data:function(transition){
     
    }
  },
  methods: {
    ...mapActions(["workbookStuUploadDel","workbookStuUploadAdd","workbookStuUpload","workbookStuCamera"]),
    _del(index){
      this.workbookStuUploadDel(index)
    },
    _add(){
      let cmr = plus.camera.getCamera()
      let self = this
      cmr.captureImage(function(p) {
        plus.io.resolveLocalFileSystemURL(p,function(entry){
          self.workbookStuCamera(entry.toLocalURL())
          self.$router.go(`../../photo/${self.Params.chapterId}/${self.Params.name}/`);
        })
      })
      // this.$router.go(`../../photo/${this.Params.chapterId}/${this.Params.name}/`);
    },
    _upload(){
      if(this.workbookStuUploader.list.length === 0){
        _.toast("您还未拍照")
        return
      }
      this.workbookStuUpload()
      .then(()=>{
        this.$router.replace(`../../../exercise/answer/${this.Params.chapterId}/${this.Params.name}/`);
      })
    }
  },
  computed:{
    ...mapGetters(['Params','User','workbookStuUploader']),
	}
}
</script>