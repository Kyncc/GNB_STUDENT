<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '消息通知'}"></x-header>
    <group gutter="0">
      <cell title="纠错信息" link="message/correct" is-link>
        <badge v-if="News.correct"></badge>
      </cell>
      <cell title="系统信息" link="message/system" is-link>
        <badge v-if="News.system"></badge>
      </cell>
    </group>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, Badge} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, Cell, Group, ViewBox, Badge
  },
  computed: {
    ...mapGetters(['News'])
  }
}
</script>
