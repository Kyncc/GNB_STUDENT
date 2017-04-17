<template>
  <view-box ref="userinfo" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '个人资料'}">
      <router-link :to="{ path: 'update'}" slot="right">
        <p>编辑</p>
      </router-link>
    </x-header>
    <group gutter="0">
      <cell title="头像" >
        <x-img slot="default" default-src="http://placehold.it/60x60" src="https://cn.nuxtjs.org/vuejobs.png" width="60" height="60"/>
      </cell>
      <cell title="姓名" value="王三宝"></cell>
      <cell title="性别" value="男"></cell>
    </group>
    <group>
      <cell title="年级" value="七年级"></cell>
      <cell title="学校" value="芜湖市"></cell>
    </group>
    <group>
      <cell title="数学" value="新人教版"></cell>
      <cell title="物理" value="沪教版"></cell>
    </group>
    <group>
      <cell title="手机号码" value="13605592895"></cell>
    </group>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, XImg, ViewBox} from 'vux'

export default {
  name: 'info',
  components: {
    XHeader, Cell, Group, ViewBox, XImg
  },
  methods: {
  }
}
</script>
