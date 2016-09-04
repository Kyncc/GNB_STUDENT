<template>
  <div>
    <router-view></router-view>
    <loading :show="isLoading" text="载入中"  position="absolute"></loading>
    <toast :show.sync="toastShow" type="text" :text="toastMsg"></toast>
  </div>
</template>

<script>
import store from './store'
import './common/common.less'
import {Loading,Toast} from 'vux'
import {toastMsg,toastShow,isLoading} from './common/getters'
import {getIsLoading} from './common/actions'

export default {
  components: {
     Loading,Toast
  },
  store,
  vuex: {
    getters: {
      toastMsg,
      toastShow,
      isLoading
    },
    actions: {
      //getIsLoading
    }
  },
  ready(){
    setTimeout(function(){
      //getIsLoading(false);
    },3000);
  }
}
</script>

<style>
   @import 'assets/vux.css';
</style>
