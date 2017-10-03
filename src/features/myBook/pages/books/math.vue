<template>
  <div>
    <template v-for="(textbook, pindex) in myBookMath.list.textbook" v-if="!loading">
      <group :title="textbook.textbookName">
        <cell v-for="(myBook, index) in textbook.list" :key="index">
          <img v-lazy='myBook.img.url+"?imageMogr2/auto-orient/thumbnail/120x160!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim"' slot="icon" width="60" height="80"/>
          <div slot="after-title" style="width:90%;">
            <p style="color:#4cc0be;font-size:14px;">&nbsp;&nbsp;&nbsp;{{myBook.year}}版</p>
            <p class="ellipsis" style="font-size:.9rem;padding:.2rem 0">&nbsp;&nbsp;{{myBook.workbookName}}</p>
            <template v-if='myBook.version'>
              <p v-for="(tag, index) in myBook.version.split(',')" :key='index' style="color:#aaa;font-size:14px;">
                &nbsp;&nbsp;&nbsp;{{tag}}
              </p>
            </template>
          </div>
        </cell>
      </group>
    </template>
    <div style="text-align:center;padding:20px 0;">
      <spinner v-if="loading" type="ripple"></spinner>
      <p v-else-if="myBookMath.list.textbook.length === 0" style="font-size:16px;color:#4cc0be;"
       @click="$router.push({name: 'myBook_add', params: {subject: 'math'}, query: {id: User.textbook.math[0].id}})">点我添加数学习题册</p>
    </div>
  </div>
</template>

<script>
import {Group, Cell, Spinner} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'math',
  components: {
    Group, Cell, Spinner
  },
  computed: {
    ...mapGetters(['User', 'myBookMath'])
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
      this.getMyBook({subject: 'math', subjectId: 2}).then(() => {
        this.loading = false
      })
    }
  },
  activated () {
    this.$parent.$refs.viewBoxBody.scrollTop = this.myBookMath.scroll
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'myBook_add') {
        vm.myBookClear({subject: 'math'})
        vm._getData()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setMyBookScroll({subject: 'math', height: this.$parent.$refs.viewBoxBody.scrollTop})
    next()
  },
  mounted () {
    this._getData()
  }
}
</script>
