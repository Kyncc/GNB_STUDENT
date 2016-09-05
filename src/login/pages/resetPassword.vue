<template>
  <div class="register vux-scroller-header-box">
    <div style="height:46px;">
			<x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">重置密码</x-header>
		</div>
    <div class="icon">
      <img src="../../assets/login/icon.jpg">
    </div>
    <div class="title">
      <img src="../../assets/login/title.png">
    </div>
    <group class="weui_cells_form">
      <x-input type="password" placeholder="新密码" keyboard="text" :value.sync="password" v-ref:password :min="6" :max="18"></x-input>
      <x-input type="password" placeholder="再次确认密码" keyboard="text" :value.sync="passwordAgain" v-ref:passwordagain :equal-with="password"></x-input>
    </group>
    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="1/20"></flexbox-item>
      <flexbox-item :span="18/20">
        <group>
           <x-button type="primary" @click="_complete" :disabled="disable">完成</x-button>
        </group>
      </flexbox-item>
      <flexbox-item :span="1/20"></flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import {XInput,Group,XButton,Flexbox,FlexboxItem,XHeader} from 'vux'
import { resetPwd } from '../actions'
import { forgetMobile } from '../getters'
import * as _ from '../../config/whole.js'

export default {
  components: {
     XInput,
     Group,
     XButton,
     FlexboxItem,
     Flexbox,
     XHeader
  }, 
  vuex: {
    getters: {
      forgetMobile
    },
    actions: {
      resetPwd
    }
  },
  data(){
    return{
      disable: true,
      password:'',
      passwordAgain:''
    }
  },
  methods:{
     _back(){
        this.$router.replace('/');
    },
    _complete(){
       let params = {
        mobile:this.forgetMobile,
        pwd:this.password
      }
      this.resetPwd(params);
    }
  },
  computed:{
     disable(){
         return (this.$refs.password.valid && this.$refs.passwordagain.valid ? false : true);
     }
  }
}
</script>
