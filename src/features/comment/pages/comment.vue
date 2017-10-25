<template>
  <view-box ref="viewBox" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '教师点评',showBack: true}"></x-header>
    <div>
      <card :header="{title: item.name}" v-for='(item, index) in Comment' :key='index'>
        <div slot="content">
          <div>
            <flexbox>
              <flexbox-item v-if='item.content'>{{item.content}}</flexbox-item>
              <flexbox-item v-if='item.audioUrl' :span="2" @click.native='_audio(item.audioUrl, index)'>
                <i v-if='comment.state && comment.index === index' class='icon iconfont icon-zanting' style='font-size:2rem'></i>
                <i v-else class='icon iconfont icon-playcirclefill' style='font-size:2rem;color:#4cc0be;margin-top:-.1rem;'></i>
              </flexbox-item>
            </flexbox>
          </div>
        </div>
      </card>
    </div>
  </view-box>
</template>

<script>
import { XHeader, ViewBox, Card, Flexbox, FlexboxItem, XButton } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import { Howl } from 'howler'
import modules from '../modules/store'
import store from '@/store'

export default {
  name: 'comment',
  components: {
    XHeader, ViewBox, Card, Flexbox, FlexboxItem, XButton
  },
  computed: {
    ...mapGetters(['Comment'])
  },
  data () {
    return {
      comment: {
        // 播放的索引
        index: '',
        // 播放对象
        audio: '',
        // 播放状态
        state: false
      }
    }
  },
  methods: {
    ...mapActions(['getComment', 'clearComment']),
    // 播放上次声音
    _audio (url, index) {
      this.comment.index = index
      if (!this.comment.state) {
        this.comment.state = true
        this.comment.audio = new Howl({
          src: [url],
          onloaderror: () => {
            // 获取失败
            alert('播放音频文件失败请重试')
          },
          onend: () => {
            // 播放完后的暂停
            this.comment.index = null
            this.comment.state = false
            this.comment.audio.stop()
          }
        })
        this.comment.audio.stop().play()
      } else {
        // 手动暂停
        this.comment.index = null
        this.comment.state = false
        this.comment.audio.stop()
      }
    }
  },
  beforeCreate () {
    store.registerModule('comment', {
      ...modules
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getComment()
    })
  },
  beforeRouteLeave (to, from, next) {
    if (this.comment.state) {
      this.comment.index = null
      this.comment.state = false
      this.comment.audio.stop()
      this.clearComment()
    }
    next()
  }
}
</script>
