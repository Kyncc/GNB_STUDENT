<template>
  <div class="register vux-scroller-header-box">
    <div style="height:46px;">
			<x-header :left-options="{showBack: true}"  style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">用户注册</x-header>
		</div>
    <div class="icon">
      <img src="../../../assets/login/icon.jpg">
    </div>
    <div class="title">
      <img src="../../../assets/login/title.png">
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
    <confirm :show.sync="confirmShow" confirm-text="确定" cancel-text="取消" title="已是教师用户,注册会清空数据" @on-confirm="_quit('确认')" @on-cancel="_quit('取消')"></confirm>
  </div>
</template>

<script>
import {XInput,Group,XButton,Flexbox,FlexboxItem,XHeader,Cell,Confirm} from 'vux'
import { mapActions,mapGetters } from 'vuex'
import * as _ from 'config/whole.js'

export default {
  components: {
     XInput,
     Group,
     XButton,
     FlexboxItem,
     Flexbox,
     XHeader,
     Cell,Confirm
  },
  data(){
    return{
      currentDown:false,
      confirmShow: false,
      cover:false,
      mobile:'',
      code:'',
      btnValue:'获取验证码'
    }
  },
  methods:{
    ...mapActions(['getRegisterCode']),
    _quit(type) {
        if(type=='确认'){
          this.cover = true;
          this.getRegisterCode({
              cover:this.cover,
              mobile: this.mobile
          })
          .then(()=>{
            _.toast("注册码已发送");
          })
        }
    },
    _next(){
       if(this.registerCode == this.code){
          this.$router.replace({path: 'setPassword', registerMobile:this.mobile});
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
        let params = {
            cover:this.cover,
            mobile: this.mobile
        }
        //如果是已教师，则同意清空师账户后在发送接口获取验证码
        this.getRegisterCode(params)
        .then((response) => {
            if(response.data.data.isTeacher){
              this.confirmShow = true;
            }else{
              _.toast("注册码已发送");
            }
        })
    }
  },
  computed: {
     ...mapGetters(['registerCode','registerMobile']),
     disableMobile(){
         return (this.$refs.mobile.valid && !this.currentDown ? false : true);
     },
     disableNext(){
         return  (this.$refs.mobile.valid && this.$refs.code.valid ? false : true);
     }
  }
}
</script>
