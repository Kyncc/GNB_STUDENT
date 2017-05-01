<template>
  <div>
    <card v-for="(item, index) in list" :key="index">
      <div class="weui-panel__hd" slot="header">
        <flexbox>
          <flexbox-item :span="10" style="color:#4bb7aa">{{item.chapter_name}}</flexbox-item>
          <flexbox-item :span="2">难度: {{item.degree}}</flexbox-item>
        </flexbox>
      </div>
      <div slot="content" @click="$router.push({name:'example', params: {subjectId: '7', id: item.exercises_id}})">
        <div v-html="item.stem"></div>
        <div v-if="item.opt_jo.hasOwnProperty('A')">
          <template v-for="(value, key) in item.opt_jo">
            <div style="padding-top:5px;">{{ key }}： <p v-html="value" style="display:inline-block"></p></div>
          </template>
        </div>
      </div>
      <div slot="footer">
        <div class="weui-cell weui-cell_access weui-cell_link">
          <div class="weui-cell__bd" style="text-align:right">收藏时间: {{item.collect_time | ymd}}</div>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import {XHeader, Card, Spinner, Flexbox, FlexboxItem} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'physics',
  components: {
    XHeader, Card, Spinner, Flexbox, FlexboxItem
  },
  computed: {
    ...mapGetters(['collectPhysics']),
    list () {
      return this.collectPhysics.list
    }
  },
  methods: {
    ...mapActions(['getCollect', 'setCollectScroll']),
    _onInfinite () {
      this.getCollect().then((res) => {
        if (res.data.data.list.length < 5) {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        }
        this.$nextTick(() => {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        })
      })
    }
  },
  activated () {
    // this.$refs.infiniteLoading.isLoading = true
    this.$parent.$refs.viewBoxBody.scrollTop = this.collectPhysics.scroll
  },
  beforeRouteLeave (to, from, next) {
    this.$refs.infiniteLoading.isLoading = false
    this.setCollectScroll(this.$parent.$refs.viewBoxBody.scrollTop)
    next()
  }
}
</script>
