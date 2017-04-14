<template>
  <div>
    
    <group gutter="0">
      <cell :title="'Title 001'" is-link
      :border-intent="false"
      :arrow-direction="showContent001 ? 'up' : 'down'"
      @click.native="showContent001 = !showContent001"></cell>
      <div class="slide" :class="showContent001?'animate':''">
        <cell-box :border-intent="false">content 001</cell-box>
        <cell-box>content 001</cell-box>
        <cell-box>content 001</cell-box>
      </div>
      <cell :title="'Title 001'" is-link :border-intent="false"
      :arrow-direction="showContent002 ? 'up' : 'down'"
      @click.native="showContent002 = !showContent002"></cell>
      <div class="slide" :class="showContent002?'animate':''">
        <cell-box :border-intent="false">content 001</cell-box>
        <cell-box>content 001</cell-box>
        <cell-box>content 001</cell-box>
      </div>
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
import {XHeader, Cell, CellBox, Group} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'math',
  components: {
    XHeader, Cell, Group, CellBox, InfiniteLoading
  },
  computed: {
    ...mapGetters(['induceMath'])
  },
  data () {
    return {
      showContent001: false,
      showContent002: false
    }
  },
  methods: {
    ...mapActions(['getInduce', 'induceChangeChapter', 'setInduceScroll', 'clearInduce']),
    _onInfinite () {
      this.getInduce().then(() => {
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
