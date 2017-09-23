<template>
  <div>
    <selectBook :list="textList" @on-change="_currentTextbook"></selectBook>
    <group gutter="0" class="gnb_collapse" v-if="!loading">
      <template v-for="(list, index) in CameraChapterMath.list.chaper">
        <cell :title="list.name" is-link :key='index'
        :border-intent="false"
        :arrow-direction="list.checked ? 'up' : 'down'"
        @click.native="list.checked = !list.checked"></cell>
        <div class="slide" :class="list.checked ? 'animate':''" :key='index'>
          <template v-for="(chapter, eindex) in list.sub_chapter_list">
            <cell-box :style="chapter.used ? 'color:#FEAA85':''" :key='eindex' is-link
            @click.native="$router.push({name: 'camera_upload', query: {relationId: chapter.id, type: 'chapter'}})">
              <div slot="default" style="width:100%;">{{chapter.name}}</div>
            </cell-box>
          </template>
        </div>
      </template>
    </group>
    <div style="text-align:center">
      <spinner v-if="loading" type="ripple"></spinner>
    </div>
  </div>
</template>

<script>
import {XHeader, Cell, CellBox, Group, Spinner, Flexbox, FlexboxItem} from 'vux'
import selectBook from '@/components/gnb_selectbook'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'math',
  components: {
    XHeader, Cell, Group, CellBox, Spinner, selectBook, Flexbox, FlexboxItem
  },
  computed: {
    ...mapGetters(['CameraChapterMath', 'User']),
    textList () {
      return this.User.textbook.math
    }
  },
  data () {
    return {
      textbookId: '',
      loading: true,
      type: 'chapter'
    }
  },
  methods: {
    ...mapActions(['getCameraChapter', 'setCameraChapterScroll', 'clearCameraChapter']),
    _getData () {
      this.loading = true
      this.getCameraChapter({
        subject: 'math',
        textbookId: this.textbookId || this.User.textbook.math[0].id,
        editionId: this.User.subject.math.id,
        type: this.type
      }).then(() => {
        this.loading = false
      })
    },
    _currentTextbook (val) {
      this.textbookId = val
      this.clearCameraChapter({subject: 'math'})
      this._getData()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$parent.$refs.viewBoxBody.scrollTop = vm.CameraChapterMath.scroll
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setCameraChapterScroll({subject: 'math', height: this.$parent.$refs.viewBoxBody.scrollTop})
    next()
  },
  mounted () {
    this._getData()
  }
}
</script>
