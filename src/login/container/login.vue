<template>
  <div class="login">
    <div class="icon">
      <img src="../../assets/login/icon.png" alt="">
    </div>
    <div class="title">
      <img src="../../assets/login/title.png" alt="">
    </div>
    <group>
      <x-input title="" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
    </group>
    <group>
      <x-input title="" name="password" placeholder="请输入密码" type="password" :min="6" :max="18"></x-input>
    </group>
    <group>
       <x-button type="primary">登陆</x-button>
    </group>
    <div>
        <a v-link="{ path: 'main' }">忘记密码</a>
    </div> 
  </div>
    
   
</template>

<script>
import {XInput,Group,XButton} from 'vux'
export default {
  components: {
     XInput,
     Group
  }
}
</script>


<style lang="less">
  @import '~vux/dist/vux.css';
  .login{
    div{
        text-align:center;
    }
    .icon{
      img{
         width:106/20em;
        height:104/20em;
      }
    }
    .title{
      img{
         width:209/20em;
         height:46/20em;
      }
    }
  }

</style>