<template >
    <view-box v-ref:view-box class="rememberExercise">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">章节练习</x-header>
        </div>

        <div style="padding-top:46px;">
                <template v-if="rememberExercise.chaper">
                    <header class="sectionHeader">{{rememberExercise.chaper.name}}</header>
                    <template v-for="item in rememberExercise.a">
                        <!--2级别练习册-->
                        <template v-if="item.b[0].type == '1'">
                            <group v-for="itemB in item.b" :title="itemB.name">
                                <cell v-for="itemC in itemB.c" :title="itemC.name">
                                    <p slot="value">
                                        <section style="display:inline-block;" @click="_changeAnswer($parent.$index,$index,1)">
                                            <i  v-if="itemC.answer" class="icon iconfont exampleIcon icon-correct"></i>
                                            <i  v-else class="icon iconfont icon-error exampleIcon"></i>
                                        </section>
                                        <!--<x-button mini plain type="primary" @click="_intoExample(itemC.eid)">例题</x-button>-->
                                    </p>
                                </cell>
                            </group>
                        </template>
                        <!--3级别练习册-->
                        <template v-if="item.b[0].type == '2'">
                            <group :title="item.name">
                                <cell v-for="itemB in item.b" :title="itemB.name">
                                    <div slot="value">
                                        <section style="display:inline-block;" @click="_changeAnswer($parent.$index,$index,2)">
                                            <i v-if="itemB.answer" class="icon iconfont exampleIcon icon-correct"></i>
                                            <i v-else class="icon iconfont icon-error exampleIcon"></i>
                                        </section>
                                        <!--<x-button mini plain type="primary" @click="_intoExample(itemB.eid)">例题</x-button>-->
                                    </div>
                                </cell>
                            </group>
                        </template>
                    </template>   

                    <x-button v-if="!rememberExercise.isUsed" style="width:95%;text-align:center;margin-top:1rem;border-radius:0px;background:#4bb7aa;color:#fff" type="primary" @click="_post">提交结果</x-button>
                    <x-button v-else style="width:95%;margin-top:1rem;" type="primary" disabled>已提交</x-button>
                        
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

    <confirm :show.sync="showConfirm" confirm-text="确定" cancel-text="取消" title="确定提交练习结果？" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>

</template>

<script>
import { XHeader,Panel,ViewBox,Group,Cell,XButton,Checker, CheckerItem,Confirm} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {rememberExerciseGet,rememberExercisePost,rememberExerciseClear,rememberExAnswerChange,setScoll} from '../actions/exercise'
import {rememberExercise,chapterId,rememberExerciseScroll} from '../getters'
import { token } from '../../common/getters'
import * as _ from '../../config/whole.js'
import './index.less'

export default {
  components:{
        XHeader,ViewBox,Panel,Group,Cell,XButton,InfiniteLoading,Checker, CheckerItem,Confirm
  },
  vuex: {
    getters:{
        token,rememberExercise,chapterId,rememberExerciseScroll
    },
    actions:{
        rememberExerciseGet,rememberExercisePost,rememberExerciseClear,rememberExAnswerChange,setScoll
    }
  },
  methods: {
      _changeAnswer(parentIndex,index,type){
          if(this.isUsed) return;
          this.workbookType = type;
          this.rememberExAnswerChange(parentIndex,index,type);
      },
      /**获取答案*/
      _getAnswerList(){
          this.answerListId = [];
          this.answerListAnswer = [];
          if(!this.rememberExercise.a){
              return;
          }
       
        if(this.workbookType == '1'){
            //三级练习册嵌套
            let array = this.rememberExercise.a[0].b;
            for(let i = 0; i< array.length ; i++){
                for(let j = 0;j< array[i].c.length;j++){
                    this.answerListId.push(array[i].c[j].id);
                    this.answerListAnswer.push(array[i].c[j].answer);
                }
            }
        }else{
            //二级练习册嵌套
            let array = this.rememberExercise.a;
            for(let i = 0; i< array.length ; i++){
                for(let j = 0;j< array[i].b.length;j++){
                    this.answerListId.push(array[i].b[j].id);
                    this.answerListAnswer.push(array[i].b[j].answer);
                }
            }
        }

      },
      /** 提交信息*/
      onAction(type) {
            if(type=='确认'){
                this._getAnswerList();
                // return;
                this.rememberExercisePost({
                    token:this.token,   
                    chapterId:this.chapterId,
                    answerId:this.answerListId,
                    answer:this.answerListAnswer
                },()=>{
                    setTimeout(()=>{
                        history.back();
                    },500);
                });
            }else{
                return
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
        this.showConfirm = true;
      },
      _next(){
         this.rememberExerciseClear();//进去前清空数据
        //  history.back();
         this.$router.replace('/remember/workbook/exercise/'+this.nextId);
      },
      _intoExample(id){
          if(Number(id) == 0){
            _.toast('暂无例题');
            return;
          }
          this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop); 
          this.$router.go('/remember/example/'+id);
      }
  },
  data () {
    return {
        answerListId:[],         //答案的列表
        answerListAnswer:[],         //答案的列表
        showConfirm:false,
        workbookType:''
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
       this.$nextTick(()=>{
            document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.rememberExerciseScroll;
        });
  }
}
</script>
