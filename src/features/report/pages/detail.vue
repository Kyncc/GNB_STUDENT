<template>
  <view-box ref="report_detail" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" 
      :left-options="{backText: reportDetail.chapter ? reportDetail.chapter.name : '知识图谱'}">
    </x-header>
    <div style="font-size:.75rem;">
      <template v-if="reportDetail.chapter">
        <div style="padding:15px;background:#fff;">
          <flexbox :gutter="0">
            <flexbox-item :span="3" style="color:#487d68">难度等级</flexbox-item>
            <flexbox-item :span="3"><p style="text-align:center">1</p></flexbox-item>
            <flexbox-item :span="3"><p style="text-align:center">2</p></flexbox-item>
            <flexbox-item :span="3"><p style="text-align:center">3</p></flexbox-item>
          </flexbox>
        </div>
        <div style="padding:0 15px 15px;background:#fff;">
          <flexbox :gutter="0">
            <flexbox-item :span="3" style="color:#487d68">题型总数</flexbox-item>
            <flexbox-item :span="3"><p style="text-align:center">{{reportDetail.degree_level.level1_count}}个</p></flexbox-item>
            <flexbox-item :span="3"><p style="text-align:center">{{reportDetail.degree_level.level2_count}}个</p></flexbox-item>
            <flexbox-item :span="3"><p style="text-align:center">{{reportDetail.degree_level.level3_count}}个</p></flexbox-item>
          </flexbox>
        </div>
        <div style="padding:15px;color:#487d68;background:#fff;margin-top:10px;">
          <flexbox :gutter="0">
            <flexbox-item :span="6">习题册名称</flexbox-item>
            <flexbox-item :span="3"><p style="text-align:center">错题数量</p></flexbox-item>
            <flexbox-item :span="3"><p style="text-align:center">记录数量</p></flexbox-item>
          </flexbox>
        </div>
        <template v-for="item in reportDetail.workbook" >
          <div  style="padding:0 15px 15px;background:#fff;">
            <flexbox :gutter="0">
              <flexbox-item :span="6">{{item.workbook_name}}</flexbox-item>
              <flexbox-item :span="3"><p style="text-align:center">{{item.error_count}}</p></flexbox-item>
              <flexbox-item :span="3"><p style="text-align:center">{{item.total_count}}</p></flexbox-item>
            </flexbox>
          </div>
        </template>
      </template>
      <div style="text-align:center">
        <spinner v-if="loading" type="dots"></spinner>
      </div>
    </div>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Flexbox, FlexboxItem, Divider, Spinner} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'detail',
  components: {
    XHeader, ViewBox, Flexbox, FlexboxItem, Divider, Spinner
  },
  computed: {
    ...mapGetters(['reportDetail'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getReportDetail', 'clearReportDetail'])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getReportDetail().then(() => {
        vm.loading = false
      })
    })
  },
  beforeRouteLeave (to, from, next) {
    this.clearReportDetail()
    this.loading = true
    next()
  }
}
</script>
