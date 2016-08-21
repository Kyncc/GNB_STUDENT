<template>
  <div class='aboutUs'>
      <x-header :left-options="{showBack: true}">关于我们 </x-header>
    
  </div>
  
</template>

<script>
import {XHeader,XInput,Group} from 'vux'


export default {
  components: {
    XHeader,XInput,Group
  },
  methods: {
    _complete(){
      alert(1);
    }
    
    
  }
}
</script>

<style lang="less">
.aboutUs{
  .vux-header{
    color:#fff;
    background-color:#4bb7aa;
  }
  .weui_cells{margin-top:0;}
  .vux-no-group-title{margin-top:0;}
  .vux-header .vux-header-right a{color:#fff;}
  .vux-header .vux-header-left, .vux-header .vux-header-right{font-size:16px;}
  .vux-header .vux-header-left .vux-header-back:before{border-color:#fff;}
  .vux-header .vux-header-title, .vux-header h1{margin-left:88px;}
}
</style>