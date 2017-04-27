<template>
  <div class="reportMath">
    <group gutter="0" class="gnb_collapse" v-if="!loading">
      <template v-for="list in reportMath.chapter">
        <cell :title="list.name" is-link
        :border-intent="false"
        :arrow-direction="list.checked ? 'up' : 'down'"
        @click.native="list.checked = !list.checked"></cell>
        <div class="slide" :class="list.checked ? 'animate':''">
          <template v-for="chapter in list.sub_chapter_list">
            <cell-box @click.native="$router.push({name: 'report_detail', params: {'chapterId': chapter.chapter_id}})">
              {{chapter.name}}
            </cell-box>
          </template>
        </div>
      </template>
    </group>
    <div style="text-align:center">
      <spinner v-if="loading" type="ripple"></spinner>
    </div>
  </div>
</template>

<script>
import {ViewBox, Cell, CellBox, Group, Spinner} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'math',
  components: {
    ViewBox, Cell, CellBox, Group, Spinner
  },
  computed: {
    ...mapGetters(['User', 'reportMath'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getReport', 'setReportScoll'])
  },
  activated () {
    this.$parent.$refs.viewBoxBody.scrollTop = this.reportMath.scroll
  },
  beforeRouteLeave (to, from, next) {
    this.setReportScoll(this.$parent.$refs.viewBoxBody.scrollTop)
    this.$parent.$refs.viewBoxBody.scrollTop = 0
    next()
  },
  mounted () {
    this.getReport().then(() => {
      this.loading = false
    })
  }
}
</script>
<style lang="less" scoped>
.animate{
  transition: max-height 0s cubic-bezier(0, 1, 0, 1) 0s !important; 
}
.slide{
  transition: max-height 0s cubic-bezier(0, 1, 0, 1) 0s !important;
}
</style>
