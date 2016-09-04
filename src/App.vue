<template>
  <div>
    <router-view></router-view>
    <loading :show="isLoading" :text="loadingText"  position="absolute"></loading>
  </div>
</template>

<script>
import store from './store'
import './common/common.less'
import {Loading} from 'vux'

import { toastMsg,toastShow,isLoading} from './common/getters'
export default {
  components: {
     Loading
  },
  store,
  data(){
    return{
      loadingText:'载入中'
    }
  },
  vuex: {
    getters: {
      toastMsg,
      toastShow,
      isLoading
    }
  },
  ready(){
    console.log(this.isLoading);
  }
}
</script>

<style>
   @import 'assets/vux.css';
</style>
