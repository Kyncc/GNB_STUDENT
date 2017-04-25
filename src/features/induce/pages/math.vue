<template>
  <div>
    <selectBook :list="textList" @on-change="_currentTextbook"></selectBook>
    <group gutter="0" class="gnb_collapse">
      <template v-for="list in induceMath.list.chaper">
        <cell :title="list.name" is-link
        :border-intent="false"
        :arrow-direction="list.checked ? 'up' : 'down'"
        @click.native="list.checked = !list.checked"></cell>
        <div class="slide" :class="list.checked ? 'animate':''">
          <template v-for="chapter in list.sub_chapter_list">
            <cell-box @click.native="$router.push({name: 'induce_exercise', params: {subject: 'math', chapterId: chapter.chapter_id, chapterName: chapter.name}})">
              {{chapter.name}}
            </cell-box>
          </template>
        </div>
      </template>
    </group>
    <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading">
      <div slot="no-results" style="color:#4bb7aa;">出错了~</div>
      <div slot="no-more"></div>
      <div slot="spinner" style="padding:.5rem 0"><spinner type="ripple" slot="value"></spinner></div>
    </infinite-loading>
  </div>
</template>

<script>
import {XHeader, Cell, CellBox, Group, Spinner} from 'vux'
import selectBook from '@/components/gnb_selectbook'
import InfiniteLoading from 'vue-infinite-loading'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'math',
  components: {
    XHeader, Cell, Group, CellBox, Spinner, InfiniteLoading, selectBook
  },
  computed: {
    ...mapGetters(['induceMath', 'User']),
    textList () {
      return this.User.textbook.math
    }
  },
  data () {
    return {
      textbook_id: ''
    }
  },
  methods: {
    ...mapActions(['getInduce', 'setInduceScroll', 'clearInduce']),
    _onInfinite () {
      this.getInduce({
        'textbook_id': this.textbook_id || this.User.textbook.math[0].id
      }).then(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      }).catch(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    },
    _currentTextbook (val) {
      this.textbook_id = val
      this.clearInduce()
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
    }
  },
  activated () {
    this.$parent.$refs.viewBoxBody.scrollTop = this.induceMath.scroll
  },
  beforeRouteLeave (to, from, next) {
    this.setInduceScroll(this.$parent.$refs.viewBoxBody.scrollTop)
    next()
  }
}
</script>
