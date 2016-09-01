<template>
  <div>
    <router-view></router-view>
    <toast :show.sync="toastShow" type="text" :time="2000">{{toastMsg}}</toast>
  </div>
</template>

<script>
import store from './store'
import './common/transition.less'
import { Toast } from 'vux'

import { getToastMsg,getToastShow } from './common/actions'
import { toastMsg,toastShow } from './common/getters'
export default {
  components: {
     Toast
  },
  store,
  vuex: {
    getters: {
      toastMsg: toastMsg,
      toastShow:toastShow
    },
    actions: {
      getToastMsg,
      getToastShow
    }
  },
}
</script>

<style>
  @font-face {
    font-family: 'iconfont';
    src:url('assets/iconfont.ttf') format('truetype')
  }

  @font-face {
    font-family: 'simhei ';
    src:url('assets/simhei.ttf') format('truetype')
  }
   html,body{
    -webkit-user-select: none;
    user-select: none;
    font-family: 'simhei';
    background:#edf2f1;
  }
  .iconfont{
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
      font-style:normal;
      font-family:"iconfont";
  }
  .weui_cells{margin-top:0;}
  .weui_tabbar_item{
    background:#fff;
  }
  .vux-header{
    color:#fff ;
    background-color:#4bb7aa ;
    .vux-header-right a{color:#fff }
  }
  .vux-header-right a{color:#fff;}
  .vux-header .vux-header-title, .vux-header h1{margin-left:88px;}
  .vux-header .vux-header-left a{color:#fff;}
  .vux-header .vux-header-left .vux-header-back:before{border-color:#fff;}
  .weui_btn_primary{background:#4bb7aa;}
  .weui_btn_primary:not(.weui_btn_disabled):active {
    color: hsla(0,0%,100%,.4);
    background-color: #4bb7aa;
  }
  .weui_btn_disabled {
    color: hsla(0,0%,100%,.6);
    background: #ccc !important;
  }
  .weui_toast {
    top:85%;
  }
   @import 'assets/vux.css';
</style>
