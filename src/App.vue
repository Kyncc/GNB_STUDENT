<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@font-face {font-family: "iconfont";src:url('./libs/font/iconfont.ttf') format('truetype')}
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import './config/common.less';
@import 'theme.less';
</style>
