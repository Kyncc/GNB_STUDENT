<template >
  <view-box v-ref:view-box class="reportStudent">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        选择章节
        <a slot="right" @click="_changeSub" class="changeSub">{{passSubjectId | subName}}<span class="with_arrow"></span></a>
      </x-header>
    </div>

    <div style="padding-top:46px">
      <accordion :list="passChapter" :link="_toDetail()" @on-click-back="_openChapter"></accordion>
      <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">还未做题呢~</p>
        </span>
        <span slot="no-more"></span>
      </infinite-loading>
    </div>
  </view-box>
  <gnb-change-sub :visible.sync="visible" :selected="passSubjectId" :subject="userSubjectList" @on-click-back="_changeSubject"></gnb-change-sub>
</template>

<script>
import {XHeader,Panel,ViewBox,Flexbox,FlexboxItem,XButton,Group,Cell} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import gnbChangeSub from '../../../components/changesub/index'
import accordion from '../../../components/accordion'
import {token,userSubjectList} from '../../../common/getters'
import {passChapter,passScoll,passSubjectId} from '../getters'
import {getPass,changeChapter,setScoll,setSubject} from '../actions/chapter'


export default {
  components: {
    XHeader,ViewBox,Panel,Flexbox,FlexboxItem,XButton,Group,Cell,accordion,gnbChangeSub,InfiniteLoading
  },
  vuex: {
    getters: {
      token,userSubjectList,
      passChapter,passScoll,passSubjectId
    },
    actions: {
      getPass,changeChapter,setScoll,setSubject
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
  _toDetail(){

    return `list/`;
  },
  _changeSub(){
    this.visible = true;
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
    if(this.passChapter.length != 0){
      this.$broadcast('$InfiniteLoading:loaded');
      this.$broadcast('$InfiniteLoading:complete');
      return;
    }
    this.getPass({
      token:this.token,
      subject_id:this.passSubjectId
    },()=>{
      if(this.passChapter.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
      this.$broadcast('$InfiniteLoading:complete');
    });
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
