<template>
  <div>
    <div v-if="!loading">
      <group v-for="(textbook, pindex) in workbookMath.list.textbook" :title="textbook.textbookName" :key='pindex'>
        <cell v-for="(workbook, index) in textbook.list" :key="index" is-link
          @click.native="$router.push({ name: 'workbook_chapter', params: {'id': workbook.workbookId ,'name': workbook.workbookName}})">
          <img v-lazy='workbook.img.url+"?imageMogr2/auto-orient/thumbnail/120x160!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim"' slot="icon" width="60" height="80"/>
          <div slot="after-title" style="width:90%;">
            <p style="color:#4cc0be;font-size:14px;">&nbsp;&nbsp;&nbsp;{{workbook.year}}版</p>
            <p class="ellipsis" style="font-size:.9rem;">&nbsp;&nbsp;{{workbook.workbookName}}</p>
            <template v-if='workbook.version'>
              <p v-for="(tag, index) in workbook.version.split(',')" :key='index' style="color:#aaa;font-size:14px;">
                &nbsp;&nbsp;&nbsp;{{tag}}
              </p>
            </template>
          </div>
          <div class="badge-value">
            <badge v-if='workbookMath.list.isRead'></badge>
          </div>
        </cell>
      </group>
    </div>
    <div style="text-align:center;padding:20px 0;">
      <spinner v-if="loading" type="ripple"></spinner>
      <p v-else-if="workbookMath.list.textbook.length === 0" style="font-size:16px;color:#4cc0be;"
       @click="$router.push({name: 'workbook_add', params: {subject: 'math'}, query: {id: User.textbook.math[0].id}})"
      >点我添加数学习题册</p>
    </div>
    <!--下载错题 -->
    <div v-transfer-dom>
      <tabbar>
        <tabbar-item style='line-height:42px;height:42px;' v-if="$route.name === 'workbook_math'">
          <div slot="label" style='line-height:42px;height:42px;'>
            <x-button @click.native="$router.push({name: 'camera_chapter_math'})" style='border-radius:0;'>拍错题</x-button>
          </div>
        </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
import {XButton, Tabbar, TabbarItem, Badge, Group, Cell, Spinner, TransferDomDirective as TransferDom} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'math',
  components: {
    XButton, Tabbar, TabbarItem, Badge, Group, Cell, Spinner
  },
  directives: {
    TransferDom
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
      this.getWorkbook({subject: 'math', subjectId: 2}).then(() => {
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'workbook_add') {
        vm.workbookClear({subject: 'math'})
      }
      vm._getData()
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setWorkbookScroll({subject: 'math', height: this.$parent.$refs.viewBoxBody.scrollTop})
    next()
  }
}
</script>
<style lang="less">
.badge-value {
  display: inline-block!important;
}
.vertical-middle {
  vertical-align: middle;
}
</style>