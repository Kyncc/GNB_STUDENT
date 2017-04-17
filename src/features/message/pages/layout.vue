<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import modules from '../modules/store'
import store from '@/store'
store.registerModule('message', {
  ...modules
})

export default {
  name: 'message'
}
</script>
<style lang="less" scrope>
@import "../../../components/gnb_messageList/index.less";
</style>

