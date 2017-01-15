<template>
  <view-box v-ref:view-box class="breakList">
  <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
    <x-header :left-options="{showBack: true}" >斩题列表</x-header>
    <header v-if="breakList" class="sectionHeader">
      <p class="ellipsis">{{breakList.chapterName}}</p>
      <font class="ellipsis">共<b>{{breakList.count}}</b>个题型</font>
     </header>
  </div>
  <!--空白间隔-->
  <div style="padding-top:80px;">
    <template v-if="breakList">
      <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in breakList.list">
        <div class="weui_panel_hd">
          {{{item.chapter_name}}}
        </div>
        <div class="weui_panel_bd">
          <a class="weui_media_box weui_media_appmsg" @click="_intoDetail(item.excercise_id)">
            <div class="weui_media_bd">
              <p class="example_title">参考例题<b>难度：{{item.degree}}</b></p>
              <p class="weui_media_desc">
                {{{item.stem}}}
              </p>
            </div>
          </a>
        </div>
        <div class="abandon">
          <span @click="_abandon(item.loose_win_excercise_id,$index)">撤回</span>
        </div>
      </div>
    </template>
    <infinite-loading :on-infinite="_onInfinite" spinner="waveDots" style="height:60px">
      <span slot="no-results" style="color:#4bb7aa;">
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
        <p style="font-size:1rem;display:inline-block;">您没有错题~</p>
      </span>
      <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">已加载全部</span>
    </infinite-loading>
  </div>
  </view-box>

</template>

<script>
import {XHeader,Panel,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {token,chapterId,path} from '../../../common/getters'
import {breakSubjectId,breakListScoll,breakListOffset,breakList,breakListIsReset} from '../getters'
import {setScoll,getBreakList,breakListClear,breakActionBack } from '../actions/list'
import {breakExampleClear } from '../actions/example'
import './index.less'

export default {
  components: {
    XHeader,XButton,InfiniteLoading,
    Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem
  },
  methods: {
    _intoDetail(id){
      this.breakExampleClear();
      this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop);
      this.$router.go(`../example/${this.breakSubjectId}/${id}`);
    },
    _abandon(id,index){
      let parm = {
        "loose_win_excercise_id":id,
        "token":this.token,
        "subject_id":this.breakSubjectId
      }
      this.breakActionBack(parm,index);
    },
    _onInfinite(){
      this.getBreakList({
        status:2,
        token:this.token,
        chapter_id:this.chapterId,
        subject_id:this.breakSubjectId,
        offset:this.breakListOffset
      },(res)=>{
        this.$broadcast('$InfiniteLoading:loaded');
        let length = Number(res.data.data.list.length);
        if(length  < 5){
          this.$broadcast('$InfiniteLoading:complete');
          return;
        }
      })
    },
  },
  vuex: {
    getters: {
      token,chapterId,path,
      breakList,breakSubjectId,breakListScoll,breakListOffset,breakListIsReset
    },
    actions: {
      setScoll,getBreakList,breakListClear,breakExampleClear,breakActionBack
    }
  },
  watch:{
    path(){
      if(this.path.indexOf('/bag/break/list/') >=0 ){
        if(this.breakListIsReset) { this.$broadcast('$InfiniteLoading:reset');}
        else{document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.breakListScoll;}
      }
    }
  }
}
</script>
