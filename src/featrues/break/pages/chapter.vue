<template >
  <view-box v-ref:view-box class="reportStudent">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        <change-text-book :value.sync="textbookId" :user-textbook="userTextbook" :subject-id="breakSubjectId"></change-text-book>
        <a slot="right" @click="_changeSub" class="changeSub">{{breakSubjectId | subName}}<span class="with_arrow"></span></a>
      </x-header>
    </div>

    <div style="padding-top:46px">
      <accordion :list="breakChapter" @on-click-chapter="_toDetail" @on-click-open="_openChapter"></accordion>
      <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">还未做题呢~</p>
        </span>
        <span slot="no-more"></span>
      </infinite-loading>
    </div>
  </view-box>
  <gnb-change-sub :visible.sync="visible" :selected="breakSubjectId" :subject="userSubjectList" @on-click-back="_changeSubject"></gnb-change-sub>
</template>

<script>
import {XHeader,Panel,ViewBox,Flexbox,FlexboxItem,XButton,Group,Cell} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {gnbChangeSub,accordion,changeTextBook} from 'components'
import {token,userSubjectList,userTextbook,path} from '../../../common/getters'
import {breakChapter,breakScoll,breakSubjectId} from '../getters'
import {getBreak,changeChapter,setScoll,setSubject,clearBreak} from '../actions/chapter'
import {breakListClear} from '../actions/list'

export default {
  components: {
    XHeader,ViewBox,Panel,Flexbox,FlexboxItem,XButton,Group,Cell,InfiniteLoading,
    gnbChangeSub,accordion,changeTextBook
  },
  vuex: {
    getters: {
      token,userSubjectList,userTextbook,path,
      breakChapter,breakScoll,breakSubjectId
    },
    actions: {
      getBreak,changeChapter,setScoll,setSubject,breakListClear,clearBreak
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
      this.breakListClear();
      this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop+100);
      this.$router.go(`list/${index}`);
    },
    _changeSub(){
      this.visible = true;
    },
    /** 切换科目*/
    _changeSubject(item){
      this.visible = false;
      this.subjectName = item.value;
      this.setSubject(item.id);       //更换科目
      this.$broadcast('$InfiniteLoading:reset');
    },
    _openChapter(index){
      this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop+100);
      this.changeChapter(index);
    },
    _onInfinite(){
      this.getBreak({
        token:this.token,
        textbook_id:this.textbookId
      },()=>{
        if(this.breakChapter.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
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
      this.clearBreak();
      this.$broadcast('$InfiniteLoading:reset');
    },
    path(){
      if(this.path == '/bag/break/'){
         document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.breakScoll; //更改高度
      }
    }
  }
}
</script>
