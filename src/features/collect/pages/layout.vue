<template>
  <view-box ref="collect" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '收藏本'}"></x-header>
    <tab style="position:fixed;top:46px;width:100%;z-index:100">
      <tab-item :selected="Route.name === 'collect_math'" @click.native="$router.replace('math')">数学</tab-item>
      <template v-if="User.subjectType.length > 1">
        <tab-item :selected="Route.name === 'collect_physics'" @click.native="$router.replace('physics')">物理</tab-item>
      </template>
    </tab>
    <div style="padding-top:55px;">
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

store.registerModule('collect', {
  ...modules
})

export default {
  name: 'collect',
  components: {
    XHeader, ViewBox, Tab, TabItem
  },
  computed: {
    ...mapGetters(['Route', 'User'])
  }
}
</script>
