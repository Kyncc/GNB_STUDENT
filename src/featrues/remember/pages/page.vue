<template >
  <view-box v-ref:view-box class="workbookStuPager workbookStuSelect">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">章节选择
        <a slot="right" @click="_changeType()" class="changeSub">
          按页码<span class="with_arrow"></span>
        </a>
      </x-header>
    </div>

    <div style="padding-top:46px;">
      <accordion-page :list="Page" @on-click-open="_openChapter" @on-click-chapter="_intoChapter"></accordion-page>
      <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">数据发生一点问题~</p>
        </span>
        <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
      </infinite-loading>

      <Popup :visible.sync="visible" popup-transition="popup-fade" class="gnb-changeSub">
        <p @click="_intoPage()">按章节</p>
        <p class="active">按页码</p>
      </Popup>

    </div>
  </view-box>
</template>

<script>
import { XHeader,Panel,ViewBox,Group,Cell} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions,mapGetters} from 'vuex'
import {accordionPage} from 'components'
import { Popup } from 'mint-ui'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,InfiniteLoading,Popup,accordionPage
  },
  data(){
    return{
      visible:false
    }
  },
  computed:{
    ...mapGetters(['workbookStuPage','Params']),
    Page(){
      return this.workbookStuPage.list;
    }
	},
  route: {
    data:function(transition){
      if(this.workbookStuPage.isReset){
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        })
      }else{
        this.$nextTick(()=>{
          document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.workbookStuPage.scroll;
        });
      }
    }
  },
  methods:{
    ...mapActions(['getWorkbookStuPage','setWorkbookStuPageScroll','workbookStuExerciseClear']),
    _intoPage(){
       this.visible = false;
       this.$router.replace(`../chapter/${this.Params.workbookId}`);
     },
    _changeType(){
      this.visible = true;
    },
    _openChapter(){

    },
    _intoChapter(id){
      this.workbookStuExerciseClear();//进去前清空数据
      this.setWorkbookStuPageScroll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop);
      this.$router.go(`../exercise/${id}`);
    },
    _onInfinite(){
      this.getWorkbookStuPage()
      .then(()=>{
        this.$broadcast('$InfiniteLoading:loaded');
        this.$broadcast('$InfiniteLoading:complete');
      });
    }
  }
}
</script>
