<template>
  <div class='resetPwd'>
      <x-header >修改密码<a slot="right">退出</a></x-header>
  </div>

</template>

<script>
import {XHeader} from 'vux'
export default {
  components: {
    XHeader
  }
}
</script>


<style lang="less">
  @import '~vux/dist/vux.css';
  .user{
    .vux-header{
      background-color:#4bb7aa;
      a{color:#fff;}
    }
    .vux-header .vux-header-left, .vux-header .vux-header-right{font-size:16px;}
    
  }
</style>