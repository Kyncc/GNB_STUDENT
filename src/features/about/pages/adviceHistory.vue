<template>
  <view-box ref="adviceHistory" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '反馈历史'}"></x-header>
    <div class="messageSection">
      <section v-for="item in historyList">
        <h3>{{item.createTime}}</h3>
        <article>
          <h4>{{item.title}}</h4>
          <p>{{item.content}}</p>
        </article>
      </section>
    </div>
    <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading">
      <div slot="no-results" style="color:#4bb7aa;">暂无通知~</div>
      <div slot="spinner" style="padding:.5rem 0"><spinner type="dots" slot="value"></spinner></div>
      <div slot="no-more"></div>
    </infinite-loading>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Spinner} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'history',
  components: {
    XHeader, ViewBox, InfiniteLoading, Spinner
  },
  computed: {
    ...mapGetters(['historyList'])
  },
  methods: {
    ...mapActions(['adviceHistory', 'clearAdviceHistory']),
    _onInfinite () {
      this.adviceHistory().then(() => {
        if (this.historyList.length !== 0) this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    }
  },
  activated () {
    this.clearAdviceHistory()
    this.$nextTick(() => {
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
    })
  }
}
</script>
