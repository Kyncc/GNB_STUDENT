<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import './index.less'
import modules from '../modules/store'
import store from '@/store'

store.registerModule('class', {
  ...modules
})
</script>
