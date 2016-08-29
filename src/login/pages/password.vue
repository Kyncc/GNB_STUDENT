<template>
  <div class="register vux-scroller-header-box">
    <div style="height:46px;">
			<x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">设置密码</x-header>
		</div>
    <div class="icon">
      <img src="../../assets/login/icon.jpg">
    </div>
    <div class="title">
      <img src="../../assets/login/title.png">
    </div>
    <flexbox :gutter="0" wrap="wrap">
       <flexbox-item :span="1/12"></flexbox-item>
       <flexbox-item :span="10/12">
          <group>
            <x-input name="password" placeholder="请输入密码" type="password" :min="6" :max="18"></x-input>
          </group>
        </flexbox-item>
       <flexbox-item :span="1/12"></flexbox-item>
       <flexbox-item :span="1/12"></flexbox-item>
       <flexbox-item :span="10/12">
          <group>
            <x-input name="password" placeholder="请再次输入密码" type="password" :min="6" :max="18"></x-input>
          </group>
        </flexbox-item>
    </flexbox>
    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="1/12"></flexbox-item>
      <flexbox-item :span="10/12">
        <group>
           <x-button type="primary" @click="_complete">完成</x-button>
        </group>
      </flexbox-item>
      <flexbox-item :span="1/12"></flexbox-item>
    </flexbox>
  </div>
    
   
</template>

<script>
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
  methods:{
    _complete(){
      router.go('/');
    }
  }
}
</script>


<style lang="less">
  .register{
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
         padding:.75em 65/40em;
        .weui_input{text-align:center;font-size:32/40em;}
        .weui_btn_primary{background:#4bb7aa;}
        .weui_cell{border-left:1px solid #d9d9d9;border-right:1px solid #d9d9d9;margin-bottom:0;}
        .btnWapper{
          padding:66/40em 0 0;
        }
    }
  }
</style>