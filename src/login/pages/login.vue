<template>
  <div class="login">
    <div class="icon">
      <img src="../../assets/login/icon.jpg" alt="">
    </div>
    <div class="title">
      <img src="../../assets/login/title.png" alt="">
    </div>
    <div class="form">
        <group>
          <x-input title="" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
        </group>
        <group>
          <x-input title="" name="password" placeholder="请输入密码" type="password" :min="6" :max="18"></x-input>
        </group>
        <div class="btnWapper">
          <x-button type="primary">登陆</x-button>
        </div>
        <div class="link">
          <a v-link="{ path: 'main' }" class="resetPwd">登陆遇到问题?</a>
          <a v-link="{ path: 'main' }"  class="register">快速注册</a>
        </div>
     </div>
   
    
  </div>
    
   
</template>

<script>
import {XInput,Group,XButton} from 'vux'
export default {
  components: {
     XInput,
     Group,
     XButton
  }
}
</script>


<style lang="less" >
  @import '~vux/dist/vux.css';
 
  .login{
    .link{
      font-size:inherit;
      padding:.5em 0 1em;
      a{color:#6fb9e5;font-size:32/40em;}
      .resetPwd{
        float:left;
      }
      .register{
        float:right;
      }
    }
    div{
        text-align:center;
        font-size:inherit;
    }
    .icon{
      padding:60/40em 0 0;
      img{
         width:118/40em;
        height:116/40em;
      }
    }
    .title{
      img{
         width:209/40em;
         height:46/40em;
      }
    }
    .form{
        padding:1em 65/40em;
        .weui_input{text-align:center;font-size:32/40em;}
        .weui_btn_primary{background:#4bb7aa;}
        .weui_cell{border-left:1px solid #d9d9d9;border-right:1px solid #d9d9d9;}
        .btnWapper{
          padding:66/40em 0 0;
        }
        
    }
  }



</style>