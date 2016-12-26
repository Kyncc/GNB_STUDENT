<template>
  <view-box v-ref:view-box class="passList">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}" >弃题列表</x-header>
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
import {token,id} from '../../../common/getters'
import {passSubjectId,passListScoll,passListCurrentPage,passListTotalPage,passList} from '../getters'
import {setScoll,getPassList,passListClear } from '../actions/list'
import '../index.less'

export default {
    components: {
        XHeader,XButton,InfiniteLoading,
        Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem
    },
    methods: {
        _intoDetail(id){
            this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop+100);
            this.$router.go(`../example/${this.passSubjectId}/${id}`);
        },
        _isFirst(){
            /*判断当前页面是否大于总页数 若大于则不在请求数据*/
            if(Number(this.passListTotalPage) < Number(this.passListCurrentPage)){
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
            this.getPassList({
                currentPage:this.passListCurrentPage,
                status:2,
                token:this.token,
                chapter_id:this.id,
                subject_id:this.passSubjectId,
            },()=>{
                this.$broadcast('$InfiniteLoading:loaded');
                if(this.passListCurrentPage > this.passListTotaslPage){
                    this.$broadcast('$InfiniteLoading:complete');
                    return;
                }
            })
        },
    },
    vuex: {
        getters: {
            token,id,
            passList,passSubjectId,passListScoll,passListCurrentPage,passListTotalPage
        },
        actions: {
          setScoll,getPassList,passListClear
        }
    },
    watch:{
      id(){
        if(id){return}
        else{
          alert(1);
        }
      }
    },
    ready(){
        this.$nextTick(()=>{
            document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.passListScoll;
        });
    }
}
</script>
