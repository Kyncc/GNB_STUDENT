<template >
    <view-box v-ref:view-box class="brushIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
                剩余题型
            </x-header>
        </div>

        <div style="padding-top:46px;">
            <header class="sectionHeader vux-1px-b">第一章 集合与函数概念</header>
            
        </div>
    </view-box>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import { XHeader,Panel,ViewBox,Flexbox,FlexboxItem,XButton} from 'vux'
import { period_id,subject_id,token } from '../../common/getters'
import '../index.less'

export default {
  components: {
    XHeader,Panel,ViewBox,Flexbox,FlexboxItem,XButton
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
