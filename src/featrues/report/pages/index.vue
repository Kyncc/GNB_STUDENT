<template >
  <view-box v-ref:view-box class="reportIndex">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        知识图谱<a slot="right" @click="_changeSub()" class="changeSub">{{reportSubjectId | subName}}<span class="with_arrow"></span></a>
      </x-header>
    </div>

    <div style="padding-top:46px">
      <accordion-report :list="reportChapter" @on-click-open="_openChapter" @on-click-chapter="_intoChapter"></accordion-report>
      <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
        <span slot="no-results" style="color:#4bb7aa;">
          <p style="font-size:1rem;display:inline-block;">您还未添加教材~</p>
        </span>
        <span slot="no-more"></span>
      </infinite-loading>
    </div>
  </view-box>
  <gnb-change-sub :visible.sync="visible" :subject="Student.subjectType" :selected="reportSubjectId" @on-click-back="_changeSubject"></gnb-change-sub>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader,ViewBox} from 'vux'
import { mapActions,mapGetters } from 'vuex'
import {gnbChangeSub,accordionReport} from 'components'

export default {
  components: {
    XHeader,ViewBox,accordionReport,gnbChangeSub,InfiniteLoading
  },
  filters: {
    subName(id){
      switch(id){
        case '2':return '数学';
        case '7':return '物理';
        case '8':return '化学';
      }
    }
  },
  route: {
    data:function(transition){
      /**
      * 标志为reset则重置，否则加载上次高度
      */
      if(this.reportReset){
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        })
      }else{
        this.$nextTick(() => {
          document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.reportScoll;
        })
      }
    }
  },
  methods: {
    ...mapActions(['getReport','changeReportChapter','setReportScoll','setReportSubject','clearReportDetail']),
    _changeSub(){
      this.visible = true;
    },
    _intoChapter(index){
      this.setReportScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop+100);
      this.clearReportDetail();
      this.$router.go(`../detail/${this.Params.studentId}/${index}`);
    },
    //切换科目
    _changeSubject(item){
      this.subjectName = item.value;
      this.visible = false;
      this.setReportSubject(item.id);      
      this.$broadcast('$InfiniteLoading:reset');
    },
    //打开节点
    _openChapter(index){
      this.setReportScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop+100);
      this.changeReportChapter(index);
    },
    _onInfinite(){
      this.getReport()
      .then(()=>{
        if(this.reportChapter.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
        this.$broadcast('$InfiniteLoading:complete');
      })
    }
  },
  data(){
    return {
      visible:false,
    }
  },
	computed:{
    ...mapGetters(['reportChapter','reportSubjectId','Student','reportScoll','reportReset','Params'])
	}
}
</script>
