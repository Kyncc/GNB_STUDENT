<template>
  <view-box ref="collect" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '收藏本'}"></x-header>
      <tab style="position:fixed;top:46px;width:100%;z-index:2017">
        <tab-item :selected="Route.name === 'math'" @click.native="_intoPage('math')">数学</tab-item>
        <tab-item :selected="Route.name === 'physics'" @click.native="_intoPage('physics')">物理</tab-item>
      </tab>
      <div style="padding-top:46px;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div> 
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
    ...mapGetters(['Route'])
  },
  methods: {
    _intoPage (subject) {
      this.$router.replace(`${subject}`)
    }
  }
}
</script>
