<template>
  <view-box v-ref:view-box class="collect">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        刷题型
      </x-header>
    </div>
    <div style="height:100%">
      <!--空白间隔-->
      <div style="height:46px;"></div>
      <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in brushList">
        <div class="weui_panel_hd">
          {{{item.knowledge}}}
        </div>
        <div class="weui_panel_bd">
          <a class="weui_media_box weui_media_appmsg" @click="_intoDetail(item.id)">
            <div class="weui_media_bd">
              <p class="weui_media_desc">
                {{{item.content}}}
              </p>
            </div>
          </a>
          <div class="weui_panel_ft">
            <flexbox :gutter="0" wrap="wrap">
              <flexbox-item :span="1/2">收藏时间：{{item.collectTime | ymd}}</flexbox-item>
              <flexbox-item :span="1/4"></flexbox-item>
              <flexbox-item :span="1/4" style="text-align:right"> 难度：{{item.difficult}}</flexbox-item>
            </flexbox>
          </div>
        </div>
      </div>

      <infinite-loading :on-infinite="_onInfinite" spinner="waveDots" style="height:60px">
        <span slot="no-results" style="color:#4bb7aa;">
            <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
            <p style="font-size:1rem;display:inline-block;">您没有错题~</p>
        </span>
        <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已加载全部</span>
      </infinite-loading>

    </div>
  </view-box>
</template>
<script>
import {XHeader,Panel,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import store from '../../store'
import { token } from '../../common/getters'
import { brushList,brushListTotalPage,brushListCurrentPage,brushSubjectId,brushListScoll } from '../getters'
import { brushListClear,setScoll,getBushList,gushListAction } from '../actions/list'

export default {
    components: {
        XHeader,XButton,InfiniteLoading,
        Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem
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
            this.$router.go(`/brush/example/${id}`);
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
                currentPage:this.CollectExampleCurrentPage,
                token:this.token,
                options:{
                    subject_id:this.brushSubjectId
                }
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
            token,brushList,brushListTotalPage,brushListCurrentPage,brushSubjectId,brushListScoll
        },
        actions: {
             brushList,brushListTotalPage,brushListCurrentPage,brushSubjectId,brushListScoll
        }
    },
    store
}
</script>
