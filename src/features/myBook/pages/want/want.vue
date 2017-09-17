<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '上传习题册'}">
      <i slot="right" @click="_upload" class="icon iconfont icon-upload" style="font-size:22px"></i>
    </x-header>
    <div>
      <div style='background:#fff;padding:1rem 0;'>
        <group-title style='margin-top:0;'>请按照示例上传习题册封面和版次印</group-title>
        <flexbox wrap="wrap" align="baseline" style="padding:.5rem 0">
          <flexbox-item :span="1"></flexbox-item>
          <flexbox-item :span="4" @click.native="_show(0)">
            <div v-lazy:background-image="small[0]" style='height:160px;background-size:100% 100%'></div>
          </flexbox-item>
          <flexbox-item :span="1"></flexbox-item>
          <flexbox-item :span="4" @click.native="_show(1)">
            <div v-lazy:background-image="small[1]" style='height:160px;background-size:100% 100%'></div>
          </flexbox-item>
        </flexbox>
        <flexbox wrap="wrap" align="baseline">
          <flexbox-item :span="1"></flexbox-item>
          <flexbox-item :span="4">
            <div class="photo" v-if="!(myBookWant.index)" @click="_add('index')">
              <div class="plus">
                <b>+</b>
              </div>
            </div>
            <div class="photo" v-else>
              <div style="text-align:center;height:160px;background-size:100% 100%" :style="'background-image:url('+myBookWant.index+')'"></div>
              <i class="icon iconfont icon-error" style="font-size:30px;position:absolute;left:5.4rem;top:-1.2rem" @click="_del('index')"></i>
            </div>
            </flexbox-item>
          <flexbox-item :span="1"></flexbox-item>
          <flexbox-item :span="4">
            <div class="photo" v-if="!(myBookWant.version)" @click="_add('version')">
              <div class="plus">
                <b>+</b>
              </div>
            </div>
            <div class="photo" v-else>
              <div style="text-align:center;height:160px;background-size:100% 100%" :style="'background-image:url('+myBookWant.version+')'"></div>
              <i class="icon iconfont icon-error" style="font-size:30px;position:absolute;left:5.4rem;top:-1.2rem" @click="_del('version')"></i>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <p class='notice'>我们会尽快上架该练习册，请注意查看消息通知，感谢您得支持~</p>
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
    ...mapGetters(['myBookWant'])
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
    ...mapActions(['myBookWantDel', 'myBookCamera', 'myBookWantUpload']),
    _add (type) {
      /**
       * version 版本图片
       * index 首页图片
       */
      this.$router.push({name: 'myBook_want_photo', query: {type: type}})
      // let cmr = plus.camera.getCamera()
      // cmr.captureImage((p) => {
      //   plus.io.resolveLocalFileSystemURL(p, (entry) => {
      //     this.myBookCamera(entry.toLocalURL())
      //     this.$router.push({name: 'myBook_want_photo', query: {type: type}})
      //   })
      // })
    },
    _del (type) {
      this.myBookWantDel(type)
    },
    _show (index) {
      this.$nextTick(() => {
        this.$refs.previewer.show(index)
      })
    },
    _upload () {
      if (!this.myBookWant.index) {
        this.$vux.toast.show({text: '请上传习题册封面', type: 'text', time: 1500, position: 'bottom'})
      } else if (!this.myBookWant.version) {
        this.$vux.toast.show({text: '请上传习题册版次', type: 'text', time: 1500, position: 'bottom'})
      } else {
        this.myBookWantUpload().then(() => {
          history.go(-1)
        })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'myBook_add') {
        vm.myBookWantDel('index')
        vm.myBookWantDel('version')
      }
    })
  }
}
</script>
<style lang="less" scoped>
.photo{
  position:relative;
  margin-top:10px;
  .plus{
    text-align:center;
    height:160px;width:6.2rem;border:1px solid #ccc;font-size:3rem;color:#ccc;
    border-radius:3px;
    float:left;
  }
}
.notice{
  text-align: center;
  color: #333;
  font-size:.7rem;
  padding:1rem;
}
</style>
