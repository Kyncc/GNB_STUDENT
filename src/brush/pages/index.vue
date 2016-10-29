<template >
    <view-box v-ref:view-box class="brushIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
                刷题型
            </x-header>
        </div>

        <div style="padding-top:46px;">
            <header class="sectionHeader vux-1px-b">必修1</header>
            <section class="section">
                <div class="sectionTitle">
                    <h1 style="width:73%;display:inline-block;float:left;">第一章 集合与函数</h1>
                    <x-button mini plain type="primary" style="width:25%;margin:.25rem 0;">巩固练习</x-button>
                </div>
                <div  class="sectionDegree">
                    <h3 style="width:73%;display:inline-block;float:left;">掌握程度<b>87%</b></h3>
                    <x-button mini plain type="primary" style="width:25%;margin:.25rem 0;">剩余题型</x-button>
                </div>
            </section>

            <section class="section">
                <div class="sectionTitle">
                    <h1 style="width:73%;display:inline-block;float:left;">第一章 集合与函数</h1>
                    <x-button mini plain type="primary" style="width:25%;margin:.25rem 0;">巩固练习</x-button>
                </div>
                <div  class="sectionDegree">
                    <h3 style="width:73%;display:inline-block;float:left;">掌握程度<b>87%</b></h3>
                    <x-button mini plain type="primary" style="width:25%;margin:.25rem 0;">剩余题型</x-button>
                </div>
            </section>
            
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
