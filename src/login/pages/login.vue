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
      <x-button :disabled="disable" @click='_login' type="primary" >登陆</x-button>
      <div class="link">
        <a v-link="{ path: 'forget' }" class="resetPwd">登陆遇到问题?</a>
        <a v-link="{ path: 'register' }" class="register">新用户注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import '../main.less'
import {XInput,Group,XButton} from 'vux'
import Vue from 'vue'
import Router from 'vue-router'

import { login } from '../actions'
import { userInfo } from '../getters'

Vue.use(Router)
const router = new Router();
export default {
  components: {
     XInput,
     Group,
     XButton
  },
  vuex: {
    getters: {
      userInfo: userInfo
    },
    actions: {
      login
    }
  },
  data(){
    return{
      disable: true,
      mobile:'',
      password:''
    }
  },
  methods:{
    _login(){
      let params = {
        mobile:this.mobile,
        pwd:this.password
      }
      this.login(params);
    }
  },
  computed: {
     disable(){
        return (this.$refs.mobile.valid && this.$refs.password.valid ? false : true);
     }
  }
}
</script>
