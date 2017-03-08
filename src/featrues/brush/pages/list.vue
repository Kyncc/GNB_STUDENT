<template>
  <view-box class="brushList">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">刷题列表</x-header>
      <header v-if="brushList" class="sectionHeader">
        <p class="ellipsis">{{brushList.chapterName}}</p>
        <font class="ellipsis"><b>{{brushList.count}}/{{brushList.total}}</b></font>
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
         <a v-if=" item.opt_jo.hasOwnProperty('A') " @click="_intoDetail(item.exercises_id)">
          <div class="weui_media_bd weui_media_box options">
            <p class="weui_media_desc" v-for="value in item.opt_jo">
              {{ $key }} : {{{ value }}}
            </p>
          </div>
        </a> 
        <div class="abandon">
          <span @click="_abandon('2',item.exercises_id,$index)">弃题</span>
          <span @click="_abandon('3',item.exercises_id,$index)">刷题</span>
          <span @click="_abandon('1',item.exercises_id,$index)">斩题</span>
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
  <confirm :show.sync="confirmShow" confirm-text="确定" cancel-text="取消" :title="confrimTitle" @on-confirm="_onAction">
    <p style="padding:.35rem 0 ;font-size:16px;" @click="_noticeAgain" :class="notice ? 'notAgain':''">
      <b><i class="icon iconfont exampleIcon icon-correct"></i></b>  选我以后不再提示
    </p>
  </confirm>
</template>

<script>
import {XHeader,Panel,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem,Confirm} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions,mapGetters} from 'vuex'

export default {
  components: {
    XHeader,XButton,InfiniteLoading,Confirm,
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
    _abandon(status,id,index){
        this.selectItem.id = id;
        this.selectItem.status = status;
        this.selectItem.index = index;

         /**不同动作的判断
        *1.为斩题目，若localStorage 内 breakFirst为true则不显示对话框
        *2.为弃题 3.为刷题
        */
        if(this.selectItem.status == '1'){
          if(localStorage.getItem("breakFirst")){
            this.brushAction(this.selectItem)
            return
          }else{
            this.notice = this.notAgain.break
          }
        }
        else if(this.selectItem.status == '2'){
          if(localStorage.getItem("passFirst")){
            this.brushAction(this.selectItem)
            return
          }else{
            this.notice = this.notAgain.pass
          }
        }else{
          if(localStorage.getItem("brushFirst")){
            this.brushAction(this.selectItem)
            return
          }else{
            this.notice = this.notAgain.brush
          }
        }
        this.confirmShow = true
    },
    //动作的提示
    _noticeAgain(){
      if(this.selectItem.status == '1'){
        this.notice = !this.notAgain.break
        this.notAgain.break = !this.notAgain.break
      }else if(this.selectItem.status == '2'){
        this.notice = !this.notAgain.pass
        this.notAgain.pass = !this.notAgain.pass
      }else{
        this.notice = !this.notAgain.brush
        this.notAgain.brush = !this.notAgain.brush
      }
    },
    //确认不提示
    _onAction(){
      if(this.selectItem.status == '1' && this.notAgain.break){
        localStorage.setItem("breakFirst","true")
      }else if(this.selectItem.status == '2'  && this.notAgain.pass){
        localStorage.setItem("passFirst","true")
      }else if(this.selectItem.status == '3'  && this.notAgain.brush){
        localStorage.setItem("brushFirst","true")
      }
      this.brushAction(this.selectItem)
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
    ...mapGetters(['brushList','brushListIsReset','brushSubjectId','brushListScroll']),
    confrimTitle(){
      if(this.selectItem.status == '2'){
        return '真的很简单，确定放进弃题本？'
      }else if(this.selectItem.status == '3'){
        return '真的需要练习，确定放进刷题本？'
      }else{
        return '真的很难，确定放进斩题本？'
      }
    }
  },
   data(){
    return {
      confirmShow:false,
      selectItem:{
        'id':'',
        'status': '',
        'index':''
      },
      notAgain:{
        'brush':false,
        'break':false,
        'pass':false
      },
      notice:false
    }
  }
}
</script>
<style scoped>
.notAgain{
  color:#4bb7aa;
}
</style>