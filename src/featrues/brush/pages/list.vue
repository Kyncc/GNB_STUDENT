<template>
  <view-box v-ref:view-box class="brushList">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}" >刷题列表</x-header>
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
             <div class="abandon">
                <span >撤回</span>
                <span >放弃</span>
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
import {token,chapterId} from '../../../common/getters'
import {brushSubjectId,brushListScoll,brushListOffset,brushList} from '../getters'
import {setScoll,getBrushList,brushListClear } from '../actions/list'


export default {
    components: {
        XHeader,XButton,InfiniteLoading,
        Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem
    },
    methods: {
        _intoDetail(id){
            this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop+100);
            this.$router.go(`../example/${this.brushSubjectId}/${id}`);
        },
        _isFirst(){
             //如果剩余题目数量等于数量 则表示加载完毕
            if(this.brushList.list.length != 0 && (this.brushList.list.length == this.brushList.count)){
                this.$broadcast('$InfiniteLoading:loaded');
                this.$broadcast('$InfiniteLoading:complete');
                return true;
            }
            return false;
        },
         _onInfinite(){
            if(this._isFirst()){return}
            this.getBrushList({
                // status:2,
                token:this.token,
                chapter_id:this.chapterId,
                subject_id:this.brushSubjectId,
                offset:this.brushListOffset
            },(res)=>{
                this.$broadcast('$InfiniteLoading:loaded');
                let length = Number(res.data.data.detail.length);
                if(length  < 5){
                    this.$broadcast('$InfiniteLoading:complete');
                    return;
                }
            })
        },
        
    },
    vuex: {
        getters: {
            token,chapterId,
            brushList,brushSubjectId,brushListScoll,brushListOffset
        },
        actions: {
            setScoll,getBrushList,brushListClear
        }
    },
    watch:{
        chapterId(){
            if(this.chapterId == undefined){
                return;
            }
            this._onInfinite();
            this.$nextTick(()=>{
                document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.brushListScoll;
            });
        }
    }
}
</script>
