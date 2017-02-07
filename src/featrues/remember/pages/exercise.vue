<template >
  <view-box v-ref:view-box class="workbookStuExercise">
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
                    <section style="display:inline-block;" >
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
                    <section style="display:inline-block;" >
                      <i v-if="itemB.answer" class="icon iconfont exampleIcon icon-correct"></i>
                      <i v-else class="icon iconfont icon-error exampleIcon"></i>
                    </section>
                    <!--<x-button mini plain type="primary" @click="_intoExample(itemB.eid)">例题</x-button>-->
                  </div>
                </cell>
              </group>
            </template>
          </template>

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
    ...mapActions(['getWorkbookStuExercise']),
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
    _intoExample(id){
      if(Number(id) == 0){
        _.toast('暂无例题');
        return;
      }
      // this.setScroll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop); 
      this.$router.go('/example/'+id);
    }
  },
  data(){
    return {
      answerListId:[],         //答案的列表
      answerListAnswer:[],         //答案的列表
      workbookType:''
    }
  },
  computed:{
    ...mapGetters(['workbookStuExercise']),
    Exercise(){
      return this.workbookStuExercise.list;
    }
	}
}
</script>
