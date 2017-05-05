<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import modules from '../modules/store'
import store from '@/store'
store.registerModule('settins', {
  ...modules
})

export default {
  name: 'settings'
}
</script>
