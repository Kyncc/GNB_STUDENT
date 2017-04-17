<template>
  <view-box ref="report_detail" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" 
      :left-options="{backText: reportDetail.chapter ? reportDetail.chapter.name : '知识图谱'}">
    </x-header>
    <div style="font-size:.75rem;">
      <template v-if="reportDetail.chapter">
        <div style="padding:15px;background:#fff;">
          <flexbox :gutter="0">
            <flexbox-item :span="3" style="color:#487d68">难度等级</flexbox-item>
            <flexbox-item :span="3">1</flexbox-item>
            <flexbox-item :span="3">2</flexbox-item>
            <flexbox-item :span="3">3</flexbox-item>
          </flexbox>
        </div>
        <div style="padding:0 15px 15px;background:#fff;">
          <flexbox :gutter="0">
            <flexbox-item :span="3" style="color:#487d68">题型总数</flexbox-item>
            <flexbox-item :span="3">{{reportDetail.degree_level.level1_count}}个</flexbox-item>
            <flexbox-item :span="3">{{reportDetail.degree_level.level2_count}}个</flexbox-item>
            <flexbox-item :span="3">{{reportDetail.degree_level.level3_count}}个</flexbox-item>
          </flexbox>
        </div>
        <divider>练习详情</divider>
        <div style="padding:15px;color:#487d68;background:#fff;">
          <flexbox :gutter="0">
            <flexbox-item :span="6">习题册名称</flexbox-item>
            <flexbox-item :span="3">错题数量</flexbox-item>
            <flexbox-item :span="3">记录数量</flexbox-item>
          </flexbox>
        </div>
        <template v-for="item in reportDetail.workbook" >
          <div  style="padding:0 15px 15px;background:#fff;">
            <flexbox :gutter="0">
              <flexbox-item :span="6">{{item.workbook_name}}</flexbox-item>
              <flexbox-item :span="3">{{item.error_count}}</flexbox-item>
              <flexbox-item :span="3">{{item.total_count}}</flexbox-item>
            </flexbox>
          </div>
        </template>
      </template>
    </div>
     <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading" spinner="spiral">
      <div slot="no-results" style="color:#4bb7aa;">
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
        <p style="font-size:1rem;display:inline-block;">出错了~</p>
      </div>
      <div slot="no-more"></div>
    </infinite-loading>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Flexbox, FlexboxItem, Divider} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'detail',
  components: {
    XHeader, ViewBox, Flexbox, FlexboxItem, Divider, InfiniteLoading
  },
  computed: {
    ...mapGetters(['reportDetail'])
  },
  methods: {
    ...mapActions(['getReportDetail', 'clearReportDetail']),
    _onInfinite () {
      this.getReportDetail().then(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      }).catch(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    }
  },
  activated () {
    this.clearReportDetail()
    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
  }
}
</script>
