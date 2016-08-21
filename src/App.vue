<template>
  <div>
    <router-view></router-view>
  </div>
</template>


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
</style>