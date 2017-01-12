<template >
    <view-box v-ref:view-box class="rememberChapter rememberSelect">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">章节选择
                <a slot="right" @click="_changeType()" class="changeSub">
                    按页码<span class="with_arrow"></span>
                </a>
            </x-header>
        </div>

        <div style="padding-top:46px;">
            1231231
            <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
                <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">你还未添加习题册呢~</p>
                </span>
                <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
            </infinite-loading>

            <Popup :visible.sync="visible"  popup-transition="popup-fade" class="gnb-changeSub">
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
import {rememberChapter,wookbookId,rememberChapterScroll} from '../getters'
import {getWorkbookChapter,delChapter,setScoll} from '../actions/workbook'
import {rememberExerciseClear} from '../actions/exercise'
import './index.less'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,InfiniteLoading,Popup
  },
  vuex: {
    getters:{
        token,rememberChapter,wookbookId,rememberChapterScroll
    },
    actions:{
        getWorkbookChapter,delChapter,rememberExerciseClear,setScoll
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
      _isLink(item){
          if(item.isLink == 'true'){
            this.rememberExerciseClear();//进去前清空数据
            this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop); 
            this.$router.go('exercise/'+item.id);
          }
          return;
      },
      _isLinkTitle(item){
          if(item.isLink == 'true' && item.isUsed == 'true'){
              return  '✔ '+item.name
          }
          return (item.isLink == 'true' ? '✐  '+item.name:'♢  '+item.name);
      },
      _onInfinite(){
        if(this._isFirst()){
            return;
        }
        this.getWorkbookChapter({
            token:this.token,   
            workbookId:this.wookbookId
        },()=>{
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
        });
      },
      /** 是否第一次*/
     _isFirst(){
        if(this.rememberChapter.length != 0 && this.rememberChapter[0].a){
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
            return true;
        }
        return false;
     } 

  },
  ready(){
    this.$nextTick(()=>{
        document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.rememberChapterScroll;
    });
  }
}
</script>
