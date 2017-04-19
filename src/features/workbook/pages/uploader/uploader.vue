<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '上传作业'}">
      <i slot="right" @click="_upload" class="icon iconfont icon-upload" style="font-size:22px"></i>
    </x-header>
    <div>
      <group-title style="margin:10px 0;">需要上传作业后方可查看答案,最多5张</group-title>
      <div style="margin:.75rem">
        <flexbox wrap="wrap" align="baseline" :gutter="0">
          <flexbox-item :span="3" v-for="(img, index) in workbookUploader.list" :key="index" style="text-align:center;height:120px;">
            <img :src="img" height="80" width="120"/>
            <i class="icon iconfont icon-error" style="font-size:30px" @click="_del(index)"></i>
          </flexbox-item>
          <flexbox-item :span="3" style="text-align:center;height:120px;border:1px solid #ccc;" class="add" @click.native="_add">
            <i class="icon iconfont icon-plus" style="font-size:44px;margin:0 auto;top:20px;color:#bbb;"></i>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </view-box>
</template>

<script>
import {Flexbox, FlexboxItem, GroupTitle, XHeader, ViewBox} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'photo',
  components: {
    XHeader, ViewBox, Flexbox, FlexboxItem, GroupTitle
  },
  methods: {
    ...mapActions(['uploadHeadImg', 'workbookUploadAdd']),
    _add () {
      this.$router.push({'name': 'workbook_uploader_photo'})
      // let cmr = plus.camera.getCamera()
      // cmr.captureImage((p) => {
      //   plus.io.resolveLocalFileSystemURL(p, (entry) => {
      //     this.workbookCamera(entry.toLocalURL())
      //     this.$router.push({'name': 'workbook_uploader_photo'})
      //   })
      // })
    },
    _del (index) {
      this.workbookUploadDel(index)
    },
    _upload () {
      if (!this.workbookUploader.list.length) {
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
