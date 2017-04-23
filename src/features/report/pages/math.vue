<template>
  <div ref="reportMath">
    <group gutter="0" class="gnb_collapse">
      <template v-for="list in reportMath.chapter">
        <cell :title="list.name" is-link
        :border-intent="false"
        :arrow-direction="list.checked ? 'up' : 'down'"
        @click.native="list.checked = !list.checked"></cell>
        <div class="slide" :class="list.checked ? 'animate':''">
          <template v-for="chapter in list.chapter_list">
            <cell-box @click.native="$router.push({name: 'report_detail', params: {chapterId: chapter.chapter_id}})">
              {{chapter.name}}
            </cell-box>
          </template>
        </div>
      </template>
    </group>
    <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading" spinner="spiral">
      <div slot="no-results" style="color:#4bb7aa;">出错了~</div>
      <div slot="no-more"></div>
      <div slot="spinner" style="padding:.5rem 0"><spinner type="ripple" slot="value"></spinner></div>
    </infinite-loading>
  </div>
</template>

<script>
import {ViewBox, Cell, CellBox, Group, Spinner} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'math',
  components: {
    ViewBox, Cell, CellBox, Group, Spinner, InfiniteLoading
  },
  computed: {
    ...mapGetters(['User', 'reportMath'])
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
    this.$parent.$refs.viewBoxBody.scrollTop = this.reportMath.scroll
  },
  deactivated () {
    this.$parent.$refs.viewBoxBody.scrollTop = 0
  },
  beforeRouteLeave (to, from, next) {
    this.setReportScoll(this.$parent.$refs.viewBoxBody.scrollTop)
    next()
  }
}
</script>
<style lang="less" scoped>
@import '../../../components/gnb_collapse/index.less';
</style>
