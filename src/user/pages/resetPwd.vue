<template>
  <div class='resetPwd'>
      <x-header :left-options="{showBack: true}">修改密码</x-header>
      <group>
        <x-input  type="password" name="oldPwd" placeholder="请输入旧密码" keyboard="password"></x-input>
        <x-input  type="password" name="newPwd" placeholder="请输入新密码" keyboard="password"></x-input>
        <x-input  type="password" name="repeatPwd" placeholder="请再次输入新密码" keyboard="password"></x-input>
      </group>
  </div>
  
</template>

<script>
import {XHeader,XInput,Group} from 'vux'
export default {
  components: {
    XHeader,XInput,Group
  }
}
</script>

<style lang="less">
@import '~vux/dist/vux.css';
.resetPwd{
  .vux-header{
    color:#fff;
    background-color:#4bb7aa;
  }
  .weui_cells{margin-top:0;}
  .vux-no-group-title{margin-top:0;}
  .vux-header .vux-header-left, .vux-header .vux-header-right{font-size:16px;}
  .vux-header .vux-header-left .vux-header-back:before{border-color:#fff;}
  .vux-header .vux-header-title, .vux-header h1{margin-left:88px;}
}
</style>