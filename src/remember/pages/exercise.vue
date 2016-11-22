<template >
    <view-box v-ref:view-box class="rememberExercise">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
               章节练习
            </x-header>
        </div>

        <div style="padding-top:46px;">
                <template v-if="rememberExercise.chaper">
                    <header class="sectionHeader">{{rememberExercise.chaper.name}}</header>
                    <template v-for="item in rememberExercise.a">
                        <!--2级别练习册-->
                        <!--<template v-if="item.b[0].type == '1'">
                            <group v-for="itemB in item.b" :title="itemB.name">
                                <cell v-for="itemC in itemB.c" :title="itemC.name">
                                    <p slot="value">
                                        {{itemC.answer }}
                                        <x-button mini plain type="primary" @click="_intoExample(itemC.id)">例题</x-button>
                                    </p>
                                </cell>
                            </group>
                        </template>-->
                        <!--3级别练习册-->
                        <template v-if="item.b[0].type == '2'">
                            <group :title="item.name">
                                <cell v-for="itemB in item.b" :title="itemB.name">
                                    <div slot="value">
                                        <section style="display:inline-block;" @click="_changeAnswer($parent.$index,$index)">
                                            <span v-if="itemB.answer" class="checker">✔</span>
                                            <span v-else class="checker error">✘</span>
                                        </section>
                                        <x-button mini plain type="primary" @click="_intoExample(itemB.id)">例题</x-button>
                                    </div>
                                </cell>
                            </group>
                        </template>
                    </template>   

                    <x-button v-if="!rememberExercise.isUsed" style="width:95%;text-align:center;margin-top:1rem;border-radius:0px;background:#4bb7aa;color:#fff" type="primary" @click="_post">提交结果</x-button>
                    <x-button v-else style="width:95%;text-align:center;margin-top:1rem;border-radius:0px;background:#4bb7aa;color:#fff" type="primary" @click="_next()">下一章节</x-button>    
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
import store from '../../store'
import { XHeader,Panel,ViewBox,Group,Cell,XButton,Checker, CheckerItem} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {rememberExerciseGet,rememberExercisePost,rememberExerciseClear,rememberExAnswerChange} from '../actions/exercise'
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
        rememberExerciseGet,rememberExercisePost,rememberExerciseClear,rememberExAnswerChange
    }
  },
  store,
  methods: {
      _changeAnswer(parentIndex,index){
          if(this.isUsed) return;
          this.rememberExAnswerChange(parentIndex,index);
      },
      /**获取答案*/
      _getAnswerList(){
          this.answerList = [];
          if(!this.rememberExercise.a){
              return;
          }
          let array = this.rememberExercise.a;
          for(let i = 0; i< array.length ; i++){
               for(let j = 0;j< array[i].b.length;j++){
                  this.answerList.push(array[i].b[j].answer);
               }
          }
      },
      _onInfinite(){
         if(this.rememberExercise.length != 0 && this.rememberExercise.a){
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
            return;
        }

        this.rememberExerciseGet({
            token:this.token,   
            chapterId:this.chapterId
        },()=>{
            if(this.rememberExercise.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
            this.$broadcast('$InfiniteLoading:complete');
            this.$refs.my_scroller.resize();
        });

      },
      _post(){
         this._getAnswerList();
         this.rememberExercisePost({
            token:this.token,   
            chapterId:this.chapterId,
            answer:this.answerList
          },()=>{
              this.$router.replace('/remember/workbook/exercise/'+this.nextId);
          });
      },
      _next(){
         this.rememberExerciseClear();//进去前清空数据
         this.$router.replace('/remember/workbook/exercise/'+this.nextId);
      },
      _intoExample(id){
          if(Number(id) == 0){
            _.toast('暂无例题');
            return;
          } 
        this.$router.go('/remember/example/'+id);
      }
  },
  data () {
    return {
        answerList:[]         //答案的列表
    }
  },
  computed:{
      nextId(){     //是否练习过
         return this.rememberExercise.nextChapter;
      },
      isUsed(){      //下一章节的ID
          return this.rememberExercise.isUsed;
      }
  },
  ready(){

       

  }
}
</script>
