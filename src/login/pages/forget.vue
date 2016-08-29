<template>
  <div class="forget vux-scroller-header-box">
    <div style="height:46px;">
			<x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">重置密码</x-header>
		</div>
    <div class="icon">
      <img src="../../assets/login/icon.jpg">
    </div>
    <div class="title">
      <img src="../../assets/login/title.png">
    </div>
    <group class="weui_cells_form">
      <x-input name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" :value.sync="mobile" v-ref:mobile></x-input>
      <x-input name="code" placeholder="请输入验证码" keyboard="number"  class="weui_vcode" style="padding:0 15px;" :value.sync="code"  :min="4" :max="4"  v-ref:code>
          <x-button slot="right" type="primary" :disabled="disableMobile" >发送验证码</x-button>
      </x-input>
    </group>
    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="1/12"></flexbox-item>
      <flexbox-item :span="10/12">
        <group>
           <x-button type="primary" @click="_next" :disabled="disableNext">下一步</x-button>
        </group>
      </flexbox-item>
      <flexbox-item :span="1/12"></flexbox-item>
    </flexbox>
  </div>
   
</template>

<script>
import '../main.less'
import {XInput,Group,XButton,Flexbox,FlexboxItem,XHeader} from 'vux'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router();
export default {
  components: {
     XInput,
     Group,
     XButton,
     FlexboxItem,
     Flexbox,
     XHeader
  },
  data(){
    return{
      disableMobile: true,
      disableNext:true,
      mobile:'',
      code:''
    }
  },
  methods:{
    _next(){
      router.go('forget/password');
    }
  },
  computed: {
     disableMobile(){
         return (this.$refs.mobile.valid ? false : true);
     }
  }
}
</script>
