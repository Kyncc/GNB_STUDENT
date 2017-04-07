<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: 'about'
}

import store from '@/store'
import modules from '../modules/store'

store.registerModule('about', {
  ...modules
})
</script>
