<template >
    <view-box v-ref:view-box class="reportIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
                成绩报告单
            </x-header>
        </div>

        <div style="padding-top:46px;">
             <accordion :list="reportChapter" link="report/detail/"></accordion>
        </div>

    </view-box>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import {XHeader,Panel,ViewBox,Flexbox,FlexboxItem,XButton,Group,Cell} from 'vux'
import {subject_id,token } from '../../common/getters'
import {reportChapter} from '../getters'
import {getReportChapter} from '../actions'
import accordion from '../../components/accordion'
import '../index.less'

export default {
  components: {
    XHeader,ViewBox,Panel,Flexbox,FlexboxItem,XButton,Group,Cell,accordion
  },
  methods: {
	_back() {
      this.$router.go('/main');
    }
  },
  vuex: {
    getters: {
        subject_id,token,reportChapter
    },
    actions: {

    }
  },
  store,
   data(){
        return {

        }
    },
  ready(){

  }
}
</script>
