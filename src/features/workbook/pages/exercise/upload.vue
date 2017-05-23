<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '上传错题照片'}">
      <i slot="right" @click="_upload" class="icon iconfont icon-upload" style="font-size:22px"></i>
    </x-header>
    <div>
      <group-title style="margin:10px 0 0;">一定要包含解题过程哦</group-title>
      <div style="padding:10px 15px">
        <flexbox wrap="wrap" align="baseline" :gutter="0">
          <flexbox-item :span="3" v-for="(img, index) in workbookExercise.cameraList" :key="index">
            <div class="photo">
              <div style="text-align:center;height:90px;width:65px;background-size:100% 100%" :style="'background-image:url('+img+')'"></div>
              <i class="icon iconfont icon-error" style="font-size:30px;position:absolute;left:58px;top:-25px" @click="_del(index)"></i>
            </div>
          </flexbox-item>
          <flexbox-item :span="3" v-if="!(workbookExercise.cameraList.length === 0)" @click.native="_add">
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
  name: 'uploader',
  components: {
    XHeader, ViewBox, Flexbox, FlexboxItem, GroupTitle
  },
  methods: {
    ...mapActions(['workbookExCameraAdd', 'workbookExErrorUpload', 'workbookExCameraDel', 'workbookExCamera']),
    _add () {
      // this.$router.push({'name': 'workbook_uploader_photo'})
      let cmr = plus.camera.getCamera()
      cmr.captureImage((p) => {
        plus.io.resolveLocalFileSystemURL(p, (entry) => {
          this.workbookExCamera(entry.toLocalURL())
          this.$router.push({'name': 'workbook_exercise_error_photo'})
        })
      })
    },
    _del (index) {
      this.workbookExCameraDel(index)
    },
    _upload () {
      if (!this.workbookExercise.cameraList.length) {
        this.$vux.toast.show({text: '您还未拍照', type: 'text', time: 1000, position: 'bottom'})
        return
      }
      this.workbookExErrorUpload().then(() => {
        history.go(-1)
      })
    }
  },
  computed: {
    ...mapGetters(['workbookExercise', 'Route'])
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
