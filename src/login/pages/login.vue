<template>
  <div class="login">
    <div class="icon">
      <img src="../../assets/login/icon.jpg"/>
    </div>
    <div class="title">
      <img src="../../assets/login/title.png"/>
    </div>
    <group>
      <x-input name="mobile" placeholder="手机号" keyboard="number" :value.sync="mobile" is-type="china-mobile" v-ref:mobile></x-input>
      <x-input name="password" placeholder="密码" type="password" :value.sync="password" :min="6" :max="18" v-ref:password ></x-input>
    </group>
    <div class="btnWapper">
      <x-button type="primary" @click='_login'>登陆</x-button>
      <div class="link">
        <a v-link="{ path: 'forget' }" class="resetPwd">登陆遇到问题?</a>
        <a v-link="{ path: 'register' }" class="register">新用户注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import {XInput,Group,XButton} from 'vux'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router();
export default {
  components: {
     XInput,
     Group,
     XButton
  },
  data(){
    return{
      mobile:'',
      password:''
    }
  },
  methods:{
    _login(){
     
      console.log(this.$refs.password.valid+"&&&"+this.$refs.mobile.valid);
      //router.replace('main');
    }
  }
}
</script>


<style lang="less">
  .weui_btn_primary{background:#4bb7aa;}
  .weui_btn_primary:not(.weui_btn_disabled):active {
    color: hsla(0,0%,100%,.4);
    background-color: #4bb7aa;
  }
  .weui_btn_primary{
    background:#4bb7aa;
  }
  .login{
    .link{
      font-size:inherit;
      padding:.75em 0 1em;
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
      margin-top:46px;
      padding:1.5em 0 0;
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
    .btnWapper{
      padding:66/40em 0 1em;
      width:90%;
      margin:0 auto;
    }
  }
</style>