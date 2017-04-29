<template>
  <div>
    <template v-for="(textbook, pindex) in workbookMath.list.textbook" v-if="!loading">
      <group :title="textbook.textbookName">
        <cell v-for="(workbook, index) in textbook.list" :key="index" is-link
          @click.native="$router.push({ name: 'workbook_chapter', params: {'id': workbook.workbookId ,'name': workbook.workbookName}})">
          <img v-lazy='workbook.img.url+"?imageMogr2/auto-orient/thumbnail/90x120!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim"' slot="icon" width="60" height="80"/>
          <p slot="after-title" class="ellipsis" style="width:90%;">&nbsp;&nbsp;&nbsp;{{workbook.workbookName}}</p>
        </cell>
      </group>
    </template>
    <div style="text-align:center;padding:10px 0;">
      <spinner v-if="loading" type="ripple"></spinner>
      <p v-else-if="workbookMath.list.textbook.length === 0">您还未添加数学习题册</p>
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
    ...mapGetters(['User', 'workbookMath'])
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
      this.getWorkbook().then(() => {
        this.loading = false
      })
    }
  },
  activated () {
    this.$parent.$refs.viewBoxBody.scrollTop = this.workbookMath.scroll
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'workbook_add') {
        vm.workbookClear()
        vm._getData()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setWorkbookScroll(this.$parent.$refs.viewBoxBody.scrollTop)
    next()
  },
  mounted () {
    this._getData()
  }

}
</script>
