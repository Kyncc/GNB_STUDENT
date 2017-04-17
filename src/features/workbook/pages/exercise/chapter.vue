<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: Route.params.name}"></x-header>
    <template v-for="a in chapter">
      <group v-for="(aitem, index) in a" :key="index" :gutter="(index === 0 ? '0' : '10px')">
        <cell :title="aitem.name" 
          @click.native="aitem.isLink ? $router.push({name : 'workbook_uploader', params: {id: aitem.id}}) : ''">
        </cell>
        <template v-for="b in aitem.b"> 
          <cell :title="b.name"
            @click.native="b.isLink ? $router.push({name : 'workbook_uploader', params: {id: b.id}}) : ''">
          </cell>
          <!--<cell v-for="c in b.c" :title="c.name" :key="c.id" link="javascript:;"></cell>-->
        </template>
      </group>
    </template>
    <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading" spinner="spiral">
      <div slot="no-results" style="color:#4bb7aa;">
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
        <p style="font-size:1rem;display:inline-block;">出错了~</p>
      </div>
      <div slot="no-more"></div>
    </infinite-loading>
  </view-box>
</template>
<script>
import {XHeader, ViewBox, Group, Cell} from 'vux'
import {mapActions, mapGetters} from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'chapter',
  components: {
    XHeader, ViewBox, Group, Cell, InfiniteLoading
  },
  methods: {
    ...mapActions(['getWorkbookChapter', 'setWorkbookChapterScroll', 'workbookChapterClear']),
    _onInfinite () {
      this.getWorkbookChapter().then(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      }).catch(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    // 选择练习本进来清空数据
    if (from.name === 'workbook_math' || from.name === 'workbook_physics') {
      next(vm => {
        vm.workbookChapterClear()
        vm.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
    } else {
      next()
    }
  },
  computed: {
    ...mapGetters(['workbookChapter', 'Route']),
    chapter () {
      return this.workbookChapter.list[0]
    }
  }
}
</script>
