<template>
  <div>
    <view-box ref="settings" body-padding-top="46px">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '设置'}"></x-header>
      <group gutter="0">
        <cell title="修改密码" link="https://vux.li/demos/v2/?#/" is-link></cell>
        <cell title="退出登陆" @click.native="show=true"></cell>
      </group>
    </view-box>
    <confirm v-model="show" title="是否退出登录" @on-confirm="_onConfirm"></confirm>
  </div>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, Confirm, TransferDomDirective as TransferDom} from 'vux'

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
  directives: {
    TransferDom
  },
  methods: {
    _onConfirm () {
      localStorage.removeItem('token')
      if (window.plus) plus.runtime.restart() // 重启应用
      else this.$router.push(`/login`)
    }
  }
}
</script>
