<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import store from './Store'

 export default {
    store
  }
</script>

<style>
  @import '~vux/dist/vux.css';

  @font-face {
    font-family: 'iconfont';
    src:url('assets/iconfont.ttf') format('truetype')
  }

  @font-face {
    font-family: 'simhei ';
    src:url('assets/simhei.ttf') format('truetype')
  }
   html,body{
    -webkit-user-select: none;
    user-select: none;
    font-family: 'simhei';
    background:#f0f0f0;
  }
  .iconfont{
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
      font-style:normal;
      font-family:"iconfont";
  }
  .weui_tabbar_item{
    background:#fff;
  }
  .vux-header{
    color:#fff;
    background-color:#4bb7aa;
    .vux-header-right a{color:#fff;}
    .vux-header-left, .vux-header .vux-header-right{font-size:16px;}
    .vux-header-left .vux-header-back:before{border:1px solid #fff;color:#fff;}
    .vux-header-title, .vux-header h1{margin-left:88px;}
  }
  .vux-header .vux-header-left a{color:#fff;}
  .vux-header .vux-header-left .vux-header-back:before{border-color:#fff;}
  
  
</style>
