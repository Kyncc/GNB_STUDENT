<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '剪裁'}">
      <p slot="right" v-on:click="_finish">完成</p>
    </x-header>
    <div>
      <img ref="img" :src="workbookUploader.camera" style="width:100%;"/>
    <!--<img ref="img" src="http://img.guinaben.com/workbookPic/429answer5810/1/Untitled.FR12%20-%200001.png?imageMogr2/auto-orient/thumbnail/!50p/format/jpg/interlace/1/quality/30|imageslim" style="width:100%;"/>
      -->
    </div>
  </view-box>
</template>
<script>

import {XHeader, ViewBox} from 'vux'
import {mapActions, mapGetters} from 'vuex'
import Cropper from 'Cropperjs'
import 'Cropperjs/dist/cropper.min.css'

export default {
  name: 'photo',
  components: {
    XHeader, ViewBox
  },
  computed: {
    ...mapGetters(['workbookUploader'])
  },
  data () {
    return {
      cropper: ''
    }
  },
  methods: {
    ...mapActions(['uploadHeadImg', 'workbookUploadAdd']),
    _finish () {
      this.workbookUploadAdd(this.cropper.getCroppedCanvas({width: 640}).toDataURL('image/jpeg', 0.9))
      history.back()
    }
  },
  activated () {
    if (this.cropper) {
      this.cropper.destroy()
      let minHeight = document.documentElement.clientHeight - 46
      let minWidth = document.documentElement.clientWidth
      this.cropper = new Cropper(this.$refs.img, {
        minContainerHeight: minHeight,
        minContainerWidth: minWidth,
        build: () => {
          this.$vux.loading.show({text: '请稍候'})
        },
        built: () => {
          this.$vux.loading.hide()
        }
      })
    }
  },
  mounted () {
    let minHeight = document.documentElement.clientHeight - 46
    let minWidth = document.documentElement.clientWidth
    this.cropper = new Cropper(this.$refs.img, {
      minContainerHeight: minHeight,
      minContainerWidth: minWidth,
      build: () => {
        this.$vux.loading.show({text: '请稍候'})
      },
      built: () => {
        this.$vux.loading.hide()
      }
    })
  }
}
</script>
