<template>
  <div>
    <router-view></router-view>
  </div>
</template>


<style>
  @import '~vux/dist/vux.css';
  html,body{
    -webkit-user-select: none;
    user-select: none;
    font-family: 'simhei';  
  }
  @font-face {  	
    font-family: 'simhei';  	
    src:url('assets/simhei.ttf') format('truetype'), /* Safari, Android, iOS */               
  }
</style>