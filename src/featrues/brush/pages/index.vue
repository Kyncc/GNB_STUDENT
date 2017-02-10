<template >
  <view-box v-ref:view-box class="reportStudent">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
         <change-text-book :value.sync="textbookId" :user-textbook="User.textbook" :subject-id="brushSubjectId"></change-text-book>
         <a slot="right" @click="_changeSub" class="changeSub">{{brushSubjectId | subName}}<span class="with_arrow"></span></a>
      </x-header>
    </div>

    <div style="padding-top:46px">
      <accordion :list="brushChapter" @on-click-chapter="_toDetail" @on-click-open="_openChapter"></accordion>
      <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;" @click="_intoTextbook">点我先添加教材吧~</p>
        </span>
        <span slot="no-more"></span>
      </infinite-loading>
    </div>
  </view-box>
  <gnb-change-sub :visible.sync="visible" :selected="brushSubjectId" :subject="User.subjectType" @on-click-back="_changeSubject"></gnb-change-sub>
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
      if(this.brushIsReset){
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        })
      }else{
        this.$nextTick(() => {
          document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.brushScroll;
        })
      }
    }
  },
  methods: {
     ...mapActions(['getBrush','brushChangeChapter','setBrushScroll','setBrushSubject','clearBrush','brushListClear']),
     _intoTextbook(){
       this.$router.go(`/main/bag/textbook/add`);
     },
     _toDetail(chapterId){
      this.setBrushScroll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop+100);
      this.brushListClear();
      this.$router.go(`list/${chapterId}`);
    },
    _changeSub(){
      this.visible = true;
    },
    /** 切换科目*/
    _changeSubject(item){
      this.subjectName = item.value;
      this.visible = false;
      this.setBrushSubject(item.id);       //更换科目
      this.$broadcast('$InfiniteLoading:reset');
    },
    _openChapter(index){
      this.setBrushScroll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop+100);
      this.brushChangeChapter(index);
    },
    _onInfinite(){
      this.getBrush({
        "textbook_id":this.textbookId
      })
      .then(()=>{
        if(this.brushChapter.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
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
    ...mapGetters(['brushScroll','brushChapter','User','brushSubjectId','brushIsReset'])
	},
  watch: {
    textbookId(){
      this.clearBrush();
      this.$broadcast('$InfiniteLoading:reset');
    }
  }
}
</script>
