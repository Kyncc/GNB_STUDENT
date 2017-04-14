<template>
  <div>
    <group gutter="0">
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
      <div slot="no-results" style="color:#4bb7aa;">
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
        <p style="font-size:1rem;display:inline-block;">出错了~</p>
      </div>
      <div slot="no-more"></div>
    </infinite-loading>
  </div>
</template>

<script>
import {ViewBox, Cell, CellBox, Group} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'math',
  components: {
    ViewBox, Cell, CellBox, Group, InfiniteLoading
  },
  computed: {
    ...mapGetters(['User', 'reportMath'])
  },
  methods: {
    ...mapActions(['getReport']),
    _onInfinite () {
      this.getReport().then(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      }).catch(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    }
  }
}
</script>
<style lang="less" scrope>
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
