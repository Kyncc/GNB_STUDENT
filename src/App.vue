<template>
  <div>
    <router-view keep-alive></router-view>
    <loading :show="isLoading" text="请稍候" position="absolute"></loading>
    <toast :show="show" type="text" :text="msg" :time="1000"></toast>
  </div>
</template>

<script>
import store from './store'
import {Loading,Toast} from 'vux'
import { mapState } from 'vuex'
import './common/common.less'

export default {
  components: {
    Loading,Toast
  },
  store,
  computed: mapState({
    msg: state => state.tools.toastMsg,
    show: state => state.tools.toastShow,
    isLoading: state => state.tools.isLoading
  })
}
</script>