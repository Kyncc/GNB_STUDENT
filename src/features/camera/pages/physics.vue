<template>
  <div>
    <selectBook :list="textList" @on-change="_currentTextbook"></selectBook>
    <group gutter="0" class="gnb_collapse" v-if="!loading">
      <template v-for="(list, index) in CameraPhysics.list.chaper">
        <cell :title="list.name" is-link :key='index'
        :border-intent="false"
        :arrow-direction="list.checked ? 'up' : 'down'"
        @click.native="list.checked = !list.checked"></cell>
        <div class="slide" :class="list.checked ? 'animate':''" :key='index'>
          <template v-for="(chapter, eindex) in list.sub_chapter_list">
            <cell-box :style="chapter.used ? 'color:#FEAA85':''" :key='eindex' is-link
            @click.native="$router.push({name: 'camera_exercise', params: {subject: 'physics', chapterId: chapter.chapter_id, chapterName: chapter.name}})">
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
import {XHeader, Cell, CellBox, Group, Spinner} from 'vux'
import selectBook from '@/components/gnb_selectbook'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'physics',
  components: {
    XHeader, Cell, Group, CellBox, Spinner, selectBook
  },
  computed: {
    ...mapGetters(['CameraPhysics', 'User']),
    textList () {
      return this.User.textbook.physics
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
    ...mapActions(['getCamera', 'setCameraScroll', 'clearCamera']),
    _getData () {
      this.loading = true
      this.getCamera({
        'textbookId': this.textbookId || this.User.textbook.physics[0].id,
        'editionId': this.User.subject.physics.id,
        'type': this.type
      }).then(() => {
        this.loading = false
      })
    },
    _currentTextbook (val) {
      this.textbookId = val
      this.clearCamera()
      this._getData()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$parent.$refs.viewBoxBody.scrollTop = vm.CameraPhysics.scroll
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setCameraScroll(this.$parent.$refs.viewBoxBody.scrollTop)
    next()
  },
  mounted () {
    this._getData()
  }
}
</script>
