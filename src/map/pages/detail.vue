<template >
    <view-box v-ref:view-box class="mapDetail">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                成绩报告单
            </x-header>
        </div>

        <div style="padding-top:46px;">
            <header class="sectionHeader">第一章集合的概念</header>
            <div class="section">
                <article class="difficultBlock">
                    <div><p class="per-20">难度等级</p><p>1</p><p>2</p><p>3</p></div>
                    <div><p class="per-20">记录题型</p><p>50个</p><p>60个</p><p>60个</p></div>
                    <div><p class="per-20">掌握程度</p><p>72.5%</p><p>72.5%</p><p>72.5%</p></div>
                </article>

                 <article class="recordBlock">
                    <header>记录状况</header>
                    <div><p class="per-20">1~5次</p><p class="per-60">继续加强练习</p><p class="per-20">2个</p></div>
                    <div><p class="per-20">6~20次</p><p class="per-60">继续加强练习</p><p class="per-20">2个</p></div>
                    <div><p class="per-20">≥21次</p><p class="per-60">继续加强练习</p><p class="per-20">2个</p></div>
                    <div><p class="per-20">斩题数</p><p class="per-60">继续加强练习</p><p class="per-20">2个</p></div>
                    <div><p class="per-20">放弃数</p><p class="per-60">继续加强练习</p><p class="per-20">2个</p></div>
                </article>

                <article class="recordBlock">
                    <header>错误原因</header>
                    <div><p>知识型错误</p><p>继续加强练习</p><p>80%</p></div>
                    <div><p>方法型错误</p><p>继续加强练习</p><p>48%</p></div>
                    <div><p>审题型错误</p><p>继续加强练习</p><p>38%</p></div>
                    <div><p>计算错误</p><p>继续加强练习</p><p>82%</p></div>
                    <div><p>未记录错误</p><p>继续加强练习</p><p>28%</p></div>
                </article>

            </div>

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
    XHeader,ViewBox,Panel,Flexbox,FlexboxItem,XButton
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
