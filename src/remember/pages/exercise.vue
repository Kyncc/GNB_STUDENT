<template >
    <view-box v-ref:view-box class="rememberExercise">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
               章节练习
            </x-header>
        </div>

        <div style="padding-top:46px;">
            <template v-if="rememberExercise.chaper">
                <header class="sectionHeader ellipsis">{{rememberExercise.chaper.name}}</header>
                <template v-for="item in rememberExercise.a">
                    <!--2级别练习册-->
                    <template v-if="item.b[0].type == '1'">
                        <group v-for="itemB in item.b" :title="itemB.name">
                            <cell v-for="itemC in itemB.c" :title="itemC.name">
                                <p slot="value">
                                    {{itemC.answer}}
                                    <x-button mini plain type="primary" @click="_intoExample(itemC.id)">例题</x-button>
                                </p>
                            </cell>
                        </group>
                    </template>
                     <!--3级别练习册-->
                    <template v-if="item.b[0].type == '2'">
                        <group :title="item.name">
                            <cell v-for="itemB in item.b" :title="itemB.name">
                                <p slot="value">
                                    {{itemB.answer}}
                                    <x-button mini plain type="primary" @click="_intoExample(itemB.id)">例题</x-button>
                                </p>
                            </cell>
                        </group>
                    </template>
                </template>   
                <x-button v-if="!rememberExercise.isUsed" style="width:95%;text-align:center;margin-top:1rem;border-radius:0px;background:#4bb7aa;color:#fff" type="primary" @click="_post">提交</x-button>
            </template>

            <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
                <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">数据发生一点问题~</p>
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
import { XHeader,Panel,ViewBox,Group,Cell,XButton,Checker, CheckerItem} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {rememberExerciseGet,rememberExercisePost,rememberExerciseClear} from '../actions/exercise'
import {rememberExercise,chapterId} from '../getters'
import { token } from '../../common/getters'
import * as _ from '../../config/whole.js'
import '../index.less'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,XButton,InfiniteLoading,Checker, CheckerItem
  },
  vuex: {
    getters:{
        token,rememberExercise,chapterId
    },
    actions:{
        rememberExerciseGet,rememberExercisePost,rememberExerciseClear
    }
  },
  store,
  methods: {
      _onInfinite(){
        this.rememberExerciseGet({
            token:this.token,   
            chapterId:this.chapterId
        },()=>{
            if(this.rememberExercise.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
            this.$broadcast('$InfiniteLoading:complete');
        });
      },
      _post(){

      },
      _intoExample(id){
        this.$router.go('/remember/example/'+id);
      }
  },
  data () {
    return {

    }
  }
}
</script>
