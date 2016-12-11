<template>

  <view-box v-ref:view-box class="brushList">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">{{_typeName()}}</x-header>
      <header v-if="brushList" class="sectionHeader">
          <p class="ellipsis">{{brushList.chapterName}}</p>
          <font class="ellipsis">共<b>{{brushList.count}}</b>个题型</font>
       </header>
    </div>

      <!--空白间隔-->
      <div style="padding-top:80px;">
        <template v-if="brushList">
            <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in brushList.list">
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
import store from '../../store'
import { token } from '../../common/getters'
import { brushType,brushSubjectId,brushTypeScoll,chapterId,brushTypeTotalPage,brushTypeCurrentPage} from '../getters'
import { setScoll,getBushTypeList } from '../actions/typeList'
import '../index.less'


export default {
    components: {
        XHeader,XButton,InfiniteLoading,
        Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem
    },
    methods: {
        _intoDetail(id){
            this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop+100);
            this.$router.go(`/brush/example/${id}`);
        },
        _onInfinite(){
            this.getBushTypeList({
                currentPage:this.brushTypeCurrentPage,
                status:this.brushType.type,
                token:this.token,
                chapter_id:this.chapterId,
                subject_id:this.brushSubjectId
            },(res)=>{
                this.$broadcast('$InfiniteLoading:loaded');
            })
       },
       _typeName(){
           if(this.brushType.type == '1'){
               return '斩题列表'
           }
           else if(this.brushType.type == '2'){
               return '放弃列表'
           }
       }
    },
    vuex: {
        getters: {
            token,brushType,brushSubjectId,brushTypeScoll,chapterId,brushTypeTotalPage,brushTypeCurrentPage
        },
        actions: {
            setScoll,getBushTypeList
        }
    },
    store,
    ready(){
        this.$nextTick(()=>{
            document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.brushTypeScoll;
        });
    }
}
</script>
