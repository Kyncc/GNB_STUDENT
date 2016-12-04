<template >
    <view-box v-ref:view-box class="reportDetail">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                成绩报告单
            </x-header>
        </div>

        <div style="padding-top:46px;">
            <template v-if="reportDetail.length != 0">
                <header class="sectionHeader">{{reportDetail.chapter.name}}</header>
                <div class="section">
                    <article class="difficultBlock">
                        <div><p class="per-35 tl" style="color:#487d68">难度等级</p><p class="per-21">1</p><p class="per-21">2</p><p class="per-21 ">3</p></div>
                        <div><p class="per-35 tl" style="color:#487d68">记录题型</p><p class="per-21">{{reportDetail.degree_level.level1_count}}个</p><p class="per-21">{{reportDetail.degree_level.level2_count}}个</p><p class="per-21">{{reportDetail.degree_level.level3_count}}个</p></div>
                        <div><p class="per-35 tl" style="color:#487d68">掌握程度</p><p class="per-21">{{reportDetail.degree_level.level1_percentage}}</p><p class="per-21">{{reportDetail.degree_level.level2_percentage}}</p><p class="per-21 ">{{reportDetail.degree_level.level3_percentage}}</p></div>
                    </article>

                    <article class="recordBlock">
                        <header><h1 style="color:#487d68">记录状况</h1></header>
                        <div><p class="per-35 tl">1~5次</p><p class="per-40 advice">急需加强练习</p><p class="per-25 tr">{{reportDetail.record_times.less_five_time}}个</p></div>
                        <div><p class="per-35 tl">6~20次</p><p class="per-40 advice">适当增加练习</p><p class="per-25 tr">{{reportDetail.record_times.less_twenty_time}}个</p></div>
                        <div><p class="per-35 tl">≥21次</p><p class="per-40 advice">无需加强练习</p><p class="per-25 tr">{{reportDetail.record_times.greater_twenty_time}}个</p></div>
                        <div><p class="per-35 tl">斩题数</p><p class="per-40 advice"></p><p class="per-25 tr">{{reportDetail.record_times.loose_time}}个</p></div>
                        <div><p class="per-35 tl">放弃数</p><p class="per-40 advice"></p><p class="per-25 tr">{{reportDetail.record_times.win_time}}个</p></div>
                    </article>

                    <!--<article class="recordBlock">
                        <header><h1 style="color:#487d68">错误原因</h1></header>
                        <div><p class="per-35 tl">知识型错误</p><p class="per-40 advice">概念定理不清</p><p class="per-25 tr">{{reportDetail.error_reason.type1_count}}个</p></div>
                        <div><p class="per-35 tl">方法型错误</p><p class="per-40 advice">应变能力不够</p><p class="per-25 tr">{{reportDetail.error_reason.type2_count}}个</p></div>
                        <div><p class="per-35 tl">审题型错误</p><p class="per-40 advice">思想不集中、粗心</p><p class="per-25 tr">{{reportDetail.error_reason.type3_count}}个</p></div>
                        <div><p class="per-35 tl">计算错误</p><p class="per-40 advice">答题不规范</p><p class="per-25 tr">{{reportDetail.error_reason.type4_count}}个</p></div>
                        <div><p class="per-35 tl">未记录错误</p><p class="per-40 advice"></p><p class="per-25 tr">{{reportDetail.error_reason.type0_count}}个</p></div>
                    </article>-->
                </div>
            </template>

            <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
				<span slot="no-results" style="color:#4bb7aa;">
					<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
					<p style="font-size:1rem;display:inline-block;"></p>
				</span>
				<span slot="no-more"></span>
			</infinite-loading>
        </div>  
    </view-box>
</template>

<script>
import store from '../../store'
import { XHeader,Panel,ViewBox,Flexbox,FlexboxItem,XButton} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {token,chapterId } from '../../common/getters'
import {reportDetail,reportSubjectId} from '../getters'
import {getReportDetail,clearDetail} from '../actions'
import '../index.less'

export default {
  components: {
    XHeader,ViewBox,Panel,Flexbox,FlexboxItem,XButton,InfiniteLoading
  },
  vuex: {
    getters: {
        reportSubjectId,token,reportDetail,chapterId
    },
    actions: {
        getReportDetail,clearDetail
    }
  },
  store,
  created(){
      this.clearDetail();
  },
  methods: {
    _onInfinite(){
        this.getReportDetail({
            token:this.token,   
            chapter_id:this.chapterId,
            subject_id:this.reportSubjectId
        },()=>{
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
        });
    }   
  }
}
</script>
