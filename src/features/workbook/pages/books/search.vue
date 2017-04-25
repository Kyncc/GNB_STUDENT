<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '搜索习题册'}"></x-header>
    <search @on-submit="_onSearch"  @on-change="_onSearch" v-model.lazy="name" :auto-fixed="false" placeholder="请输入习题册名称" style="position:fixed;z-index:100;"></search>
    <div style="padding-top:50px;">
      <group v-for="(workbookList, pindex) in workbookSearchList" :key="pindex" :title="workbookList.textbookName">
        <cell v-for="(workbook, index) in workbookList.list" :key="index">
          <img class="previewer-workbook-img" v-lazy='workbook.img.url+"?imageMogr2/auto-orient/thumbnail/60x80!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim"' @click="show(pindex,index)" slot="icon" width="60" height="80">
          <p slot="after-title" class="ellipsis" @click="show(pindex,index)" style="width:90%;height:1rem;">&nbsp;&nbsp;&nbsp;{{workbook.workbookName}}</p>
          <div slot="default">
            <x-button v-if="!workbook.status" mini type="primary" slot="default" @click.native="_add(pindex,index)">添加</x-button>
            <x-button v-else mini type="warn" slot="default" @click.native="_del(pindex,index)">删除</x-button>
          </div>
        </cell>
      </group>
      <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading">
        <div slot="no-results" style="color:#4bb7aa;"></div>
        <div slot="spinner" style="padding:.5rem 0"><spinner type="dots" slot="value"></spinner></div>
        <div slot="no-more" style="color:#4bb7aa;">没有更多结果了~</div>
      </infinite-loading>
    </div>
    <previewer :list="list" ref="wbpreviewer" :options="options"></previewer>
  </view-box>
</template>

<script>
import {XHeader, Group, Cell, XButton, ViewBox, Previewer, Spinner, Search, TransferDomDirective as TransferDom} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'workbookSearch',
  components: {
    XHeader, Group, Cell, XButton, ViewBox, Previewer, Spinner, Search, InfiniteLoading
  },
  computed: {
    ...mapGetters(['User', 'workbookSearchList'])
  },
  data () {
    return {
      textbookId: '',
      name: '',
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
    ...mapActions(['getWorkbookSearch', 'workbookSearchClear', 'workbookAdd', 'workbookDel']),
    _add (pindex, index) {
      this.workbookAdd({type: 'search', pindex: pindex, index: index})
    },
    _del (pindex, index) {
      this.workbookDel({type: 'search', pindex: pindex, index: index})
    },
    _onInfinite () {
      if (this.name !== '') {
        this.getWorkbookSearch({
          'workbookName': this.name
        }).then(() => {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        })
      } else {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      }
    },
    _onSearch (str) {
      this.name = str
      this.workbookSearchClear()
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
    },
    show (pindex, index) {
      this.list = []
      this.list.push({
        src: `${this.workbookSearchList[pindex].list[index].img.url}-workbookBig`,
        w: '700',
        h: '1050'
      })
      this.$nextTick(() => {
        this.$refs.wbpreviewer.show(Number(index))
      })
    }
  },
  activated () {
    this.name = ''
    this.workbookSearchClear()
    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
  }
}
</script>
