<template>
  <div>
    <template v-for="(textbook, pindex) in myBookPhysics.list.textbook" v-if="!loading">
      <group :title="textbook.textbookName">
        <cell v-for="(myBook, index) in textbook.list" :key="index">
          <img v-lazy='myBook.img.url+"?imageMogr2/auto-orient/thumbnail/90x120!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim"' slot="icon" width="60" height="80"/>
          <div slot="after-title" style="width:90%;">
            <p style="color:#aaa;font-size:14px;">&nbsp;&nbsp;&nbsp;{{myBook.year}}版</p>
            <p class="ellipsis">&nbsp;&nbsp;&nbsp;{{myBook.workbookName}}</p>
          </div>
        </cell>
      </group>
    </template>
    <div style="text-align:center;padding:20px 0;">
      <spinner v-if="loading" type="ripple"></spinner>
      <p v-else-if="myBookPhysics.list.textbook.length === 0" style="font-size:16px;color:#4BB7AA;"
      @click="$router.push({name: 'myBook_add', params: {subject: 'physics'}, query: {id: User.textbook.physics[0].id}})"
      >点我添加物理习题册</p>
    </div>
  </div>
</template>

<script>
import {Group, Cell, Spinner} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'physics',
  components: {
    Group, Cell, Spinner
  },
  computed: {
    ...mapGetters(['User', 'myBookPhysics'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getMyBook', 'myBookClear', 'setMyBookScroll']),
    _getData () {
      this.loading = true
      this.getMyBook().then(() => {
        this.loading = false
      })
    }
  },
  activated () {
    this.$parent.$refs.viewBoxBody.scrollTop = this.myBookPhysics.scroll
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'myBook_add') {
        vm.myBookClear()
        vm._getData()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setMyBookScroll(this.$parent.$refs.viewBoxBody.scrollTop)
    next()
  },
  mounted () {
    this._getData()
  }
}
</script>
