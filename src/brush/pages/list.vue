<template>
  <view-box v-ref:view-box class="brushList">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">记录题型</x-header>
      <header v-if="brushList" class="sectionHeader"><p class="ellipsis">{{brushList.chapterName}}</p><font class="ellipsis">共<b>{{brushList.count}}</b>题目</font></header>
    </div>
    <div style="height:100%" >
      <!--空白间隔-->
      <div style="height:80px;"></div>
      <template v-if="brushList">
        <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in brushList.list">
            <div class="weui_panel_hd">
                {{{item.chapter_name}}}
            </div>
            <div class="weui_panel_bd">
                <a class="weui_media_box weui_media_appmsg" @click="_intoDetail(item.excercise_id)">
                    <div class="weui_media_bd">
                        <p class="exampl_title">参考例题<b>难度：{{item.master_degree}}</b></p>
                        <p class="weui_media_desc">
                            {{{item.stem}}}
                        </p>
                    </div>
                </a>
            </div>
             <div class="abandon">
                <span  @click="_brushAction(1,item)">斩题</span>
                <span  @click="_brushAction(2,item)">放弃</span>
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
import { brushList,brushListTotalPage,brushListCurrentPage,brushSubjectId,brushListScoll,brushListId} from '../getters'
import { brushListClear,setScoll,getBushList,bushListAction } from '../actions/list'
import '../index.less'


export default {
    components: {
        XHeader,XButton,InfiniteLoading,
        Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem
    },
    created(){
        this.brushListClear();
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
        _intoDetail(id){
            // alert(document.documentElement.scrollTop);
            this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop+100);
            this.$router.go(`/brush/example/${id}`);
        },
        _brushAction(type,item){
             this.bushListAction({
                chapter_id:item.chapter_id,
                excercise_id:item.excercise_id,
                token:this.token,
                subject_id:item.subject_id,
                status:type
            },()=>{
                this.$nextTick(() => {
				    this.$broadcast('$InfiniteLoading:reset');
			    });
            })
        },
        _isFirst(){
            /*判断当前页面是否大于总页数 若大于则不在请求数据*/
            if(Number(this.brushListTotalPage) < Number(this.brushListCurrentPage)){
                 this.$broadcast('$InfiniteLoading:loaded');
                 this.$broadcast('$InfiniteLoading:complete');
                 return true;
            }
            return false;
        },
        _onInfinite(){
            if(this._isFirst()){
                return;
            }
            this.getBushList({
                currentPage:this.brushListCurrentPage,
                token:this.token,
                chapter_id:this.brushListId,
                subject_id:this.brushSubjectId
            },()=>{
                this.$broadcast('$InfiniteLoading:loaded');
                if(this.brushListCurrentPage  > this.brushListTotalPage){
                    this.$broadcast('$InfiniteLoading:complete');
                    return;
                }
            })
       }
    },
    vuex: {
        getters: {
            token,brushList,brushListTotalPage,brushListCurrentPage,brushSubjectId,brushListScoll,brushListId
        },
        actions: {
            brushListClear,setScoll,getBushList,bushListAction
        }
    },
    store,
    ready(){
        this.$nextTick(()=>{
            document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.brushListScoll;
        });
    }
}
</script>
