<template >
  <div>
    <template v-for="item in exercise">
      <!--2级别练习册-->
      <template v-if="item.b[0].type == '1'">
        <group v-for="itemB in item.b" :title="itemB.name" :key="itemB.id">
          <cell v-for="itemC in itemB.c" :title="itemC.name" :key="itemC.id">
            <p slot="default">
              <section style="display:inline-block;">
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
          <cell v-for="itemB in item.b" :title="itemB.name" :key="itemB.id">
            <div slot="default">
              <section style="display:inline-block;">
                <i v-if="itemB.answer" class="icon iconfont exampleIcon icon-correct" style="color:#4BB7AA"></i>
                <i v-else class="icon iconfont icon-error exampleIcon" style="color:#FF7043"></i>
              </section>
            </div>
          </cell>
        </group>
      </template>
    </template>
    
    <div style="margin:1rem" v-if="exercise">
      <x-button v-if = "!isUsed" type="primary" @click.native="_post">提交结果</x-button>
      <x-button v-else type="primary" disabled>已提交</x-button>
    </div>

    <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading" spinner="spiral">
      <div slot="no-results" style="color:#4bb7aa;">
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
        <p style="font-size:1rem;display:inline-block;">出错了~</p>
      </div>
      <div slot="no-more"></div>
    </infinite-loading>
  </div>
</template>

<script>
import {Group, Cell, XButton} from 'vux'
import {mapActions, mapGetters} from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'answer',
  components: {
    Group, Cell, InfiniteLoading, XButton
  },
  computed: {
    ...mapGetters(['workbookExercise']),
    exercise () {
      return this.workbookExercise.list.a
    },
    isUsed () {
      return this.workbookExercise.list.isUsed
    }
  },
  methods: {
    ...mapActions(['getWorkbookExercise', 'workbookExerciseClear', 'WorkbookExercisePost', 'setWorkbookExersciseScroll']),
    _post () {},
    _onInfinite () {
      this.getWorkbookExercise().then(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      }).catch(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    // 章节进来清空数据
    if (from.name === 'workbook_chapter') {
      next(vm => {
        vm.workbookExerciseClear()
        vm.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
    } else {
      next()
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
