<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '查答案'}"></x-header>
      <tab style="position:fixed;top:46px;width:100%">
        <tab-item :selected="Route.name === 'workbook_math'" @click.native="$router.replace('math')">数学</tab-item>
        <template v-if="User.subjectType.length > 1">
          <tab-item :selected="Route.name === 'workbook_physics'" @click.native="$router.replace('physics')">物理</tab-item>
        </template>
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
import modules from '../../modules/store'
import store from '@/store'

store.registerModule('workbook', {
  ...modules
})

export default {
  name: 'workbook',
  components: {
    XHeader, XInput, Group, XButton, ViewBox, Tab, TabItem
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['Route', 'User'])
  }
}
</script>
