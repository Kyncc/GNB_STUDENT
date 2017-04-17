<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '上传作业'}">
      <a slot="right" @click="_upload"><i class="icon iconfont icon-upload" style="font-size:22px"></i></a>
    </x-header>
    <div>
      <group title="需要上传作业后方可查看答案,最多5张"></group>
      <div style="padding:.6rem" class="photoGroup">
        <div class="photo" v-for="(index, item) in workbookUploader.list">
          <img :src="item"/>
          <i class="icon iconfont icon-error" style="font-size:30px" v-on:click="_del(index)"></i>
        </div>
        <div class="photoAdd" v-on:click="_add" v-show="!(workbookUploader.list.length === 5)">
          <i class="icon iconfont icon-plus" style="font-size:44px"></i>
        </div>
      </div>
    </div>
  </view-box>
</template>
<script>
import {XHeader, ViewBox, Group} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'photo',
  components: {
    XHeader, ViewBox, Group
  },
  methods: {
    ...mapActions(['uploadHeadImg', 'workbookUploadAdd']),
    _add () {
      let cmr = plus.camera.getCamera()
      cmr.captureImage((p) => {
        plus.io.resolveLocalFileSystemURL(p, (entry) => {
          this.workbookCamera(entry.toLocalURL())
          this.$router.push({'name': 'workbook_uploader_photo'})
        })
      })
    },
    _del (index) {
      this.workbookUploadDel(index)
    },
    _finish () {
      this.workbookUploadAdd(this.cropper.getCroppedCanvas({width:640}).toDataURL("image/jpeg", 0.9))
      history.back()
    },
    _upload () {
      if(!this.workbookUploader.list.length){
        this.$vux.toast.show({text: '您还未拍照', type: 'text', time: 1000, position: 'bottom'})
        return
      }
      this.workbookUpload().then(() => {
        this.$router.replace({'name': 'workbook_uploader'})
      })
    }
  },
  computed: {
    ...mapGetters(['workbookUploader'])
  }
}
</script>
