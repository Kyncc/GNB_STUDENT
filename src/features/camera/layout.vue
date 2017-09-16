<template>
  <view-box ref="camera" body-padding-top="100px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '拍错题'}">
        <div slot="right">同步练习</div>
      </x-header>
      <tab>
        <tab-item :selected="Route.name === 'camera_math'" @click.native="$router.replace('math')">数学</tab-item>
        <template v-if="User.subjectType.length > 1">
          <tab-item :selected="Route.name === 'camera_physics'" @click.native="$router.replace('physics')">物理</tab-item>
        </template>
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
import modules from './modules/store'
import store from '@/store'

export default {
  name: 'camera',
  components: {
    XHeader, ViewBox, Tab, TabItem
  },
  computed: {
    ...mapGetters(['Route', 'User'])
  },
  beforeCreate () {
    store.registerModule('camera', {
      ...modules
    })
  }
}
</script>
