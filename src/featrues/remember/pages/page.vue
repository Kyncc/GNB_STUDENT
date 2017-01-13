<template >
    <view-box v-ref:view-box class="rememberPager rememberSelect">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">章节选择
                <a slot="right" @click="_changeType()" class="changeSub">
                    按页码<span class="with_arrow"></span>
                </a>
            </x-header>
        </div>

        <div style="padding-top:46px;">
            <accordion-page :list="rememberPager" @on-click-open="_openChapter" @on-click-chapter="_intoChapter"></accordion-page>
            <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
                <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">服务异常~</p>
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
import { Popup } from 'mint-ui'
import { token } from '../../../common/getters'
import {rememberPager,wookbookId,rememberPagerScroll} from '../getters'
import {getWorkbookPage,delChapter,setScoll} from '../actions/byPage'
import {rememberExerciseClear} from '../actions/exercise'
import {accordionPage} from 'components'
import './index.less'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,InfiniteLoading,Popup,accordionPage
  },
  vuex: {
    getters:{
        token,rememberPager,wookbookId,rememberPagerScroll
    },
    actions:{
        getWorkbookPage,delChapter,rememberExerciseClear,setScoll
    }
  },
    data(){
        return{
            visible:false
        }
    },
  methods:{
        _intoPage(){
           this.$router.replace(`../${this.wookbookId}`);
       },
        _changeType(){
            this.visible = true;
        },
        _openChapter(){

        },
        _intoChapter(id){
            this.rememberExerciseClear();//进去前清空数据
            this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop); 
            this.$router.go(`../exercise/${id}`);
        },
      _onInfinite(){
        if(this._isFirst()){
            return;
        }
        this.getWorkbookPage({
            token:this.token,   
            workbookId:this.wookbookId
        },()=>{
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
        });
      },
      /** 是否第一次*/
     _isFirst(){
        if(this.rememberPager.length != 0 && this.rememberPager.workBookName){
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
            return true;
        }
        return false;
     } 

  },
  ready(){
    this.$nextTick(()=>{
        document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.rememberPagerScroll;
    });
  }
}
</script>
