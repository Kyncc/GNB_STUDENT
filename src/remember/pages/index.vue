<template >
    <view-box v-ref:view-box class="rememberIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
                记错题
            </x-header>
        </div>

        <div style="padding-top:46px;">
            123123
        </div>
    </view-box>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import { XHeader,Panel,ViewBox} from 'vux'
import { period_id,subject_id,token } from '../../common/getters'
import '../index.less'

export default {
  components: {
    XHeader,ViewBox,Panel
  },
  methods: {
	_back() {
      this.$router.go('/main');
    }
  },
  vuex: {
    getters: {
        period_id,subject_id,token
    },
    actions: {

    }
  },
  store,
  ready(){
    
  }
}
</script>
