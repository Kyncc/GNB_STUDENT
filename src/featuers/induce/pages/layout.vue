<template>
  <view-box ref="induce" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '题型归纳'}"></x-header>
    <tab style="position:fixed;top:46px;width:100%;z-index:2017">
      <tab-item :selected="Route.name === 'Indece_Math'" @click.native="$router.replace('math')">数学</tab-item>
      <template v-if="User.subjectType.length > 1">
        <tab-item :selected="Route.name === 'Indece_Physics'" @click.native="$router.replace('physics')">物理</tab-item>
      </template>
    </tab>
    <div style="padding-top:46px;">
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

store.registerModule('induce', {
  ...modules
})

export default {
  name: 'induce',
  components: {
    XHeader, ViewBox, Tab, TabItem
  },
  computed: {
    ...mapGetters(['Route', 'User'])
  },
  methods: {
  }
}
</script>
