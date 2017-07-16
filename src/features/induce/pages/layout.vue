<template>
  <view-box ref="induce" body-padding-top="100px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '题型归纳'}"></x-header>
      <tab>
        <tab-item :selected="Route.name === 'induce_math'" @click.native="$router.replace('math')">数学</tab-item>
        <template v-if="User.subjectType.length > 1">
          <tab-item :selected="Route.name === 'induce_physics'" @click.native="$router.replace('physics')">物理</tab-item>
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
  name: 'induce',
  components: {
    XHeader, ViewBox, Tab, TabItem
  },
  computed: {
    ...mapGetters(['Route', 'User'])
  },
  beforeCreate () {
    store.registerModule('induce', {
      ...modules
    })
  }
}
</script>
