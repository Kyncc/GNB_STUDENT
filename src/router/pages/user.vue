<template>
  <div class='user'>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{showBack: false}">
      <i class="icon iconfont icon-share" slot="right"></i>
      个人中心
    </x-header>
    <div class="info">
      <div v-on:click="_showMenus">
        <img class="defaultimg" src="userImg"/>
        <p class="phone">&nbsp;王三宝&nbsp;</p>
      </div>
      <router-link :to="{ path: 'settings/info'}" class="arrow">
        <i class="icon iconfont icon-right"></i>
      </router-link>
    </div>
    <group gutter="0">
      <cell title="设置" link="settings">
        <i class="icon iconfont icon-settingfull" style="color:#794BB8" slot="icon"></i>
      </cell>
      <cell title="关于归纳本" link="about">
        <i class="icon iconfont icon-info" style="color:#6DC6FF" slot="icon"></i>
      </cell>
      <cell title="消息通知" link="message">
        <i class="icon iconfont icon-comment" style="color:#ABC97C"  slot="icon"></i>
      </cell>
      <cell title="版本更新">
        <i class="icon iconfont icon-upload" style="color:#ABC97C"  slot="icon"></i>
        <badge text="新版本"></badge>
      </cell>
    </group>
    <actionsheet v-model="show" :menus="menus" @on-click-menu="_menusClick" show-cancel></actionsheet>
  </div>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, Actionsheet, Badge} from 'vux'

export default {
  name: 'user',
  components: {
    XHeader, Cell, Group, ViewBox, Actionsheet, Badge
  },
  data () {
    return {
      show: false,
      menus: {
        menu1: '拍照',
        menu2: '选择照片'
      }
    }
  },
  methods: {
    // 从相机获取图片
    _getImage () {
      let cmr = plus.camera.getCamera()
      cmr.captureImage((p) => {
        plus.io.resolveLocalFileSystemURL(p, (entry) => {
          this.setHeadImg(entry.toLocalURL())
          this.$router.push('settings/photo')
        })
      })
    },
    // 唤起本机相册选择图片并获取路径
    _galleryImgs () {
      plus.gallery.pick((e) => {
        // this.setHeadImg(e.files[0])
        this.$router.go('settings/photo')
      }, (e) => {
        this.$vux.toast.show({text: '您已取消选择图片', type: 'text', time: 1000, position: 'bottom'})
      }, {
        filter: 'image',
        multiple: true
      })
    },
    // 菜单选择
    _menusClick (val) {
      val === 'menu1' ? this._getImage() : this._galleryImgs()
    },
    // 显示选择
    _showMenus () {
      this.show = true
    }
  }
}
</script>
