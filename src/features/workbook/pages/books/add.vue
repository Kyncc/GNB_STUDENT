<template>
  <div style="height:100%">
    <view-box body-padding-top="86px" body-padding-bottom="46px">
      <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" >
        <x-header :left-options="{backText: '习题册管理'}">
          <div slot="right" @click="$router.push({name: 'workbook_search', param: {subject: Route.params.subject}})">
            <i class="icon iconfont icon-iconfontsousuo" style="padding:8px;font-size:26px;margin-right:-10px;"></i>
          </div>
        </x-header>
        <div ref="tab" style="width: 100%;overflow:scroll;-webkit-overflow-scrolling:touch;z-index:1;">
          <tab :line-width="1" :style='"min-width:100%;width:"+tabwidth' :animate="false">
            <template v-for="(textbook, index) in textBookList">
              <tab-item :selected="Number(Route.query.id) === Number(textbook.id)"
                @click.native="$router.replace({name: 'workbook_add', query:{id: textbook.id}})" :key='index'>
                {{textbook.name}}
              </tab-item>
            </template>
          </tab>
        </div>
      </div>
      <div>
        <group gutter="0" v-if="!loading">
          <template v-for="(result, pindex) in workbookAddList">
            <cell v-for="(workbook, index) in result.list" :key="index">
              <img class="previewer-workbook-img" v-lazy='workbook.img.url+"?imageMogr2/auto-orient/thumbnail/120x160!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim"' @click="show(pindex,index)" slot="icon" width="60" height="80"/>
              <div slot="after-title" @click="show(pindex,index)" style="width:90%;">
                <p style="color:#4cc0be;font-size:14px;">&nbsp;&nbsp;&nbsp;{{workbook.year}}版</p>
                <p class="ellipsis" style="font-size:.9rem;padding:.2rem 0">&nbsp;&nbsp;{{workbook.workbookName}}</p>
                <template v-if='workbook.version'>
                  <p v-for="(tag, index) in workbook.version.split(',')" :key='index' style="color:#aaa;font-size:14px;">
                    &nbsp;&nbsp;&nbsp;{{tag}}
                  </p>
                </template>
              </div>
              <div slot="default">
                <x-button v-if="!workbook.status" mini type="primary" slot="default" @click.native="_add(pindex,index,workbook.workbookId)">添加</x-button>
                <x-button v-else mini type="warn" slot="default" @click.native="_del(pindex,index,workbook.workbookId)">删除</x-button>
              </div>
            </cell>
          </template>
        </group>
        <div style="text-align:center;padding:20px 0;">
          <spinner v-if="loading" type="dots"></spinner>
          <p v-else-if="workbookAddList.length === 0" style="font-size:16px;color:#4cc0be;">没有更多的习题册了~</p>
        </div>
      </div>
      <tabbar slot="bottom" style='text-align:center;font-size:.8rem;padding:.25rem 0;'>
        <p style='color:#4cc0be;width:100%;' @click="$router.push({name: 'workbook_want'})">没有我想要的习题册？
          <b style='text-decoration:underline;font-weight:normal;color:#333'>点我提交</b>
        </p>
      </tabbar>
    </view-box>
    <previewer :list="list" ref="wbpreviewer" :options="options"></previewer>
  </div>
</template>

<script>
import {XHeader, Group, Cell, Tab, TabItem, XButton, ViewBox, Previewer, Spinner, Tabbar} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'workbookAdd',
  components: {
    XHeader, Group, Cell, Tab, TabItem, XButton, ViewBox, Previewer, Spinner, Tabbar
  },
  computed: {
    ...mapGetters(['User', 'workbookAddList', 'Route']),
    textbookId () {
      return this.Route.query.id
    },
    textBookList () {
      return this.User.textbook[this.Route.params.subject]
    },
    textBookIndex () {
      for (var i = 0; i < this.User.textbook[this.Route.params.subject].length; i++) {
        if (Number(this.textBookList[i].id) === Number(this.Route.query.id)) {
          return i
        }
      }
    }
  },
  data () {
    return {
      loading: true,
      tabwidth: '0px',
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
  methods: {
    ...mapActions(['getWorkbookAdd', 'workbookAddClear', 'workbookAdd', 'workbookDel']),
    _add (pindex, index, workbookId) {
      this.workbookAdd({type: 'add', pindex: pindex, index: index, workbookId: workbookId})
    },
    _del (pindex, index, workbookId) {
      this.workbookDel({type: 'add', pindex: pindex, index: index, workbookId: workbookId})
    },
    _getData () {
      this.loading = true
      this.getWorkbookAdd().then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = true
      })
    },
    show (pindex, index) {
      this.list = []
      this.list.push({
        src: `${this.workbookAddList[pindex].list[index].img.url}-workbookBig`,
        w: '700',
        h: '1050'
      })
      this.$nextTick(() => {
        this.$refs.wbpreviewer.show(0)
      })
    }
  },
  watch: {
    textbookId (val) {
      if (val) {
        this.workbookAddClear()
        this._getData()
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.workbookAddClear()
      vm.tabwidth = vm.textBookList.length * 105 + 'px' // tab的宽度
      vm.$refs.tab.scrollLeft = Number((vm.textBookIndex - 1) * 105)
      vm._getData()
    })
  }
}
</script>
