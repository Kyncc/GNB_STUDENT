<template>
  <view-box v-ref:view-box class="brushList">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">刷题列表
      </x-header>
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
        <div class="weui_panel_bd ">
          <a class="weui_media_box weui_media_appmsg" @click="_intoDetail(item.exercises_id)">
            <div class="weui_media_bd">
              <p class="example_title">参考例题<b>难度：{{item.degree}}</b></p>
              <p class="weui_media_desc">
                {{{item.stem}}}
              </p>
            </div>
          </a>
        </div>
        <div class="abandon">
          <span @click="_abandon('back',item.exercises_id,$index)">斩题</span>
          <span @click="_abandon('drop',item.exercises_id,$index)">弃题</span>
        </div>
      </div>
      </template>
      <infinite-loading :on-infinite="_onInfinite" spinner="waveDots" style="height:60px">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">还未刷题~</p>
        </span>
        <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">已加载全部</span>
      </infinite-loading>
    </div>
  </view-box>

</template>

<script>
import {XHeader,Panel,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions,mapGetters  } from 'vuex'

export default {
  components: {
    XHeader,XButton,InfiniteLoading,
    Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem
  },
  route: {
    data:function(transition){
      /**
      * 标志为reset则重置，否则加载上次高度
      */
      if(this.brushListIsReset){
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        })
      }else{
        this.$nextTick(() => {
          document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.brushListScroll;
        })
      }
    }
  },
  methods: {
    ...mapActions(['getBrushList','setBrushListScroll','brushAction']),
    _intoDetail(id){
      this.setBrushListScroll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop);
      this.$router.go(`/example/${this.brushSubjectId}/${id}`);
    },
    _abandon(type,id,index){
        let parm = {
          'id':id,
          'status':( type == 'back' ? '1' :'2'),
          'index':index
        }
        this.brushAction(parm)
    },
    _onInfinite(){
      this.getBrushList()
      .then((res)=>{
        this.$broadcast('$InfiniteLoading:loaded');
        let length = Number(res.data.data.list.length);
        if(length  < 5){
            this.$broadcast('$InfiniteLoading:complete');
            return;
        }
      })
    }
  },
  computed:{
    ...mapGetters(['brushList','brushListIsReset','brushSubjectId','brushListScroll'])
  }
}
</script>
