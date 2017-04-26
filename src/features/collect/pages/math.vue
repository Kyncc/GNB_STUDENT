<template>
  <div>
    <card v-for="(item, index) in list" :key="index">
      <div class="weui-panel__hd" slot="header">
        <flexbox>
          <flexbox-item :span="10" style="color:#4bb7aa">{{item.chapter_name}}</flexbox-item>
          <flexbox-item :span="2">难度: {{item.degree}}</flexbox-item>
        </flexbox>
      </div>
      <div slot="content" @click="$router.push({name:'example', params: {subjectId: '2', id: item.exercises_id}})">
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
    <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading">
      <div slot="no-results" style="color:#4bb7aa;">快去收藏更多题目吧~</div>
      <div slot="no-more" style="color:#4bb7aa;">已经加载全部收藏</div>
      <div slot="spinner" style="padding:.5rem 0"><spinner type="lines" slot="value"></spinner></div>
    </infinite-loading>
  </div>
</template>

<script>
import {XHeader, Card, Spinner, Flexbox, FlexboxItem} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'math',
  components: {
    XHeader, Card, Spinner, Flexbox, FlexboxItem, InfiniteLoading
  },
  computed: {
    ...mapGetters(['collectMath']),
    list () {
      return this.collectMath.list
    }
  },
  methods: {
    ...mapActions(['getCollect', 'setCollectScroll']),
    _onInfinite () {
      this.getCollect().then((res) => {
        if (res.data.data.list.length < 5) {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        }
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      })
    }
  },
  activated () {
    this.$parent.$refs.viewBoxBody.scrollTop = this.collectMath.scroll
  },
  beforeRouteLeave (to, from, next) {
    this.setCollectScroll(this.$parent.$refs.viewBoxBody.scrollTop)
    next()
  },
  deactivated () {
    this.$refs.infiniteLoading.isLoading = false
  }
}
</script>
