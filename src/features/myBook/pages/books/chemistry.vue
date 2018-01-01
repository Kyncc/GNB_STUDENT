<template>
  <div>
     <div v-if="!loading">
        <group v-for="(textbook, pindex) in myBookChemistry.list.textbook" :title="textbook.textbookName" :key='pindex'>
          <cell v-for="(myBook, index) in textbook.list" :key="index">
            <img v-lazy='myBook.img.url+"?imageMogr2/auto-orient/thumbnail/120x160!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim"' slot="icon" width="60" height="80"/>
            <div slot="after-title" style="width:90%;">
              <p style="color:#4cc0be;font-size:14px;">&nbsp;&nbsp;&nbsp;{{myBook.year}}版</p>
              <p class="ellipsis" style="font-size:.9rem;">&nbsp;&nbsp;{{myBook.workbookName}}</p>
              <template v-if='myBook.version'>
                <p v-for="(tag, index) in myBook.version.split(',')" :key='index' style="color:#aaa;font-size:14px;">
                  &nbsp;&nbsp;&nbsp;{{tag}}
                </p>
              </template>
            </div>
          </cell>
        </group>
      </div>
    <div style="text-align:center;padding:20px 0;">
      <spinner v-if="loading" type="ripple"></spinner>
      <p v-else-if="myBookChemistry.list.textbook.length === 0" style="font-size:16px;color:#4cc0be;"
      @click="$router.push({name: 'myBook_add', params: {subject: 'chemistry'}, query: {id: User.textbook.chemistry[0].id}})"
      >点我添加化学习题册</p>
    </div>
  </div>
</template>

<script>
import {Group, Cell, Spinner} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'chemistry',
  components: {
    Group, Cell, Spinner
  },
  computed: {
    ...mapGetters(['User', 'myBookChemistry'])
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
      this.getMyBook({subject: 'chemistry', subjectId: 8}).then(() => {
        this.loading = false
      })
    }
  },
  activated () {
    this.$parent.$refs.viewBoxBody.scrollTop = this.myBookChemistry.scroll
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'myBook_add') {
        vm.myBookClear({subject: 'chemistry'})
        vm._getData()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setMyBookScroll({subject: 'chemistry', height: this.$parent.$refs.viewBoxBody.scrollTop})
    next()
  },
  mounted () {
    this._getData()
  }
}
</script>
