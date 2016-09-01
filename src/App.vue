<template>
  <div>
    <router-view></router-view>
    <toast :show.sync="toastShow" type="text" :time="2000">{{toastMsg}}</toast>
  </div>
</template>

<script>
import store from './store'
import './common/transition.less'
import './common/common.less'
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
   @import 'assets/vux.css';
</style>
