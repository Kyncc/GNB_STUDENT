<template>
  <div style="height:100%">
    <view-box body-padding-top="86px">
      <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" >
        <x-header :left-options="{backText: '添加习题册'}">
          <div slot="right">
            <i class="icon iconfont icon-iconfontsousuo" style="padding:8px;font-size:26px;margin-right:-10px;" 
              @click="$router.push({name: 'workbook_search', param: {subject: Route.params.subject}})">
            </i>
          </div>
        </x-header>
        <div ref="tab" style="width: 100%;overflow:scroll;-webkit-overflow-scrolling:touch;z-index:100;">
          <tab :line-width="1" :style='"width:"+tabwidth'>
            <template v-for="(textbook, index) in textBookList">
              <tab-item :selected="Number(Route.query.id) === Number(textbook.id)" 
                @click.native="$router.replace({name: 'workbook_add', query:{id: textbook.id}})">
                {{textbook.name}}
              </tab-item>
            </template> 
          </tab>
        </div>
      </div>
      <div>
        <group gutter="0" v-if="workbookAddList.length">
          <template v-for="(result, pindex) in workbookAddList">
            <cell v-for="(workbook, index) in result.list" :key="index">
              <img class="previewer-workbook-img" v-lazy='workbook.img.url+"?imageMogr2/auto-orient/thumbnail/60x80!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim"' @click="show(pindex,index)" slot="icon" width="60" height="80"/>
              <p slot="after-title" class="ellipsis" @click="show(pindex,index)" style="width:90%;height:1rem;">&nbsp;&nbsp;&nbsp;{{workbook.workbookName}}</p>
              <div slot="default">
                <x-button v-if="!workbook.status" mini type="primary" slot="default" @click.native="_add(pindex,index)">添加</x-button>
                <x-button v-else mini type="warn" slot="default" @click.native="_del(pindex,index)">删除</x-button>
              </div>
            </cell>
          </template>
        </group>
        <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading">
          <div slot="no-results"></div>
          <div slot="spinner" style="padding:.5rem 0"><spinner type="dots" slot="value"></spinner></div>
          <div slot="no-more" style="color:#4bb7aa;">没有更多的习题册了~</div>
        </infinite-loading>
      </div>
    </view-box>
    <previewer :list="list" ref="wbpreviewer" :options="options"></previewer>
  </div>
</template>

<script>
import {XHeader, Group, Cell, Tab, TabItem, XButton, ViewBox, Previewer, Spinner, TransferDomDirective as TransferDom} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'workbookAdd',
  components: {
    XHeader, Group, Cell, Tab, TabItem, XButton, ViewBox, Previewer, Spinner, InfiniteLoading
  },
  computed: {
    ...mapGetters(['User', 'workbookAddList', 'Route']),
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
      textbookId: '',
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
  directives: {
    TransferDom
  },
  methods: {
    ...mapActions(['getWorkbookAdd', 'workbookAddClear', 'workbookAdd', 'workbookDel']),
    _add (pindex, index) {
      this.workbookAdd({type: 'add', pindex: pindex, index: index})
    },
    _del (pindex, index) {
      this.workbookDel({type: 'add', pindex: pindex, index: index})
    },
    _onInfinite () {
      this.getWorkbookAdd().then(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
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
        this.$refs.wbpreviewer.show()
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.workbookAddClear()
      vm.tabwidth = vm.textBookList.length * 70 + 'px'  // tab的宽度
      vm.$refs.tab.scrollLeft = Number((vm.textBookIndex - 1) * 70)
      vm.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
    })
  },
  beforeRouteUpdate (to, from, next) {
    // 刷新ID的重置
    this.workbookAddClear()
    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
    next()
  }
}
</script>
