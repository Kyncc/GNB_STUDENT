<template>
  <view-box ref="viewBoxBody" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: Route.params.name}"></x-header>
    <div v-if="!loading">
      <template v-for="a in chapter">
        <group v-for="(aitem, index) in a" :key="index" style="margin-bottom:.5rem" gutter="0">
          <cell :title="aitem.name"
            :style=" _getColor(aitem)" @click.native="aitem.isLink.toString() === 'true' ? $router.push({name : 'workbook_exercise_result', params: {id: aitem.id, name: aitem.name}}) : ''">
          </cell>
          <template v-for="b in aitem.b" >
            <cell :title="b.name"
              :style=" _getColor(b)"
              @click.native="b.isLink.toString() === 'true' ? $router.push({name : 'workbook_exercise_result', params: {id: b.id, name: b.name}}) : ''">
            </cell>
          </template>
        </group>
      </template>
    </div>
    <div style="text-align:center">
      <spinner v-if="loading" type="dots"></spinner>
    </div>
  </view-box>
</template>
<script>
import {XHeader, ViewBox, Group, Cell, Spinner} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'chapter',
  components: {
    XHeader, ViewBox, Group, Cell, Spinner
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getWorkbookChapter', 'setWorkbookChapterScroll', 'workbookChapterClear']),
    _getData () {
      this.loading = true
      this.getWorkbookChapter().then(() => {
        this.loading = false
      })
    },
    _getColor (item) {
      if (item.isUsed.toString() === 'true') {
        return 'color:#FEAA85' // 是否联系过
      } else if (item.isLink.toString() === 'false') {
        return 'color:#4BB7AA' // 是否是标题
      }
    }
  },
  activated () {
    if (this.workbookChapter.isReset) {
      this.loading = true
      this.getWorkbookChapter().then(() => {
        this.loading = false
      }).then(() => {
        this.$nextTick(() => {
          this.$refs.viewBoxBody.scrollTo(this.workbookChapter.scroll)
        })
      })
    } else {
      this.$refs.viewBoxBody.scrollTo(this.workbookChapter.scroll)
    }
  },
  beforeRouteEnter (to, from, next) {
    // 选择练习本进来清空数据
    if (from.name === 'workbook_math' || from.name === 'workbook_physics') {
      next(vm => {
        vm.workbookChapterClear()
        vm._getData()
      })
    } else {
      next()
    }
  },
  beforeRouteLeave (to, from, next) {
    this.setWorkbookChapterScroll(this.$refs.viewBoxBody.getScrollTop())
    next()
  },
  computed: {
    ...mapGetters(['workbookChapter', 'Route']),
    chapter () {
      return this.workbookChapter.list[0]
    }
  }
}
</script>
