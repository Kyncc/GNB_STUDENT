<template>
  <view-box ref="messageSystem" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '系统通知'}"></x-header>
    <div v-if="!loading" class="messageSection">
      <section v-for="item in messageSystemList">
        <h3>{{item.time | ymd}}</h3>
        <article>{{item.content}}</article>
      </section>
    </div>
    <div style="text-align:center">
      <spinner v-if="loading" type="dots"></spinner>
      <p v-else-if="messageSystemList.length == 0" style="font-size:16px;padding:10px 0;color:#4BB7AA">暂无纠错消息~</p>
    </div>
  </view-box>
</template>
<script>
import {XHeader, ViewBox, Spinner} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'system',
  components: {
    XHeader, ViewBox, Spinner
  },
  computed: {
    ...mapGetters(['messageSystemList'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getMessageSystem', 'clearMessage'])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getMessageSystem().then(() => {
        vm.loading = false
      })
    })
  },
  beforeRouteLeave (to, from, next) {
    this.clearMessage()
    this.loading = true
    next()
  }
}
</script>
