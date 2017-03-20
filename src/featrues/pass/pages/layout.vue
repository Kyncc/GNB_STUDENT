<template>
  <router-view keep-alive></router-view>
</template>

<script>
import './index.less'
import modules from '../modules/store'
import store from 'src/store'


store.registerModule('pass', {
  ...modules
})
</script>