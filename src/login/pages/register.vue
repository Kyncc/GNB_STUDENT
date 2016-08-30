<template>
  <div class="register vux-scroller-header-box">
    <div style="height:46px;">
			<x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">用户注册</x-header>
		</div>
    <div class="icon">
      <img src="../../assets/login/icon.jpg">
    </div>
    <div class="title">
      <img src="../../assets/login/title.png">
    </div>
    <group class="weui_cells_form">
      <x-input name="mobile" placeholder="手机号" keyboard="number" is-type="china-mobile" :value.sync="mobile" v-ref:mobile></x-input>
      <x-input name="code" placeholder="验证码" keyboard="number" class="weui_vcode" style="padding:0 15px;" :value.sync="code" :min="6" :max="6"  v-ref:code>
        <x-button slot="right" :text="btnValue" type="primary" :disabled="disableMobile" style="width:118px;height:49px;border-radius:0;"  @click="_getCode"></x-button>
      </x-input>
    </group>
    <!--<p class="agreement">
      <input type="checkbox" v-model="agree" /> 我已经阅读并同意<a v-link="{ path: 'agreement' }">使用条款和隐私政策</a>
    </p>-->
    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="1/20"></flexbox-item>
      <flexbox-item :span="18/20">
        <group>
           <x-button type="primary"  :disabled="disableNext" @click="_next">下一步</x-button>
        </group>
      </flexbox-item>
      <flexbox-item :span="1/20"></flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import '../main.less'
import {XInput,Group,XButton,Flexbox,FlexboxItem,XHeader,Cell} from 'vux'
import Vue from 'vue'
import Router from 'vue-router'

import { getCode } from '../actions'
import { messageCode,registerMobile } from '../getters'

Vue.use(Router)
const router = new Router();
export default {
  components: {
     XInput,
     Group,
     XButton,
     FlexboxItem,
     Flexbox,
     XHeader,
     Cell
  },
  data(){
    return{
      disableMobile: true,
      disableNext:true,
      currentDown:false,
      agree:true,
      mobile:'',
      code:'',
      btnValue:'获取验证码'
    }
  },
  vuex: {
    getters: {
      messageCode: messageCode,
      registerMobile: registerMobile
    },
    actions: {
      getCode
    }
  },
  methods:{
    _next(){  
       if(this.messageCode == this.code){
          router.go('forget/password');
       }else{
         this.code = '';
       }
    },
    _getCode(){
        if(this.currentDown){
           return;
        }
        this.currentDown = true;
        let time = 60;
        let _this = this;
        let timeDown = setInterval(function(){
            time--;
            _this.btnValue = '已发送('+time +')' ;
            if(time == '0') {
              clearInterval(timeDown);
              _this.btnValue = '获取验证码';
              _this.currentDown = false;
            };
        },1000);
        let params = {
            mobile: this.mobile,
            type:1
        }
        this.getCode(params);
    }
  },
  computed: {
     disableMobile(){
         return (this.$refs.mobile.valid && !this.currentDown ? false : true);
     },
     disableNext(){
        return  (this.$refs.mobile.valid && this.$refs.code.valid && this.agree ? false : true);
     }
  }
}
</script>