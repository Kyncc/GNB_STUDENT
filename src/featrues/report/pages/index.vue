<template >
  <view-box v-ref:view-box class="reportIndex">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
          知识图谱
          <a slot="right" @click="_changeSub()" class="changeSub">{{reportSubjectId | subName}}<span class="with_arrow"></span></a>
      </x-header>
    </div>

    <div style="padding-top:46px">
      <accordion-report :list="reportChapter" @on-click-open="_openChapter" @on-click-chapter="_intoChapter"></accordion-report>
      <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
        <span slot="no-results" style="color:#4bb7aa;">
          <p style="font-size:1rem;display:inline-block;">请先添加教材吧~</p>
        </span>
        <span slot="no-more"></span>
      </infinite-loading>
    </div>
  </view-box>
  <gnb-change-sub :visible.sync="visible" :subject="userSubjectList" :selected="reportSubjectId" @on-click-back="_changeSubject"></gnb-change-sub>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader,ViewBox} from 'vux'
import {token,userSubjectList } from '../../../common/getters'
import {reportChapter,reportScoll,reportSubjectId} from '../getters'
import {getReport,changeChapter,setScoll,clearReport,setSubject,clearDetail} from '../actions'
import {gnbChangeSub,accordionReport} from 'components'

export default {
  components: {
    XHeader,ViewBox,accordionReport,gnbChangeSub,InfiniteLoading
  },
  vuex: {
    getters: {
      token,userSubjectList,
      reportSubjectId,reportChapter,reportScoll
    },
    actions: {
      changeChapter,getReport,setScoll,setSubject,clearDetail
    }
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
  methods: {
    _changeSub(){
      this.visible = true;
    },
    _intoChapter(index){
      this.clearDetail();
      this.$router.go(`detail/${index}`);
    },
    /** 切换科目*/
    _changeSubject(item){
      this.subjectName = item.value;
      this.visible = false;
      this.setSubject(item.id);       //更换科目
      this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
      });
    },
    _openChapter(index){
      this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop+100);
      this.changeChapter(index);
    },
    _onInfinite(){
      if(this.reportChapter.length != 0){
        this.$broadcast('$InfiniteLoading:loaded');
        this.$broadcast('$InfiniteLoading:complete');
        return;
      }
      this.getReport({
        token:this.token,
        subject_id:this.reportSubjectId
      },()=>{
        if(this.reportChapter.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
        this.$broadcast('$InfiniteLoading:complete');
      });
    },
    path(){
      
      
    }
  },
  data(){
    return {
      visible:false,
    }
  },
  ready(){
    this.$nextTick(()=>{
        document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.reportScoll;
    });
  }
}
</script>
