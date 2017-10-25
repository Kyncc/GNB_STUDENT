<template>
  <div v-transfer-dom>
    <actionsheet v-model="show" :menus="menus" @on-click-menu="_menuClick" @on-share-success='onShareSuccess()'></actionsheet>
  </div>
</template>

<script>
import { Actionsheet, TransferDomDirective as TransferDom } from 'vux'

export default {
  name: 'share',
  components: {
    Actionsheet
  },
  data () {
    return {
      show: '',
      shares: {},
      sharesList: [{
        id: 'weixin',
        ex: 'WXSceneSession'
      }, {
        id: 'weixin',
        ex: 'WXSceneTimeline'
      }, {
        id: 'qq'
      }],
      menus: {
        qq: '分享给QQ好友',
        wechat: '分享给微信好友'
        // wechatTimeLine: '分享到朋友圈'
      }
    }
  },
  directives: {
    TransferDom
  },
  props: {
    showAction: {
      type: [Boolean]
    },
    href: {
      type: [String]
    },
    title: {
      type: [String]
    },
    content: {
      type: [String]
    }
  },
  watch: {
    show (val) {
      this.$emit('update:change', val)
    },
    showAction (val) {
      this.show = val
    }
  },
  methods: {
    _shareAction (id, ex) {
      var s = null
      if (!id || !(s = this.shares[id])) {
        console.log({text: '无效的分享服务！', type: 'text', time: 1000, position: 'bottom'})
        return
      }
      if (s.authenticated) {
        console.log({text: '已授权', type: 'text', time: 1000, position: 'bottom'})
        this.shareMessage(s, ex)
      } else {
        console.log({text: '未授权', type: 'text', time: 1000, position: 'bottom'})
        s.authorize(() => {
          this.shareMessage(s, ex)
        }, (e) => {
          console.log({text: '认证授权失败', type: 'text', time: 1000, position: 'bottom'})
        })
      }
    },
    /**
     * 发送分享消息
     */
    shareMessage (s, ex) {
      var msg = {
        href: this.href,
        title: this.title,
        content: this.content,
        thumbs: ['http://img.guinaben.com/iconS.png?imageView2/0/w/256/h/256/format/png/interlace/1/q/100|imageslim'],
        pictures: ['http://img.guinaben.com/iconS.png?imageView2/0/w/256/h/256/format/png/interlace/1/q/100|imageslim'],
        extra: {
          scene: ex
        }
      }
      s.send(msg, () => {
        this.onShareSuccess()
        this.$vux.toast.show({text: '分享成功', type: 'text', time: 1000, position: 'bottom'})
      }, (e) => {
        this.$vux.toast.show({text: '您取消分享', type: 'text', time: 1000, position: 'bottom'})
      })
    },
    onShareSuccess () {
      this.$emit('on-share-success')
    },
    _menuClick (val) {
      let index
      if (val === 'qq') {
        index = 2
      } else if (val === 'wechat') {
        index = 0
      } else {
        index = 1
      }
      this._shareAction(this.sharesList[index].id, this.sharesList[index].ex)
    }
  },
  created () {
    try {
      plus.share.getServices((s) => {
        this.shares = {}
        for (var i in s) {
          let t = s[i]
          this.shares[t.id] = t
        }
        console.log({text: '获取分享服务列表成功', type: 'text', time: 1000, position: 'bottom'})
      }, (e) => {
        console.log({text: '获取分享服务列表失败：' + e.message, type: 'text', time: 1000, position: 'bottom'})
      })
    } catch (e) {
      console.log(e)
    }
    this.show = this.showAction
  }
}
</script>
