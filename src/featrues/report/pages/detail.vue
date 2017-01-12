<template >
  <view-box v-ref:view-box class="reportDetail">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">知识图谱</x-header>
    </div>

    <div style="padding-top:46px;">
      <template v-if="reportDetail.chapter">
        <header class="sectionHeader">{{reportDetail.chapter.name}}</header>
        <div class="section">
          <article class="difficultBlock">
            <div>
              <p class="per-30 tl" style="color:#487d68">难度等级</p>
              <p class="per-20">1</p>
              <p class="per-20">2</p>
              <p class="per-20">3</p>
            </div>
            <div>
              <p class="per-30 tl" style="color:#487d68">题型总数</p>
              <p class="per-20">{{reportDetail.degree_level.level1_count}}个</p>
              <p class="per-20">{{reportDetail.degree_level.level2_count}}个</p>
              <p class="per-20">{{reportDetail.degree_level.level3_count}}个</p>
            </div>
          </article>

          <article class="recordBlock">
              <header>
                <p class="per-40 tl" style="color:#487d68">习题册名称</p>
                <p class="per-25 tr" style="color:#487d68">错题数量</p>
                <p class="per-25 tr" style="color:#487d68">记录数量</p>
              </header>
              <div v-for="item in reportDetail.workbook" >
                <p class="per-40 tl ellipsis" style="padding-top:.3rem;">{{item.workbook_name}}</p>
                <p class="per-25 tr" style="display: inline-block">{{item.error_count}}</p>
                <p class="per-25 tr" style="display: inline-block">{{item.total_count}}</p>
              </div>
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
import {token,chapterId,path } from '../../../common/getters'
import {reportDetail,reportSubjectId} from '../getters'
import {getReportDetail,clearDetail} from '../actions'
import './index.less'

export default {
  components: {
    XHeader,ViewBox,Panel,Flexbox,FlexboxItem,XButton,InfiniteLoading
  },
  vuex: {
    getters: {
      reportSubjectId,token,reportDetail,chapterId,path
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
    path(){
      if(this.path.indexOf("/bag/report/detail/") >=0 ){
        this.$broadcast('$InfiniteLoading:reset');
      }
    }
  }
}
</script>
