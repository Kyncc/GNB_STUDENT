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
    <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading" spinner="spiral">
      <span slot="no-results" style="color:#4bb7aa;">
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
        <p style="font-size:1rem;display:inline-block;">暂无通知~</p>
      </span>
      <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
    </infinite-loading>
  </view-box>
</template>

<script>
import {XHeader, XInput, Group, Cell, ViewBox} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'history',
  components: {
    XHeader, XInput, Group, Cell, ViewBox, InfiniteLoading
  },
  activated () {
    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
  },
  methods: {
    ...mapActions(['adviceHistory']),
    _onInfinite () {
      this.adviceHistory()
      .then(() => {
        if (this.historyList.length !== 0) this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    }
  },
  computed: {
    ...mapGetters(['historyList'])
  }
}
</script>

<style lang="less" scroped>

</style>
