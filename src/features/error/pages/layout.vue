<template>
  <view-box ref="error" body-padding-top="86px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '我的错题'}"></x-header>
      <tab>
        <tab-item :selected="Route.name === 'error_math'" @click.native="$router.replace('math')">数学</tab-item>
        <template v-if="User.subjectType.length > 1">
          <tab-item :selected="Route.name === 'error_physics'" @click.native="$router.replace('physics')">物理</tab-item>
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
import modules from '../modules/store'
import store from '@/store'

export default {
  name: 'error',
  components: {
    XHeader, ViewBox, Tab, TabItem
  },
  computed: {
    ...mapGetters(['Route', 'User'])
  },
  beforeCreate () {
    store.registerModule('error', {
      ...modules
    })
  }
}
</script>
