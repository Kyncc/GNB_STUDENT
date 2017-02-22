<template>
  <view-box class="collect">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">收藏列表
        <a slot="right" @click="_changeSub" class="changeSub">{{collectSubjectId | subName}}<span class="with_arrow"></span></a>
      </x-header>
    </div>
    <!--空白间隔-->
    <div style="padding-top:46px;">
      <template v-if="collect">
        <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in collect">
          <div class="weui_panel_bd">
            <a class="weui_media_box weui_media_appmsg" @click="_intoDetail(item.exercises_id)">
              <div class="weui_media_bd">
                <p class="example_title">收藏例题</p>
                <p class="weui_media_desc">
                  {{{item.stem}}}
                </p>
              </div>
              <template v-if=" item.type == 1 ? true:false">
                <div class="weui_media_bd weui_media_box options">
                  <p class="weui_media_desc" v-for="value in item.opt">
                    {{ $key }} : {{{ value }}}
                  </p>
                </div>
              </template> 
            </a>
            <div class="weui_panel_ft">
              <flexbox :gutter="0" wrap="wrap">
                <flexbox-item :span="1/2">收藏时间：{{item.collect_time | ymd}}</flexbox-item>
                <flexbox-item :span="1/4"></flexbox-item>
                <flexbox-item :span="1/4" style="text-align:right"> 难度：{{item.degree}}</flexbox-item>
              </flexbox>
            </div>
          </div>
        </div>
      </template>
      
      <infinite-loading :on-infinite="_onInfinite" spinner="waveDots" style="height:60px">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">还未收藏题~</p>
        </span>
        <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">已加载全部</span>
      </infinite-loading>
    </div>
  </view-box>
  <gnb-change-sub :visible.sync="visible" :selected="collectSubjectId" :subject="User.subjectType" @on-click-back="_changeSubject"></gnb-change-sub>
</template>

<script>
import {XHeader,Panel,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions,mapGetters  } from 'vuex'
import {gnbChangeSub} from 'components'

export default {
  components: {
    XHeader,XButton,InfiniteLoading,
    Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem,gnbChangeSub
  },
  route: {
    data:function(transition){
      /**
      * 标志为reset则重置，否则加载上次高度
      */
      if(this.collectIsReset){
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        })
      }else{
        this.$nextTick(() => {
          document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.collectScroll;
        })
      }
    }
  },
  methods: {
    ...mapActions(['getCollect','setCollectScroll','setCollectSubject']),
     _changeSub(){
      this.visible = true;
    },
    /** 切换科目*/
    _changeSubject(item){
      // this.subjectName = item.value;
      this.visible = false;
      this.setCollectSubject(item.id);       //更换科目
      this.$broadcast('$InfiniteLoading:reset');
    },
    _intoDetail(id){
      this.setCollectScroll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop);
      this.$router.go(`/example/${this.collectSubjectId}/${id}`);
    },
    _onInfinite(){
      this.getCollect()
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
  data(){
    return {
      visible:false,
    }
  },
  computed:{
    ...mapGetters(['collect','collectIsReset','collectSubjectId','collectScroll','User'])
  }
}
</script>
