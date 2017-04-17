<template>
  <div>
    <selectBook :list="textList" @on-change="_currentTextbook"></selectBook>
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
import {Group} from 'vux'
import {mapActions, mapGetters} from 'vuex'
import selectBook from '@/components/gnb_selectbook'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'physics',
  components: {
    Group, InfiniteLoading, selectBook
  },
  data () {
    return {
      textbook_id: ''
    }
  },
  methods: {
    ...mapActions([])
  },
  computed: {
    ...mapGetters(['User']),
    textList () {
      return this.User.textbook.math
    }
  }
}
</script>
