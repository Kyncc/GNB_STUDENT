<template>
  <view-box ref="messageSystem" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '系统通知'}"></x-header>
    <div class="messageSection">
      <section v-for="item in messageSystemList">
        <h3>{{item.time | ymd}}</h3>
        <article>
          {{item.content}}
        </article>
      </section>
      <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading">
        <div slot="no-results" style="color:#4bb7aa;">暂无通知~</div>
        <div slot="spinner" style="padding:.5rem 0"><spinner type="dots" slot="value"></spinner></div>
        <div slot="no-more"></div>
      </infinite-loading>
    </div>
  </view-box>
</template>
<script>
import {XHeader, ViewBox, Spinner} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'system',
  components: {
    XHeader, ViewBox, Spinner, InfiniteLoading
  },
  activated () {
    this.clearMessage()
    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
  },
  methods: {
    ...mapActions(['getMessageSystem', 'clearMessage']),
    _onInfinite () {
      this.getMessageSystem().then(() => {
        if (this.messageSystemList.length !== 0) this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    }
  },
  computed: {
    ...mapGetters(['messageSystemList'])
  }
}
</script>
