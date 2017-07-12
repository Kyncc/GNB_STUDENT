<template>
  <div style="height:100%">
    <view-box body-padding-top="86px">
      <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" >
        <x-header :left-options="{backText: '习题册管理'}">
          <div slot="right" @click="$router.push({name: 'myBook_search', param: {subject: Route.params.subject}})">
            <i class="icon iconfont icon-iconfontsousuo" style="padding:8px;font-size:26px;margin-right:-10px;">
            </i>
          </div>
        </x-header>
        <div ref="tab" style="width: 100%;overflow:scroll;-webkit-overflow-scrolling:touch;z-index:1;">
          <tab :line-width="1" :style='"min-width:100%;width:"+tabwidth' :animate="false">
            <template v-for="(textbook, index) in textBookList">
              <tab-item :selected="Number(Route.query.id) === Number(textbook.id)"
                @click.native="$router.replace({name: 'myBook_add', query:{id: textbook.id}})">
                {{textbook.name}}
              </tab-item>
            </template>
          </tab>
        </div>
      </div>
      <div>
        <group gutter="0" v-if="!loading">
          <template v-for="(result, pindex) in myBookAddList">
            <cell v-for="(myBook, index) in result.list" :key="index">
              <img class="previewer-myBook-img" v-lazy='myBook.img.url+"?imageMogr2/auto-orient/thumbnail/60x80!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim"' @click="show(pindex,index)" slot="icon" width="60" height="80"/>
              <div slot="after-title" @click="show(pindex,index)" style="width:90%;">
                <p style="color:#aaa;font-size:14px;">&nbsp;&nbsp;&nbsp;{{myBook.year}}版</p>
                <p class="ellipsis">&nbsp;&nbsp;&nbsp;{{myBook.workbookName}}</p>
              </div>
              <div slot="default">
                <x-button v-if="!myBook.status" mini type="primary" slot="default" @click.native="_add(pindex,index,myBook.workbookId)">添加</x-button>
                <x-button v-else mini type="warn" slot="default" @click.native="_del(pindex,index,myBook.workbookId)">删除</x-button>
              </div>
            </cell>
          </template>
        </group>
        <div style="text-align:center;padding:20px 0;">
          <spinner v-if="loading" type="dots"></spinner>
          <p v-else-if="myBookAddList.length === 0" style="font-size:16px;color:#4BB7AA;">没有更多的习题册了~</p>
        </div>
      </div>
    </view-box>
    <previewer :list="list" ref="wbpreviewer" :options="options"></previewer>
  </div>
</template>

<script>
import {XHeader, Group, Cell, Tab, TabItem, XButton, ViewBox, Previewer, Spinner} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'myBookAdd',
  components: {
    XHeader, Group, Cell, Tab, TabItem, XButton, ViewBox, Previewer, Spinner
  },
  computed: {
    ...mapGetters(['User', 'myBookAddList', 'Route']),
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
    ...mapActions(['getMyBookAdd', 'myBookAddClear', 'myBookAdd', 'myBookDel']),
    _add (pindex, index, workbookId) {
      this.myBookAdd({type: 'add', pindex: pindex, index: index, workbookId: workbookId})
    },
    _del (pindex, index, workbookId) {
      this.myBookDel({type: 'add', pindex: pindex, index: index, workbookId: workbookId})
    },
    _getData () {
      this.loading = true
      this.getMyBookAdd().then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = true
      })
    },
    show (pindex, index) {
      this.list = []
      this.list.push({
        src: `${this.myBookAddList[pindex].list[index].img.url}-workbookBig`,
        w: '700',
        h: '1050'
      })
      this.$nextTick(() => {
        this.$refs.wbpreviewer.show()
      })
    }
  },
  watch: {
    textbookId (val) {
      if (val) {
        this.myBookAddClear()
        this._getData()
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.myBookAddClear()
      vm.tabwidth = vm.textBookList.length * 70 + 'px' // tab的宽度
      vm.$refs.tab.scrollLeft = Number((vm.textBookIndex - 1) * 70)
      vm._getData()
    })
  }
}
</script>
