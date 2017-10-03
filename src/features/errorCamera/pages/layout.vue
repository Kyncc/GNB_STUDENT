<template>
  <view-box ref="error" body-padding-top="86px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '我的错题'}">
        <div slot="right" @click="$router.replace({name: 'error'})">记错题</div>
      </x-header>
      <tab>
        <tab-item v-if="User.subjectType.indexOf('math') >= 0" :selected="Route.name === 'errorCamera_math'" @click.native="$router.replace('math')">数学</tab-item>
        <tab-item v-if="User.subjectType.indexOf('physics') >= 0" :selected="Route.name === 'errorCamera_physics'" @click.native="$router.replace('physics')">物理</tab-item>
        <tab-item v-if="User.subjectType.indexOf('chemistry') >= 0" :selected="Route.name === 'errorCamera_chemistry'" @click.native="$router.replace('chemistry')">化学</tab-item>
      </tab>
    </div>
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Tab, TabItem} from 'vux'
import {mapGetters} from 'vuex'
import modules from '../modules/store'
import store from '@/store'

export default {
  name: 'errorCamera',
  components: {
    XHeader, ViewBox, Tab, TabItem
  },
  computed: {
    ...mapGetters(['Route', 'User'])
  },
  beforeCreate () {
    store.registerModule('errorCamera', {
      ...modules
    })
  }
}
</script>
