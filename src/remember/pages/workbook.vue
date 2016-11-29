<template >
    <view-box v-ref:view-box class="rememberChapter rememberSelect">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                章节选择
            </x-header>
        </div>

        <div style="padding-top:46px;">
            <template v-for="item in rememberChapter">
                <template v-for="a in item">
                    <div v-for="aitem in a" style="margin-bottom:.5rem">
                        <header class="sectionHeader ellipsis" @click="_isLink(aitem)" >{{_isLinkTitle(aitem)}}</header>
                        <group>
                            <template v-for="b in aitem.b"> 
                                <cell :title="_isLinkTitle(b)"  @click="_isLink(b)" link="javascript:;"></cell>
                                <template v-for="c in b.c">
                                    <cell :title="_isLinkTitle(c)" class="indent1" @click="_isLink(c)" link="javascript:;"></cell>
                                    <template v-for="d in c.d">
                                        <cell :title="_isLinkTitle(d)" class="indent2" @click="_isLink(d)" link="javascript:;"></cell>
                                    </template>    
                                </template>
                            </template>
                        </group>
                    </div>
                </template>
            </template>

            <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
                <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">你还未添加习题册呢~</p>
                </span>
                <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
            </infinite-loading>

        </div>
    </view-box>
</template>

<script>
import store from '../../store'
import { XHeader,Panel,ViewBox,Group,Cell} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { token } from '../../common/getters'
import {rememberChapter,wookbookId,rememberChapterScroll} from '../getters'
import {getWorkbookChapter,delChapter,setScoll} from '../actions/workbook'
import {rememberExerciseClear} from '../actions/exercise'
import '../index.less'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,InfiniteLoading
  },
  vuex: {
    getters:{
        token,rememberChapter,wookbookId,rememberChapterScroll
    },
    actions:{
        getWorkbookChapter,delChapter,rememberExerciseClear,setScoll
    }
  },
  store,
  methods:{

      _isLink(item){
          if(item.isLink == 'true'){
            this.rememberExerciseClear();//进去前清空数据
            this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop); 
            this.$router.go('/remember/workbook/exercise/'+item.id);
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
        this._isFirst();
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
            return;
        }
     } 

  },
  ready(){
       this.$nextTick(()=>{
            document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.rememberChapterScroll;
        });
  }
}
</script>
