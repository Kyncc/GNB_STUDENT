<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import modules from '../modules/store'
import store from 'src/store'

store.registerModule('message', {
  ...modules
})
</script>