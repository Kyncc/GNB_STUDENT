<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '上传习题册'}">
      <i slot="right" @click="_upload" class="icon iconfont icon-upload" style="font-size:22px"></i>
    </x-header>
    <div>
      <group-title style="margin:15px 0 0px;">封面,请按照示例上传习题册封面和版次</group-title>
      <flexbox wrap="wrap" align="baseline" style="padding:15px 0">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="4" @click.native="_show(0)">
          <div v-lazy:background-image="small[0]" style='height:160px;background-size:100% 100%'></div>
        </flexbox-item>
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="4" @click.native="_show(1)">
          <div v-lazy:background-image="small[1]" style='height:160px;background-size:100% 100%'></div>
        </flexbox-item>
      </flexbox>
      <flexbox wrap="wrap" align="baseline" :gutter="0">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="4">
          <div class="photo" v-if="!(workbookWant.want.index)" @click.native="_add('index')">
            <div class="plus">
              <b>+</b>
            </div>
          </div>
          <div class="photo" v-else>
            <div style="text-align:center;height:160px;background-size:100% 100%" :style="'background-image:url('+img+')'"></div>
            <i class="icon iconfont icon-error" style="font-size:30px;position:absolute;left:58px;top:-25px" @click="_del(index)"></i>
          </div>
        </flexbox-item>
      </flexbox>
      <p>我们会尽快上线该练习册，请注意查看消息通知，感谢您得支持~</p>
    </div>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
  </view-box>
</template>

<script>
import {Flexbox, FlexboxItem, GroupTitle, XHeader, ViewBox, Previewer, TransferDomDirective as TransferDom} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'want',
  components: {
    XHeader, ViewBox, Flexbox, FlexboxItem, GroupTitle, Previewer
  },
  computed: {
    ...mapGetters(['workbookWant'])
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      small: [
        'http://img.guinaben.com/want2.png?imageView2/2/w/270/h/480/format/jpg/q/75|imageslim',
        'http://img.guinaben.com/want1.jpg?imageView2/2/w/270/h/480/format/jpg/q/75|imageslim'
      ],
      list: [
        {
          src: 'http://img.guinaben.com/want2.png?imageView2/2/w/960/h/1280/format/jpg/q/75',
          w: 960,
          h: 1280
        },
        {
          src: 'http://img.guinaben.com/want1.jpg?imageView2/2/w/960/h/1280/format/jpg/q/75',
          w: 960,
          h: 1280
        }
      ],
      options: {
        preload: [1, 1],
        bgOpacity: 1,
        fullscreenEl: false,
        history: true
      }
    }
  },
  methods: {
    ...mapActions(['workbookWantAdd', 'workbookWantDel', 'workbookCamera']),
    _add () {
      // this.$router.push({'name': 'workbook_uploader_photo'})
      let cmr = plus.camera.getCamera()
      cmr.captureImage((p) => {
        plus.io.resolveLocalFileSystemURL(p, (entry) => {
          this.workbookCamera(entry.toLocalURL())
          this.$router.push({'name': 'workbook_want_photo'})
        })
      })
    },
    _del (index) {
      this.workbookWantDel(index)
    },
    _show (index) {
      this.$nextTick(() => {
        this.$refs.previewer.show(index)
      })
    },
    _upload () {
      if (!this.workbookWant.list.length) {
        this.$vux.toast.show({text: '您还未拍照', type: 'text', time: 1500, position: 'bottom'})
        return
      }
      this.workbookWant().then(() => {
        history.go(-1)
      })
    }
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
