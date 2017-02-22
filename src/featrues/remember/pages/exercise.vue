<template >
  <view-box class="workbookStuExercise">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">章节练习</x-header>
    </div>

    <div style="padding-top:46px;">
        <template v-if="Exercise.chaper">
          <header class="sectionHeader">{{Exercise.chaper.name}}</header>
          <template v-for="item in Exercise.a">
            <!--2级别练习册-->
            <template v-if="item.b[0].type == '1'">
              <group v-for="itemB in item.b" :title="itemB.name">
                <cell v-for="itemC in itemB.c" :title="itemC.name">
                  <p slot="value">
                    <section style="display:inline-block;" @click="_changeAnswer($parent.$index,$index,1)">
                      <i v-if="itemC.answer" class="icon iconfont exampleIcon icon-correct"></i>
                      <i v-else class="icon iconfont icon-error exampleIcon"></i>
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
                      <i  v-if="itemB.answer" class="icon iconfont exampleIcon icon-correct"></i>
                      <i  v-else class="icon iconfont icon-error exampleIcon"></i>
                    </section>
                    <!--<x-button mini plain type="primary" @click="_intoExample(itemB.eid)">例题</x-button>-->
                  </div>
                </cell>
              </group>
            </template>
          </template>

           <x-button v-if="!Exercise.isUsed" style="width:95%;text-align:center;margin-top:1rem;border-radius:0px;background:#4bb7aa;color:#fff" type="primary" @click="_post">提交结果</x-button>
           <x-button v-else style="width:95%;margin-top:1rem;" type="primary" disabled>已提交</x-button>

        </template>

        <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
          <span slot="no-results" style="color:#4bb7aa;">
            <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
            <p style="font-size:1rem;display:inline-block;">数据发生一点问题~</p>
          </span>
          <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
        </infinite-loading>
    <confirm :show.sync="showConfirm" confirm-text="确定" cancel-text="取消" title="确定提交练习结果？" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>

    </div>
  </view-box>


</template>

<script>
import { XHeader,Panel,ViewBox,Group,Cell,XButton,Checker, CheckerItem,Confirm} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions,mapGetters} from 'vuex'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,XButton,InfiniteLoading,Checker, CheckerItem,Confirm
  },
  route: {
    data:function(transition){
      if(this.workbookStuExercise.isReset){
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        })
      }
    }
  },
  methods: {
    ...mapActions(['getWorkbookStuExercise','setWorkbookStuExersciseScroll','WorkbookExercisePost','workbookStuExAnswerChange']),
    /**获取答案*/
    _getAnswerList(){
      this.answerListId = [];
      this.answerListAnswer = [];
      if(!this.Exercise.a){
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
        let array = this.Exercise.a;
        for(let i = 0; i< array.length ; i++){
          for(let j = 0;j< array[i].b.length;j++){
            this.answerListId.push(array[i].b[j].id);
            this.answerListAnswer.push(array[i].b[j].answer);
          }
        }
      }
    },
    _onInfinite(){
      this.getWorkbookStuExercise()
      .then(()=>{
        this.$broadcast('$InfiniteLoading:loaded');
        this.$broadcast('$InfiniteLoading:complete');
      });
    },
    /** 提交信息*/
    onAction(type) {
      if(type=='确认'){
          this._getAnswerList();
          this.WorkbookExercisePost({
              answerId:this.answerListId,
              answer:this.answerListAnswer
          }).then(()=>{
              setTimeout(()=>{
                  history.back();
              },500);
          });
      }else{
          return
      }
    },
    //进入例题
    _intoExample(id){
      if(Number(id) == 0){
        _.toast('暂无例题');
        return;
      }
      // this.setWorkbookStuExersciseScroll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop); 
      // this.$router.go(`/example/${id}/${this.workbookStuSubject}`);
    },
    //答案变动更新store
    _changeAnswer(parentIndex,index,type){
      if(this.isUsed) return;
      this.workbookType = type;
      this.workbookStuExAnswerChange({
        "pid":parentIndex,
        "id":index,
        "type":type
      });
    },
    //提交警告窗口
    _post(){
        this.showConfirm = true;
    },
  },
  data(){
    return {
      answerListId:[],         //答案的列表
      answerListAnswer:[],         //答案的列表
      workbookType:'',
      showConfirm:false
    }
  },
  computed:{
    ...mapGetters(['workbookStuExercise','workbookStuSubject']),
    Exercise(){
      return this.workbookStuExercise.list;
    },
    isUsed(){      //下一章节的ID
      return this.workbookStuExercise.list.isUsed;
    }
	}
}
</script>
