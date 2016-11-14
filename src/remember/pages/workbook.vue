<template >
    <view-box v-ref:view-box class="rememberSelect">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                章节选择
            </x-header>
        </div>

        <div style="padding-top:46px;">
            <template v-for="item in rememberChapter">
                <template v-for="a in item">
                    <div v-for="aitem in a" style="margin-bottom:.5rem">
                        <header class="sectionHeader">{{aitem.name}}<span class="with_arrow"></span></header>
                        <group>
                            <template v-for="b in aitem.b"> 
                                <cell :title="b.name" :link="'chapter/'+b.id"></cell>
                                <template v-for="c in b.c">
                                    <cell :title="c.name" :link="'chapter/'+c.id"></cell>
                                    <template v-for="d in c.d">
                                        <cell :title="d.name" :link="'chapter/'+d.id"></cell>
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
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import { XHeader,Panel,ViewBox,Group,Cell} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { token } from '../../common/getters'
import {rememberChapter,wookbookId} from '../getters'
import {getWorkbookChapter} from '../actions/workbook'
import '../index.less'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,InfiniteLoading
  },
  vuex: {
    getters:{
        token,rememberChapter,wookbookId
    },
    actions:{
        getWorkbookChapter
    }
  },
  store,
  methods:{
      _onInfinite(){
        this.getWorkbookChapter({
            token:this.token,   
            workbookId:this.wookbookId
        },()=>{
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
        });
      }
  }
}
</script>
