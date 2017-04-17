<template>
  <view-box ref="userPhoto" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '修改密码'}">
      <p slot="right" @click="_img">完成</p>
    </x-header>
    <img v-el:img :src="userImgBuffer" style="width:100%"/>
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
        file: this.cropper.getCroppedCanvas({width: 140, height: 140}).toDataURL('image/jpeg')
      })
      .then(() => {
        this.$vux.toast.show({text: '上传成功', type: 'text', time: 1000, position: 'bottom'})
        setTimeout(() => {
          history.back()
        }, 500)
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
  ready () {
    let minHeight = document.documentElement.clientHeight - 46
    this.cropper = new Cropper(this.$els.img, {
      aspectRatio: '1/1',
      minContainerHeight: minHeight
    })
  }
}
</script>
