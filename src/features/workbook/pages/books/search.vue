<template>
  <div style="height:100%">
    <view-box body-padding-top="95px">
      <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
        <x-header :left-options="{backText: '搜索习题册'}"></x-header>
        <search @on-submit="_onSearch" @on-change="_onSearch" v-model.lazy="name" :auto-fixed="false" placeholder="请输入习题册名称" style="position:fixed;z-index:1;"></search>
      </div>
      <div>
        <group v-for="(workbookList, pindex) in workbookSearchList" :key="pindex" :title="workbookList.textbookName">
          <cell v-for="(workbook, index) in workbookList.list" :key="index">
            <img class="previewer-workbook-img" v-lazy='workbook.img.url+"?imageMogr2/auto-orient/thumbnail/60x80!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim"' @click="show(pindex,index)" slot="icon" width="60" height="80">
            <div slot="after-title" @click="show(pindex,index)" style="width:90%;">
              <p style="color:#aaa;font-size:14px;">&nbsp;&nbsp;&nbsp;{{workbook.year}}版</p>
              <p class="ellipsis">&nbsp;&nbsp;&nbsp;{{workbook.workbookName}}</p>
            </div>
            <div slot="default">
              <x-button v-if="!workbook.status" mini type="primary" slot="default" @click.native="_add(pindex,index,workbook.workbookId)">添加</x-button>
              <x-button v-else mini type="warn" slot="default" @click.native="_del(pindex,index,workbook.workbookId)">删除</x-button>
            </div>
          </cell>
        </group>
        <div style="text-align:center;padding:20px 0;">
          <spinner v-if="loading" type="dots"></spinner>
          <p v-else-if="workbookSearchList.length === 0" style="font-size:16px;color:#4BB7AA">没有搜索到相对应的习题册~</p>
        </div>
      </div>
    </view-box>
    <previewer :list="list" ref="wbpreviewer" :options="options"></previewer>
  </div>
</template>

<script>
import {XHeader, Group, Cell, XButton, ViewBox, Previewer, Spinner, Search, TransferDomDirective as TransferDom} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'workbookSearch',
  components: {
    XHeader, Group, Cell, XButton, ViewBox, Previewer, Spinner, Search
  },
  computed: {
    ...mapGetters(['User', 'workbookSearchList'])
  },
  data () {
    return {
      loading: false,
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
    _add (pindex, index, workbookId) {
      this.workbookAdd({type: 'search', pindex: pindex, index: index, workbookId: workbookId})
    },
    _del (pindex, index, workbookId) {
      this.workbookDel({type: 'search', pindex: pindex, index: index, workbookId: workbookId})
    },
    _getData () {
      if (this.name !== '') {
        this.loading = true
        this.getWorkbookSearch({
          'workbookName': this.name
        }).then(() => {
          this.loading = false
        })
      }
    },
    _onSearch (str) {
      this.name = str
      this.workbookSearchClear()
      this._getData()
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
  }
}
</script>
