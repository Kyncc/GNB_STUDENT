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
import {breakSubjectId,breakListScoll,breakListOffset,breakList} from '../getters'
import {setScoll,getBreakList,breakListClear } from '../actions/list'
import '../index.less'

export default {
    components: {
        XHeader,XButton,InfiniteLoading,
        Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem
    },
    methods: {
        _intoDetail(id){
            this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop+100);
            this.$router.go(`../example/${this.breakSubjectId}/${id}`);
        },
        _isFirst(){
             //如果剩余题目数量等于数量 则表示加载完毕
            if(this.breakList.list.length != 0 && (this.breakList.list.length == this.breakList.count)){
                this.$broadcast('$InfiniteLoading:loaded');
                this.$broadcast('$InfiniteLoading:complete');
                return true;
            }
            return false;
        },
         _onInfinite(){
            if(this._isFirst()){return}
            this.getBreakList({
                // status:2,
                token:this.token,
                chapter_id:this.chapterId,
                subject_id:this.breakSubjectId,
                offset:this.breakListOffset
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
            breakList,breakSubjectId,breakListScoll,breakListOffset
        },
        actions: {
            setScoll,getBreakList,breakListClear
        }
    },
    watch:{
        chapterId(){
            if(this.chapterId == undefined){
                return;
            }
            this._onInfinite();
            this.$nextTick(()=>{
                document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.breakListScoll;
            });
        }
    }
}
</script>
