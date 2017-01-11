<template >
  <view-box v-ref:view-box class="reportDetail">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">知识图谱</x-header>
    </div>

    <div style="padding-top:46px;">
      <template v-if="reportDetail.length != 0">
        <header class="sectionHeader">{{reportDetail.chapter.name}}</header>
        <div class="section">
          <article class="difficultBlock">
            <div>
              <p class="per-35 tl" style="color:#487d68">难度等级</p>
              <p class="per-21">1</p>
              <p class="per-21">2</p>
              <p class="per-21">3</p>
            </div>
            <div>
              <p class="per-35 tl" style="color:#487d68">题型总数</p>
              <p class="per-21">{{reportDetail.degree_level.level1_count}}个</p>
              <p class="per-21">{{reportDetail.degree_level.level2_count}}个</p>
              <p class="per-21">{{reportDetail.degree_level.level3_count}}个</p>
            </div>
          </article>

          <article class="recordBlock">
            <header><h1 style="color:#487d68">记录状况</h1></header>
            <div><p class="per-35 tl">习题册名称</p><p class="per-40 advice">急需加强练习</p><p class="per-25 tr">{{reportDetail.record_times.less_five_time}}个</p></div>
            <div><p class="per-35 tl">6~20次</p><p class="per-40 advice">适当增加练习</p><p class="per-25 tr">{{reportDetail.record_times.less_twenty_time}}个</p></div>
          </article>

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
import { XHeader,Panel,ViewBox,Flexbox,FlexboxItem,XButton} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {token,chapterId } from '../../../common/getters'
import {reportDetail,reportSubjectId} from '../getters'
import {getReportDetail,clearDetail} from '../actions'

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
  },
  watch: {
    chapterId(){
      this.$nextTick(() => {
        this.$broadcast('$InfiniteLoading:reset');
      });
    }
  }
}
</script>
