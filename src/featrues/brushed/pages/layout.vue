<template>
  <router-view keep-alive></router-view>
</template>

<script>
import './index.less'
import store from 'src/store'
import modules from '../modules/store'

store.registerModule('brushed', {
  ...modules
})
</script>