<template>
  <view-box ref="report" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '知识图谱'}"></x-header>
      <tab style="position:fixed;top:46px;width:100%">
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
import {XHeader, XInput, Group, XButton, ViewBox, Tab, TabItem} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'report',
  components: {
    XHeader, XInput, Group, XButton, ViewBox, Tab, TabItem
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
