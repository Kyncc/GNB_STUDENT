<template>
 <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import store from '@/store'
import modules from './modules/store'

export default {
  name: 'camera',
  beforeCreate () {
    store.registerModule('camera', {
      ...modules
    })
  }
}
</script>
