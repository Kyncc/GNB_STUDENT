<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import modules from '../modules/store'
import store from '@/store'

export default {
  name: 'camera',
  beforeCreate () {
    store.registerModule('camera', {
      ...modules
    })
  }
}
</script>
