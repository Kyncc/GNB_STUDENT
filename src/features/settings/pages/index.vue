<template>
  <view-box ref="settings" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '设置'}"></x-header>
    <group gutter="0">
      <cell title="修改密码" link="settings/resetPwd" is-link></cell>
      <cell title="退出登陆" @click.native="_quit"></cell>
    </group>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox} from 'vux'

export default {
  name: 'index',
  components: {
    XHeader, Cell, Group, ViewBox
  },
  methods: {
    _quit () {
      let self = this
      this.$vux.confirm.show({
        title: '是否退出登录',
        dialogTransition: 'vux-fade',
        onConfirm () {
          localStorage.removeItem('token')
          if (window.plus) plus.runtime.restart() // 重启应用
          self.$router.push(`/login`)
        }
      })
    }
  }
}
</script>
