<template>
  <div class="login">
    <div class="icon">
      <img src="../../assets/login/icon.jpg"/>
    </div>
    <div class="title">
      <img src="../../assets/login/title.png"/>
    </div>
    <group class="weui_cells_form">
      <x-input name="mobile" placeholder="手机号" keyboard="number" :value.sync="mobile" is-type="china-mobile" v-ref:mobile></x-input>
      <x-input name="password" placeholder="密码" type="password" :value.sync="password" :min="6" :max="18" v-ref:password ></x-input>
    </group>
    <div class="btnWapper">
      <x-button :disabled="disable" @click='_login' type="primary" >登录</x-button>
      <div class="link">
        <a v-link="{ path: 'forget',replace: true}" class="resetPwd">登录遇到问题?</a>
        <a v-link="{ path: 'register',replace: true }" class="register">新用户注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import '../main.less'
import {XInput,Group,XButton} from 'vux'
import { login } from '../actions'
import { userInfo,registerMobile } from '../getters'
import * as _ from '../../config/whole'

export default {
  components: {
     XInput,
     Group,
     XButton
  },
  vuex: {
    getters: {
      userInfo,registerMobile
    },
    actions: {
      login
    }
  },
  data(){
    return{
      disable: false,
      mobile:this.registerMobile,
      password:''
    }
  },
  methods:{
    _login(){
      let params = {
        mobile:this.mobile,
        pwd:this.password
      }
      this.login(params,()=>{
        setTimeout(()=>{
           _.leave();
          this.$router.replace('/main');
        },500);
      },()=>{
          this.pwd = '';
      });
    }
  },
  computed: {
     disable(){
        return (this.$refs.mobile.valid && this.$refs.password.valid ? false : true);
     }
  },
  ready(){
        function plusReady() {
          plus.navigator.closeSplashscreen();
        }
        if(window.plus) {
          plusReady();
        } else {
          document.addEventListener('plusready', plusReady, false);
        }
      }
  }
</script>
