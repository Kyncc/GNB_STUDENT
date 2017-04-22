<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '搜索习题册'}"></x-header>
    <group gutter="0">
      <cell v-for="(workbook, index) in workbookSearchList.list" :key="index">
        <img class="previewer-workbook-img" v-lazy='workbook.img.url+"?imageMogr2/auto-orient/thumbnail/60x80!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim"' @click="show(index)" slot="icon" width="60" height="80">
        <p slot="after-title" class="ellipsis" style="width:90%;height:1rem;">&nbsp;&nbsp;&nbsp;{{workbook.workbookName}}</p>
        <div slot="default">
          <x-button v-if="!workbook.status" mini type="primary" slot="default">添加</x-button>
          <x-button v-else mini type="warn" slot="default">删除</x-button>
        </div>
      </cell>
    </group>
    <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading">
      <div slot="no-results" style="color:#4bb7aa;">出错了~</div>
      <div slot="spinner" style="padding:.5rem 0"><spinner type="ripple" slot="value"></spinner></div>
      <div slot="no-more"></div>
    </infinite-loading>
    <previewer :list="list" ref="wbpreviewer" :options="options"></previewer>
  </view-box>
</template>

<script>
import {XHeader, Group, Cell, XButton, ViewBox, Previewer, Spinner, TransferDomDirective as TransferDom} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'workbookSearch',
  components: {
    XHeader, Group, Cell, XButton, ViewBox, Previewer, Spinner, InfiniteLoading
  },
  computed: {
    ...mapGetters(['User', 'workbookSearchList'])
  },
  data () {
    return {
      textbookId: '',
      list: [{
        src: '',
        w: 0,
        h: 0
      }],
      options: {
        preload: [1, 1],
        bgOpacity: 1,
        fullscreenEl: false,
        history: true
      }
    }
  },
  directives: {
    TransferDom
  },
  methods: {
    ...mapActions(['getWorkbookSearch']),
    _onInfinite () {
      this.getWorkbookSearch({
        'textbookId': 207
      }).then(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    },
    show (index) {
      this.list = []
      this.list.push({
        src: `${this.workbookSearchList.list[index].img.url}-workbookBig`,
        w: '700',
        h: '1050'
      })
      this.$nextTick(() => {
        this.$refs.wbpreviewer.show(Number(index))
      })
    }
  },
  activated () {
    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
  }
}
</script>
