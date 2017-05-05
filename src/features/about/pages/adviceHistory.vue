<template>
  <view-box ref="adviceHistory" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '反馈历史'}"></x-header>
    <div v-if="!loading" class="messageSection">
      <section v-for="item in historyList">
        <h3>{{item.createTime}}</h3>
        <article>
          <h4>{{item.title}}</h4>
          <p>{{item.content}}</p>
        </article>
      </section>
    </div>
    <div style="text-align:center">
      <spinner v-if="loading" type="dots"></spinner>
      <p v-else-if="historyList.length == 0" style="font-size:16px;padding:10px 0;color:#4BB7AA">暂无反馈消息~</p>
    </div>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Spinner} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'history',
  components: {
    XHeader, ViewBox, Spinner
  },
  computed: {
    ...mapGetters(['historyList'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['adviceHistory', 'clearAdviceHistory'])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.adviceHistory().then(() => {
        vm.loading = false
      })
    })
  },
  beforeRouteLeave (to, from, next) {
    this.clearAdviceHistory()
    this.loading = true
    next()
  }
}
</script>
