<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>
<script>
import statistics from './index/modules/store'
import assemble from './assemble/modules/store'
import store from '@/store'

export default {
  name: 'statistics',
  beforeCreate () {
    store.registerModule('statistics', {
      ...statistics
    })
    store.registerModule('assemble', {
      ...assemble
    })
  }
}
</script>
