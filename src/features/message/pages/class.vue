<template>
  <view-box ref="messageClass" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '班级通知'}"></x-header>
    <div class="messageSection">
      <section v-for="item in messageClassList">
        <h3>{{item.time | ymd}}</h3>
        <article>
          {{item.content}}
        </article>
      </section>
      <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading" spinner="spiral">
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
  name: 'class',
  components: {
    XHeader, ViewBox, Spinner, InfiniteLoading
  },
  activated () {
    this.clearMessage()
    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
  },
  methods: {
    ...mapActions(['getMessageClass', 'clearMessage']),
    _onInfinite () {
      this.getMessageClass().then(() => {
        if (this.messageClassList.length !== 0) this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    }
  },
  computed: {
    ...mapGetters(['messageClassList'])
  }
}
</script>
