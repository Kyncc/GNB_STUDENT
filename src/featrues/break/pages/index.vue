<template >
  <view-box v-ref:view-box class="reportStudent">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
         <change-text-book :value.sync="textbookId" :user-textbook="User.textbook" :subject-id="breakSubjectId"></change-text-book>
         <a slot="right" @click="_changeSub" class="changeSub">{{breakSubjectId | subName}}<span class="with_arrow"></span></a>
      </x-header>
    </div>

    <div style="padding-top:46px">
      <accordion :list="breakChapter" @on-click-chapter="_toDetail" @on-click-open="_openChapter"></accordion>
      <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">您还未添加教材~</p>
        </span>
        <span slot="no-more"></span>
      </infinite-loading>
    </div>
  </view-box>
  <gnb-change-sub :visible.sync="visible" :selected="breakSubjectId" :subject="User.subjectType" @on-click-back="_changeSubject"></gnb-change-sub>
</template>

<script>
import {XHeader,Panel,ViewBox,Flexbox,FlexboxItem,XButton,Group,Cell} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {gnbChangeSub,accordion,changeTextBook} from 'components'
import { mapActions,mapGetters  } from 'vuex'
export default {
  components: {
    XHeader,ViewBox,Panel,Flexbox,FlexboxItem,XButton,Group,Cell,InfiniteLoading,
    gnbChangeSub,accordion,changeTextBook
  },
  route: {
    data:function(transition){
      /**
      * 标志为reset则重置，否则加载上次高度
      */
      if(this.breakIsReset){
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        })
      }else{
        this.$nextTick(() => {
          document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.reportScroll;
        })
      }
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
     ...mapActions(['getBreak','breakChangeChapter','setBreakScroll','setBreakSubject','clearBreak','breakListClear']),
     _toDetail(chapterId){
      this.setBreakScroll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop+100);
      this.breakListClear();
      this.$router.go(`list/${chapterId}`);
    },
    _changeSub(){
      this.visible = true;
    },
    /** 切换科目*/
    _changeSubject(item){
      this.subjectName = item.value;
      this.visible = false;
      this.setBreakSubject(item.id);       //更换科目
      this.$broadcast('$InfiniteLoading:reset');
    },
    _openChapter(index){
      this.setBreakScroll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop+100);
      this.breakChangeChapter(index);
    },
    _onInfinite(){
      this.getBreak({
        "textbook_id":this.textbookId
      })
      .then(()=>{
        if(this.breakChapter.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
        this.$broadcast('$InfiniteLoading:complete');
      })
    }
  },
  created () {
    this.textbookId = this.User.textbook['math'][0].id;
  },
  data(){
    return {
      visible:false,
      textbookId:'',
    }
  },
	computed:{
    ...mapGetters(['breakScroll','breakChapter','User','breakSubjectId','breakIsReset'])
	},
  watch: {
    textbookId(){
      this.clearBreak();
      this.$broadcast('$InfiniteLoading:reset');
    }
  }
}
</script>
