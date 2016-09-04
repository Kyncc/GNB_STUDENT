<template>
  <div>
    <router-view></router-view>
  </div>
  <loading :show="isLoading" :text="loadingText" position="absolute"></loading>
</template>

<script>
import store from './store'
import './common/transition.less'
import './common/common.less'
import { Toast,Loading } from 'vux'

import { getToastMsg,getToastShow } from './common/actions'
import { toastMsg,toastShow } from './common/getters'
export default {
  components: {
     Toast,Loading
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
  data(){
    return{
      isLoading:false,
      loadingText:'加载中'
    }
  }
}
</script>

<style>
   @import 'assets/vux.css';
</style>
