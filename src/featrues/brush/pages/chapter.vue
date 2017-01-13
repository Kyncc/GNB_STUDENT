<template>
  <view-box v-ref:view-box class="reportStudent">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        <change-text-book :value.sync="textbookId" :user-textbook="userTextbook" :subject-id="brushSubjectId" ></change-text-book>
        <a slot="right" @click="_changeSub" class="changeSub">{{brushSubjectId | subName}}<span class="with_arrow"></span></a>
      </x-header>
    </div>

    <div style="padding-top:46px">
      <accordion :list="brushChapter" @on-click-chapter="_toDetail" @on-click-open="_openChapter"></accordion>
      <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">您还未添加教材</p>
        </span>
        <span slot="no-more"></span>
      </infinite-loading>
    </div>
  </view-box>
  <gnb-change-sub :visible.sync="visible" :selected="brushSubjectId" :subject="userSubjectList" @on-click-back="_changeSubject"></gnb-change-sub>
</template>

<script>
import {XHeader,Panel,ViewBox,Flexbox,FlexboxItem,XButton,Group,Cell} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {gnbChangeSub,accordion,changeTextBook} from 'components'

import {token,userSubjectList,userTextbook,path} from '../../../common/getters'
import {brushChapter,brushScoll,brushSubjectId} from '../getters'

import {getBrush,changeChapter,setScoll,setSubject,clearBrush} from '../actions/chapter'
import {brushListClear} from '../actions/list'


export default {
  components: {
    XHeader,ViewBox,Panel,Flexbox,FlexboxItem,XButton,Group,Cell,
    accordion,
    gnbChangeSub,changeTextBook,
    InfiniteLoading
  },
  vuex: {
    getters: {
      token,userSubjectList,userTextbook,path,
      brushChapter,brushScoll,brushSubjectId
    },
    actions: {
      getBrush,changeChapter,setScoll,setSubject,brushListClear,clearBrush
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
    _toDetail(index){
      this.brushListClear();
      this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop+100);
      this.$router.go(`list/${index}`);
    },
    _changeSub(){
      this.visible = true;
    },
    /** 切换科目*/
    _changeSubject(item){
      this.subjectName = item.value;
      this.visible = false;
      this.setSubject(item.id);       //更换科目
      this.$broadcast('$InfiniteLoading:reset');
    },
    _openChapter(index){
      this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop+100);
      this.changeChapter(index);
    },
    _onInfinite(){
      this.getBrush({
        token:this.token,
        textbook_id:this.textbookId
      },()=>{
        if(this.brushChapter.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
        this.$broadcast('$InfiniteLoading:complete');
      });
    }
  },
   data(){
    return {
      visible:false,
      textbookId:this.userTextbook['math'][0].id
    }
  },
  watch: {
    textbookId(){
      this.clearBrush();
      this.$broadcast('$InfiniteLoading:reset');
    },
    path(){
      if(this.path == '/index/brush/'){
         if(this.brushChapter.length == 0){this.$broadcast('$InfiniteLoading:reset')}
         else{
            document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.brushScoll; //更改高度
         }
      }
    }
  }
}
</script>
