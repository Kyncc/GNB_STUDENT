<template >
  <div>
    <div v-for="(item, pindex) in exercise" :key='pindex'>
      <!--2级别练习册-->
      <template v-if="item.b[0].type == '1'">
        <group v-for="(itemB, index) in item.b" :title="itemB.name" :key="itemB.id">
          <cell v-for="(itemC, index) in itemB.c" :title="itemC.name" :key="itemC.id">
            <p slot="default">
              <section style="display:inline-block;" @click="_changeAnswer(pindex,index,1)">
                <i v-if="!itemC.isUpload && !itemC.answer" class="icon iconfont icon-camera"
                  @click="$router.push({name: 'workbook_exercise_error_upload', params: {eid: itemC.eid, wbeid: itemC.id, chapterId: Route.params.id}})">
                </i>
                <i v-if="itemC.answer" class="icon iconfont icon-correct" style="color:#4BB7AA"></i>
                <i v-else class="icon iconfont icon-error" style="color:#4BB7AA"></i>
              </section>
            </p>
          </cell>
        </group>
      </template>
      <!--3级别练习册-->
      <template v-else-if="item.b[0].type == '2'">
        <group :title="item.name">
          <cell v-for="(itemB, index) in item.b" :title="itemB.name" :key="itemB.id">
            <div slot="default">
              <section style="display:inline-block;">
                <i v-if="!itemB.isUpload && !itemB.answer" class="icon iconfont icon-camera"
                  @click="$router.push({name: 'workbook_exercise_error_upload', params: {eid: itemB.eid, wbeid: itemB.id, chapterId: Route.params.id}})">
                </i>
                <i @click="_changeAnswer(pindex,index,2)" v-if="itemB.answer" class="icon iconfont exampleIcon icon-correct" style="color:#4BB7AA"></i>
                <i @click="_changeAnswer(pindex,index,2)" v-else class="icon iconfont icon-error exampleIcon" style="color:#FF7043"></i>
              </section>
            </div>
          </cell>
        </group>
      </template>
    </div>

    <div style="margin:1rem" v-if="exercise">
      <x-button v-if = "!isUsed" type="primary" @click.native="_post">提交结果</x-button>
      <x-button v-else type="primary" disabled>已提交</x-button>
    </div>
  </div>
</template>

<script>
import {Group, Cell, XButton} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'answer',
  components: {
    Group, Cell, XButton
  },
  computed: {
    ...mapGetters(['workbookExercise', 'Route']),
    exercise () {
      return this.workbookExercise.list.a
    },
    isUsed () {
      return this.workbookExercise.list.isUsed
    }
  },
  data () {
    return {
      answerListId: [], // 答案的列表
      answerListAnswer: [], // 答案的列表
      workbookType: ''
    }
  },
  methods: {
    ...mapActions(['getWorkbookExercise', 'workbookExerciseClear', 'WorkbookExercisePost', 'setWorkbookExersciseScroll', 'workbookExAnswerChange']),
    _changeAnswer (pIndex, index, type) {
      if (this.isUsed) return
      this.workbookType = type
      this.workbookExAnswerChange({
        pid: pIndex,
        id: index,
        type: type
      })
    },
    // 获取答案
    _getAnswerList () {
      this.answerListId = []
      this.answerListAnswer = []
      if (!this.exercise) return
      if (this.workbookType === '1') {
        // 三级练习册嵌套
        let array = this.exercise[0].b
        for (let i = 0; i < array.length; i++) {
          for (let j = 0; j < array[i].c.length; j++) {
            this.answerListId.push(array[i].c[j].id)
            this.answerListAnswer.push(array[i].c[j].answer)
          }
        }
      } else {
        // 二级练习册嵌套
        let array = this.exercise
        for (let i = 0; i < array.length; i++) {
          for (let j = 0; j < array[i].b.length; j++) {
            this.answerListId.push(array[i].b[j].id)
            this.answerListAnswer.push(array[i].b[j].answer)
          }
        }
      }
    },
    _post () {
      let _this = this
      this.$vux.confirm.show({
        title: '是否提交练习结果',
        dialogTransition: 'vux-fade',
        onConfirm () {
          _this._getAnswerList()
          _this.WorkbookExercisePost({
            answerId: _this.answerListId,
            answer: _this.answerListAnswer
          })
        }
      })
    }
  },
  activated () {
    this.$parent.$refs.viewBoxBody.scrollTop = this.workbookExercise.scroll
  },
  beforeRouteLeave (to, from, next) {
    this.setWorkbookExersciseScroll(this.$parent.$refs.viewBoxBody.scrollTop)
    next()
  }
}
</script>
<style scoped>
.icon-camera{
  color:#4BB7AA;padding-right:10px;position:relative;top:5px;
}
</style>
