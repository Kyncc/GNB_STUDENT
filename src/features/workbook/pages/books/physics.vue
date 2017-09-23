<template>
  <div>
    <div v-if="!loading">
      <group v-for="(textbook, pindex) in workbookPhysics.list.textbook" :title="textbook.textbookName" :key='pindex'>
        <cell v-for="(workbook, index) in textbook.list" :key="index" is-link
          @click.native="$router.push({ name: 'workbook_chapter', params: {'id': workbook.workbookId ,'name': workbook.workbookName}})">
          <img v-lazy='workbook.img.url+"?imageMogr2/auto-orient/thumbnail/120x160!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim"' slot="icon" width="60" height="80"/>
          <div slot="after-title" style="width:90%;">
            <p style="color:#4cc0be;font-size:14px;">&nbsp;&nbsp;&nbsp;{{workbook.year}}版</p>
            <p class="ellipsis" style="font-size:.9rem;padding:.2rem 0">&nbsp;&nbsp;{{workbook.workbookName}}</p>
            <template v-if='workbook.version'>
              <p v-for="(tag, index) in workbook.version.split(',')" :key='index' style="color:#aaa;font-size:14px;">
                &nbsp;&nbsp;&nbsp;{{tag}}
              </p>
            </template>
          </div>
        </cell>
      </group>
    </div>
    <div style="text-align:center;padding:20px 0;">
      <spinner v-if="loading" type="ripple"></spinner>
      <p v-else-if="workbookPhysics.list.textbook.length === 0" style="font-size:16px;color:#4cc0be;"
      @click="$router.push({name: 'workbook_add', params: {subject: 'physics'}, query: {id: User.textbook.physics[0].id}})"
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
    ...mapGetters(['User', 'workbookPhysics'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getWorkbook', 'workbookClear', 'setWorkbookScroll']),
    _getData () {
      this.loading = true
      this.getWorkbook({subject: 'physics', subjectId: 7}).then(() => {
        this.loading = false
      })
    }
  },
  activated () {
    this.$parent.$refs.viewBoxBody.scrollTop = this.workbookPhysics.scroll
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'workbook_add') {
        vm.workbookClear({subject: 'physics'})
        vm._getData()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setWorkbookScroll({subject: 'physics', height: this.$parent.$refs.viewBoxBody.scrollTop})
    next()
  },
  mounted () {
    this._getData()
  }
}
</script>
