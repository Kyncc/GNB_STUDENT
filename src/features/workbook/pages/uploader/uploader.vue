<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '上传作业'}">
      <i slot="right" @click="_upload" class="icon iconfont icon-upload" style="font-size:22px"></i>
    </x-header>
    <div>
      <group-title style="margin:10px 0 0;">需要上传作业后方可查看答案,最多5张</group-title>
      <div style="padding:10px 15px">
        <flexbox wrap="wrap" align="baseline" :gutter="0">
          <flexbox-item :span="3" v-for="(img, index) in workbookUploader.list" :key="index">
            <div class="photo">
              <div style="text-align:center;height:90px;width:65px;background-size:100% 100%" :style="'background-image:url('+img+')'"></div>
              <i class="icon iconfont icon-error" style="font-size:30px;position:absolute;left:58px;top:-25px" @click="_del(index)"></i>
            </div>
          </flexbox-item>
          <flexbox-item :span="3" v-if="!(workbookUploader.list.length === 5)" @click.native="_add">
            <div class="photo">
              <div class="plus">
                <b>+</b>
              </div>
            </div>
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
    ...mapActions(['uploadHeadImg', 'workbookUploadAdd', 'workbookUpload', 'workbookUploadDel', 'workbookCamera']),
    _add () {
      // this.$router.push({'name': 'workbook_uploader_photo'})
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
    _upload () {
      if (!this.workbookUploader.list.length) {
        this.$vux.toast.show({text: '您还未拍照', type: 'text', time: 1500, position: 'bottom'})
        return
      }
      this.workbookUpload().then(() => {
        history.go(-1)
      })
    }
  },
  computed: {
    ...mapGetters(['workbookUploader', 'Route'])
  }
}
</script>
<style lang="less" scoped>
.photo{
  position:relative;
  margin-top:10px;
  padding-left:10px;
  .plus{
    text-align:center;
    height:90px;width:65px;border:1px solid #ccc;font-size:48px;color:#ccc;
    border-radius:3px;
    float:left;
  }
}
</style>
