<template >
    <view-box v-ref:view-box class="reportIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
                成绩报告单
                <a slot="right" @click="_change()">
                    {{subjectName}}
                </a>
            </x-header>
        </div>

        <div style="padding-top:46px;">
             <accordion :list="reportChapter" link="report/detail/" @on-click-back="_openChapter" ></accordion>
        </div>

        <gnb-change-sub :visible.sync="visible" :subject="subjectList" :selected="2" @on-click-back="_click"><gnb-change-sub>
    </view-box>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import {XHeader,Panel,ViewBox,Flexbox,FlexboxItem,XButton,Group,Cell} from 'vux'
import {subject_id,token } from '../../common/getters'
import {reportChapter} from '../getters'
import {getReportChapter,changeChapter} from '../actions'
import gnbChangeSub from '../../components/changesub/index.vue'
import accordion from '../../components/accordion'
import '../index.less'

export default {
  components: {
    XHeader,ViewBox,Panel,Flexbox,FlexboxItem,XButton,Group,Cell,accordion,gnbChangeSub
  },
  methods: {
	_back() {
      this.$router.go('/main');
    },
    _change(){
        this.visible = true;
    },
    _click(item){
        this.subjectName = item.value;
        this.visible = false;
    },
    _openChapter(index){
        this.changeChapter(index);
    }   
  },
  vuex: { 
    getters: {
        subject_id,token,reportChapter
    },
    actions: {
        changeChapter
    }
  },
  store,
   data(){
        return {
			visible:false,
            subjectList:['math','physics'],
            subjectName:'数学'
        }
    },
  ready(){
    
  }
}
</script>
