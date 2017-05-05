<template>
  <div>
    <view-box ref="settings" body-padding-top="46px">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '设置'}"></x-header>
      <group gutter="0">
        <cell title="修改密码" :link="{name: 'settings_pwd'}" is-link></cell>
        <cell title="退出登录" @click.native="_onConfirm"></cell>
      </group>
    </view-box>
  </div>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, Confirm} from 'vux'

export default {
  name: 'index',
  components: {
    XHeader, Cell, Group, ViewBox, Confirm
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    _onConfirm () {
      let _this = this
      this.$vux.confirm.show({
        title: '是否退出登录',
        dialogTransition: 'vux-fade',
        onConfirm () {
          localStorage.removeItem('token')
          if (window.plus) plus.runtime.restart() // 重启应用
          else _this.$router.push(`/login`)
        }
      })
    }
  }
}
</script>
