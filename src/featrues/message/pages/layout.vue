<template>
  <router-view keep-alive></router-view>
</template>


<script>
  import modules from '../modules/store'
  import store from 'src/store'

  store.registerModule('message', {
    ...modules
  })
</script>