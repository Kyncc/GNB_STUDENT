<template >
    <view-box v-ref:view-box class="reportDetail">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                成绩报告单
            </x-header>
        </div>

        <div style="padding-top:46px;">
            <header class="sectionHeader">第一章集合的概念</header>
            <div class="section">
                <article class="difficultBlock">
                    <div><p class="per-35 tl" style="color:#487d68">难度等级</p><p class="per-21">1</p><p class="per-21">2</p><p class="per-21 ">3</p></div>
                    <div><p class="per-35 tl" style="color:#487d68">记录题型</p><p class="per-21">50个</p><p class="per-21">60个</p><p class="per-21">60个</p></div>
                    <div><p class="per-35 tl" style="color:#487d68">掌握程度</p><p class="per-21">72.5%</p><p class="per-21">72.5%</p><p class="per-21 ">72.5%</p></div>
                </article>

                 <article class="recordBlock">
                    <header><h1 style="color:#487d68">记录状况</h1></header>
                    <div><p class="per-35 tl">1~5次</p><p class="per-40 advice">继续加强练习</p><p class="per-25 tr">2个</p></div>
                    <div><p class="per-35 tl">6~20次</p><p class="per-40 advice">继续加强练习</p><p class="per-25 tr">2个</p></div>
                    <div><p class="per-35 tl">≥21次</p><p class="per-40 advice">继续加强练习</p><p class="per-25 tr">2个</p></div>
                    <div><p class="per-35 tl">斩题数</p><p class="per-40 advice">继续加强练习</p><p class="per-25 tr">2个</p></div>
                    <div><p class="per-35 tl">放弃数</p><p class="per-40 advice">继续加强练习</p><p class="per-25 tr">2个</p></div>
                </article>

                <article class="recordBlock">
                    <header><h1 style="color:#487d68">错误原因</h1></header>
                    <div><p class="per-35 tl">知识型错误</p><p class="per-40 advice">继续加强练习</p><p class="per-25 tr">80%</p></div>
                    <div><p class="per-35 tl">方法型错误</p><p class="per-40 advice">继续加强练习</p><p class="per-25 tr">48%</p></div>
                    <div><p class="per-35 tl">审题型错误</p><p class="per-40 advice">继续加强练习</p><p class="per-25 tr">38%</p></div>
                    <div><p class="per-35 tl">计算错误</p><p class="per-40 advice">继续加强练习</p><p class="per-25 tr">82%</p></div>
                    <div><p class="per-35 tl">未记录错误</p><p class="per-40 advice">继续加强练习</p><p class="per-25 tr">28%</p></div>
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
