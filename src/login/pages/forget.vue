<template>
  <div class="forget vux-scroller-header-box">
    <div style="height:46px;">
			<x-header :left-options="{showBack: true,preventGoBack:true}"   @on-click-back="_back" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">重置密码</x-header>
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
import {XInput,Group,XButton,Flexbox,FlexboxItem,XHeader,Countdown,Cell} from 'vux'
import { getForgetCode } from '../actions'
import { forgetMessageCode,forgetMobile } from '../getters'
import * as _ from '../../config/whole.js'

export default {
  components: {
     XInput,
     Group,
     XButton,
     FlexboxItem,
     Flexbox,
     XHeader,
     Countdown,
     Cell
  },
  vuex: {
    getters: {
      forgetMessageCode,
      forgetMobile
    },
    actions: {
      getForgetCode
    }
  },
  data(){
    return{
      disableMobile: true,
      disableNext:true,
      currentDown:false,
      mobile:'',
      code:'',
      btnValue:'获取验证码'
    }
  },
  methods:{
    _back(){
        this.$router.replace('/')
    },
    _next(){
       if(this.forgetMessageCode == this.code){
          this.$router.replace('forget/password');
       }else{
         this.code = '';
         _.toast('错误的验证码');
       }
    },
    _getCode(){
        if(this.currentDown){
           return;
        }
        this.currentDown = true;
        let time = 5;
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
            type:2
        }
        this.getForgetCode(params);
    }
  },
  computed: {
     disableMobile(){
         return (this.$refs.mobile.valid && !this.currentDown ? false : true);
     },
     disableNext(){
        return  (this.$refs.mobile.valid && this.$refs.code.valid  ? false : true);
     }
  }
}
</script>
