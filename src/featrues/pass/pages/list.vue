<template>
  <view-box v-ref:view-box class="passList">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">弃题列表</x-header>
      <header v-if="passList" class="sectionHeader">
        <p class="ellipsis">{{passList.chapterName}}</p>
        <font class="ellipsis">共<b>{{passList.count}}</b>个题型</font>
       </header>
    </div>
    <!--空白间隔-->
    <div style="padding-top:80px;">
      <template v-if="passList">
        <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in passList.list">
            <div class="weui_panel_hd">
                {{{item.chapter_name}}}
            </div>
            <div class="weui_panel_bd">
                <a class="weui_media_box weui_media_appmsg" @click="_intoDetail(item.exercises_id)">
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
import {token,chapterId,path} from '../../../common/getters'
import {passSubjectId,passListScoll,passListOffset,passList,passListIsReset} from '../getters'
import {setScoll,getPassList,passListClear } from '../actions/list'
import {passExampleClear } from '../actions/example'
import './index.less'

export default {
    components: {
        XHeader,XButton,InfiniteLoading,
        Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem
    },
    methods: {
        _intoDetail(id){
            this.passExampleClear();
            this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop);
            this.$router.go(`../example/${this.passSubjectId}/${id}`);
        },
         _onInfinite(){
            this.getPassList({
                status:2,
                token:this.token,
                chapter_id:this.chapterId,
                subject_id:this.passSubjectId,
                offset:this.passListOffset
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
            token,chapterId,path,
            passList,passSubjectId,passListScoll,passListOffset,passListIsReset
        },
        actions: {
            setScoll,getPassList,passListClear,passExampleClear
        }
    },
    watch:{
        path(){
            if(this.path.indexOf('/bag/pass/list/') >=0 ){
                if(this.passListIsReset) { this.$broadcast('$InfiniteLoading:reset');}
                else{document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.passListScoll;}
            }
        }
    }
}
</script>
