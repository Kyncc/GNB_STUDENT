<template>
  <div class="register vux-scroller-header-box">
    <div style="height:46px;">
			<x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">用户注册</x-header>
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
    <div>
      <x-button type="primary"  :disabled="disableNext" @click="_next" style="width:90%">下一步</x-button>
    </div>
  </div>

  <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="已注册教师身份,确定清除数据" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>
</template>

<script>
import '../main.less'
import {XInput,Group,XButton,XHeader,Cell,Confirm} from 'vux'
import { getRegisterCode } from '../actions/register'
import { registerMessageCode,registerMobile,registerTeacher} from '../getters'
import * as _ from '../../config/whole.js'

export default {
  components: {
    XInput,Group,XButton,XHeader,Cell,Confirm
  },
  data(){
    return{
      show: false,
      disableMobile: true,
      disableNext:true,
      currentDown:false,
      mobile:'',
      code:'',
      btnValue:'获取验证码'
    }
  },
  vuex: {
    getters: {
      registerMessageCode,registerTeacher,registerMobile
    },
    actions: {
      getRegisterCode
    }
  },
  methods:{
     onAction(type) {
        if(type=='确认'){
            this.$router.replace({path: 'register/password',registerMobile:this.mobile});
        }
        return
    },
    _back(){
        this.$router.replace('/');
    },
    _next(){
       if(this.registerMessageCode == this.code){
          this.$router.replace({path: 'register/password',registerMobile:this.mobile});
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
        let params = {mobile: this.mobile}
        
        this.getRegisterCode(params,()=>{
            this.show = this.registerTeacher  
        });


        
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
