<template>
  <div>
    <selectBook :list="textList" @on-change="_currentTextbook"></selectBook>
    <group gutter="0">
      <template v-for="book in workbookMath.list[0]">
        <cell>
          <!--<img :src='book+"-workbook"' slot="defalut" width="60" height="80">-->

        </cell>
      </template>
      <cell></cell>
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
import {Group, Cell} from 'vux'
import {mapActions, mapGetters} from 'vuex'
import selectBook from '@/components/gnb_selectbook'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'math',
  components: {
    Group, Cell, InfiniteLoading, selectBook
  },
  data () {
    return {
      textbook_id: ''
    }
  },
  methods: {
    ...mapActions(['getWorkbook', 'workbookClear']),
    _onInfinite () {
      this.getWorkbook({
        // 'textbook_id': this.textbook_id | this.User.textbook.math[0].id
      }).then(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      }).catch(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    },
    _currentTextbook (val) {
      this.textbook_id = val
      this.workbookClear()
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
    }
  },
  computed: {
    ...mapGetters(['User', 'workbookMath']),
    textList () {
      return this.User.textbook.math
    }
  }
}
</script>
