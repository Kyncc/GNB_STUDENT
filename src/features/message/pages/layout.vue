<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import modules from '../modules/store'
import store from '@/store'
import '@/components/gnb_messageList/index.less'

export default {
  name: 'message',
  beforeCreate () {
    store.registerModule('message', {
      ...modules
    })
  }
}
</script>
