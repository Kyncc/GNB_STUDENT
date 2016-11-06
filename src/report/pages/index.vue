<template >
    <view-box v-ref:view-box class="reportIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
                成绩报告单
            </x-header>
        </div>

        <div style="padding-top:46px;">
            <div class="section" >
                <header class="sectionHeader" v-tap="_click()">必修1<span class="with_arrow"></span></header>
                <group :ref=>
                    <cell title="第1章" link="report/detail/1"></cell>
                    <cell title="第2章" link="report/detail/2"></cell>
                    <cell title="第3章" link="report/detail/3"></cell>
                </group>
            </div>

            <div class="section">
                <header class="sectionHeader">必修2<span class="with_arrow"></span></header>
                <group>
                    <cell title="第1章" link="report/detail/1"></cell>
                    <cell title="第2章" link="report/detail/2"></cell>
                    <cell title="第3章" link="report/detail/3"></cell>
                </group>
            </div>
        </div>


    </view-box>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import { XHeader,Panel,ViewBox,Flexbox,FlexboxItem,XButton,Group,Cell} from 'vux'
import { subject_id,token } from '../../common/getters'
import {reportChapter} from '../getters'
import {getReportChapter} from '../actions'
import '../index.less'

export default {
  components: {
    XHeader,ViewBox,Panel,Flexbox,FlexboxItem,XButton,Group,Cell
  },
  methods: {
	_back() {
      this.$router.go('/main');
    }
  },
  vuex: {
    getters: {
        subject_id,token
    },
    actions: {

    }
  },
  store,
  ready(){
    
  }
}
</script>
