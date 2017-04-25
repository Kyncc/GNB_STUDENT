<template>
  <div>
    <selectBook :list="textList" @on-change="_currentTextbook"></selectBook>
    <div style="padding:10px">
      <flexbox wrap="wrap" align="baseline" :gutter="0">
        <template v-for="(workbook, pindex) in workbookPhysics"> 
          <flexbox-item :span="4" v-for="(book, index) in workbook.list" :key="index" 
            @click.native="$router.push({ name: 'workbook_chapter', params: {'id': book.workbookId ,'name': book.workbookName}})" 
            style="text-align:center;margin-bottom:.75rem;">
            <img v-lazy="book.img.url+'-workbook3small'" style="background-repeat:no-repeat"/>
          </flexbox-item>
        </template>
        <flexbox-item v-if="!loading" :span="4" @click.native="$router.push({ path: `/workbook/physics/add?id=${textbook_id}`})">
          <div style="border:1px solid #ccc;height:133px;width:95px;text-align:center">
            <i class="icon iconfont icon-plus" style="font-size:44px;margin:0 auto;top:20px;color:#bbb;"></i>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading" spinner="spiral">
      <div slot="no-results" style="color:#4bb7aa;">出错了~</div>
      <div slot="spinner" style="padding:.5rem 0"><spinner type="ripple" slot="value"></spinner></div>
      <div slot="no-more"></div>
    </infinite-loading>
  </div>
</template>

<script>
import {Flexbox, FlexboxItem, Spinner} from 'vux'
import {mapActions, mapGetters} from 'vuex'
import selectBook from '@/components/gnb_selectbook'
import InfiniteLoading from 'vue-infinite-loading'
// https://placeholdit.imgix.net/~text?txtsize=30&bg=999999&txtclr=ffffff&txt=%2B&w=65&h=80
export default {
  name: 'physics',
  components: {
    Flexbox, FlexboxItem, InfiniteLoading, selectBook, Spinner
  },
  computed: {
    ...mapGetters(['User', 'workbookPhysics']),
    textList () {
      return this.User.textbook.physics
    }
  },
  data () {
    return {
      textbook_id: '',
      loading: true
    }
  },
  methods: {
    ...mapActions(['getWorkbook', 'workbookClear']),
    _onInfinite () {
      this.loading = true
      this.getWorkbook({
        'textbook_id': this.textbook_id
      }).then(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        this.loading = false
      })
    },
    _currentTextbook (val) {
      this.textbook_id = val
      this.workbookClear()
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.textbook_id = vm.User.textbook.physics[0].id
    })
  }
}
</script>
