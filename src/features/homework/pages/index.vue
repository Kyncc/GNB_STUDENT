<template>
  <view-box ref="homework" body-padding-top="46px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" >
      <x-header :left-options="{backText: '我的作业',showBack: true}">
        <div slot="right" style="margin:0">
          <gnbChangeSub :change.sync='selectedSub'></gnbChangeSub>
        </div>
      </x-header>
    </div>
    <div>
      <card v-for="(item, index) in Homework.list" :key="index">
        <div slot="header" class="weui-panel__hd" style='padding:5px 15px;'>
          <flexbox>
            <flexbox-item :span="7" style="color:#4BB7AA">布置时间：{{item.time | ymd}}</flexbox-item>
            <flexbox-item :span="5" style="color:#4BB7AA;text-align:right;padding-right:5px;">
              <x-button type="primary" mini plain>{{item.name}}</x-button>
            </flexbox-item>
          </flexbox>
        </div>
        <!--文字作业 -->
        <p slot="content" class="card-padding" v-if='item.content'>{{item.content}}</p>
        <!--图片作业 -->
        <flexbox slot="content" wrap="wrap" align="baseline" :gutter="0" v-if='item.img'>
          <flexbox-item :span="3" v-for="(img, index) in item.img" :key="index" @click.native="_show(index, item.img)" style="text-align:center;margin-bottom:10px;">
            <img v-lazy="img.url+'?imageMogr2/auto-orient/thumbnail/260x360!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim'" width="65" height="90" class="previewer-answer-img">
          </flexbox-item>
        </flexbox>
        <!--语音作业 -->
        <flexbox slot="content"  v-if='item.img'>
          <flexbox-item v-if='item.audio' :span="2" @click.native='_audio(item.audio, index)'>
            <i v-if='audio.state && audio.index === index' class='icon iconfont icon-zanting' style='font-size:2rem'></i>
            <i v-else class='icon iconfont icon-playcirclefill' style='font-size:2rem;color:#4BB7AA;margin-top:.7rem;'></i>
          </flexbox-item>
        </flexbox>
      </card>
      <div style="text-align:center">
        <spinner v-show="loading" type="dots"></spinner>
        <p v-show="error" @click='_getData()' style="font-size:16px;color:#4BB7AA;padding:10px 0;">出错了点我重新加载</p>
        <p v-show="Homework.list.length === 0 && !loading && !error" style="font-size:16px;color:#4BB7AA;padding:10px 0;">还没有老师布置作业~</p>
      </div>
    </div>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Cell, Card, Group, ViewBox, Spinner, XButton, Flexbox, FlexboxItem, Previewer, TransferDomDirective as TransferDom} from 'vux'
import gnbChangeSub from '@/components/gnb_changeSub'
import {mapActions, mapGetters} from 'vuex'
import { Howl } from 'howler'

export default {
  name: 'index',
  components: {
    XHeader, Card, Cell, Group, ViewBox, Spinner, XButton, gnbChangeSub, Flexbox, FlexboxItem, Previewer
  },
  computed: {
    ...mapGetters(['Homework'])
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      selectedSub: '',
      show: false,
      error: false,
      loading: true,
      audio: {
        // 播放的索引
        index: '',
        // 播放对象
        obj: '',
        // 播放状态
        state: false
      },
      list: [{}],
      options: {
        preload: [1, 1],
        bgOpacity: 1,
        fullscreenEl: false,
        history: true
      }
    }
  },
  methods: {
    ...mapActions(['getHomework', 'clearHomework']),
    _getData () {
      this.loading = true
      this.getHomework({subjectId: this.selectedSub}).then(() => {
        this.error = false
        this.loading = false
      }).catch(() => {
        this.error = true
        this.loading = false
      })
    },
    // 照片大图
    _show (index, camera) {
      this.list = []
      for (let arr of camera) {
        this.list.push({
          w: Number(arr.width),
          h: Number(arr.height),
          src: `${arr.url}`
        })
      }
      this.$nextTick(() => {
        this.$refs.previewer.show(index)
      })
    },
    // 播放声音
    _audio (url, index) {
      this.audio.index = index
      if (!this.audio.state) {
        this.audio.state = true
        this.audio.obj = new Howl({
          src: [url],
          onloaderror: () => {
            // 获取失败
            alert('播放音频文件失败请重试')
          },
          onend: () => {
            // 播放完后的暂停
            this.audio.index = null
            this.audio.state = false
            this.audio.obj.stop()
          }
        })
        this.audio.obj.stop().play()
      } else {
        // 手动暂停
        this.audio.index = null
        this.audio.state = false
        this.audio.obj.stop()
      }
    }
  },
  watch: {
    selectedSub () {
      this.clearHomework()
      this._getData()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.clearHomework()
      vm._getData()
    })
  },
  beforeRouteLeave (to, from, next) {
    // 若在播放语音 则暂停
    if (this.audio.state) {
      this.audio.index = null
      this.audio.state = false
      this.audio.obj.stop()
    }
    next()
  }
}
</script>
