<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '头像更改'}">
      <p slot="right" @click="_img">完成</p>
    </x-header>
    <img ref="photo" :src="userImgBuffer" style="width:100%"/>
  </view-box>
</template>

<script>
import {XHeader, ViewBox} from 'vux'
import {mapActions, mapGetters} from 'vuex'
import Cropper from 'Cropperjs'
import 'Cropperjs/dist/cropper.min.css'

export default {
  components: {
    XHeader, ViewBox
  },
  methods: {
    ...mapActions(['uploadHeadImg']),
    _img () {
      this.uploadHeadImg({
        img: this.cropper.getCroppedCanvas({width: 140, height: 140}).toDataURL('image/jpeg')
      }).then(() => {
        this.$vux.toast.show({text: '上传成功', type: 'text', time: 1500, position: 'bottom'})
        setTimeout(() => { history.back() }, 500)
      })
    }
  },
  data () {
    return {
      cropper: ''
    }
  },
  computed: {
    ...mapGetters(['User']),
    userImgBuffer () {
      return this.User.bufferImg
    }
  },
  activated () {
    if (this.cropper) {
      this.cropper.destroy()
      let minHeight = document.documentElement.clientHeight - 46
      this.cropper = new Cropper(this.$refs.photo, {
        aspectRatio: '1/1',
        minContainerHeight: minHeight
      })
    }
  },
  mounted () {
    let minHeight = document.documentElement.clientHeight - 46
    this.cropper = new Cropper(this.$refs.photo, {
      aspectRatio: '1/1',
      minContainerHeight: minHeight
    })
  }
}
</script>
