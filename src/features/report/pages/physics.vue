<template>
  <div class="reportPhysics">
    <group gutter="0" class="gnb_collapse">
      <template v-for="list in reportPhysics.chapter">
        <cell :title="list.name" is-link
        :border-intent="false"
        :arrow-direction="list.checked ? 'up' : 'down'"
        @click.native="list.checked = !list.checked"></cell>
        <div class="slide" :class="list.checked ? 'animate':''">
          <template v-for="chapter in list.sub_chapter_list">
            <cell-box @click.native="$router.push({name: 'report_detail', params: {chapterId: chapter.chapter_id}})">
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
import {ViewBox, Cell, CellBox, Spinner, Group} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'math',
  components: {
    ViewBox, Cell, CellBox, Group, Spinner, InfiniteLoading
  },
  computed: {
    ...mapGetters(['User', 'reportPhysics'])
  },
  methods: {
    ...mapActions(['getReport', 'setReportScoll']),
    _onInfinite () {
      this.getReport().then(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      }).catch(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    }
  },
  activated () {
    this.$parent.$refs.viewBoxBody.scrollTop = this.reportPhysics.scroll
  },
  beforeRouteLeave (to, from, next) {
    this.setReportScoll(this.$parent.$refs.viewBoxBody.scrollTop)
    next()
  }
}
</script>
<style lang="less" scoped>
.slide {
  padding: 0 15px 0 0;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
</style>
