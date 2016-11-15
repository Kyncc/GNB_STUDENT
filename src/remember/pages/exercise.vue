<template >
    <view-box v-ref:view-box class="rememberExercise">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
               章节练习
            </x-header>
        </div>

        <div style="padding-top:46px;">
            <header class="sectionHeader ellipsis">{{rememberExercise.chaper.name }}</header>
            <template v-for="item in rememberExercise.nodes.a">
                <group :title="item.name">
                    <template v-for="itemB in item.b">
                        <cell :title="itemB.name">
                            <p slot="value"><a>{{itemB.id}}</a>1111</p>
                        </cell>
                    </template>
                </group>
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
import { XHeader,Panel,ViewBox,Group,Cell,XButton} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {rememberExerciseGet,rememberExercisePost,rememberExerciseClear} from '../actions/exercise'
import {rememberExercise,chapterId} from '../getters'
import { token } from '../../common/getters'
import * as _ from '../../config/whole.js'
import '../index.less'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,XButton,InfiniteLoading
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
            chapterId:this.chapterId,
        },()=>{
            if(this.rememberExercise.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
            this.$broadcast('$InfiniteLoading:complete');
        });
      }
  },
  data () {
    return {

    }
  }
}
</script>
