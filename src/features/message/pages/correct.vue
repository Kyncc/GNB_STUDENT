<template>
  <view-box ref="messageCorrect" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '纠错通知'}"></x-header>
    <div v-if="!loading" class="messageSection">
      <section v-for="item in messageCorrectList" >
        <h3>{{item.time | ymd}}</h3>
        <article>{{item.content}}</article>
      </section>
    </div>
    <div style="text-align:center">
      <spinner v-if="loading" type="dots"></spinner>
      <p v-else-if="messageCorrectList.length == 0" style="font-size:16px;padding:10px 0;color:#4BB7AA">暂无纠错消息~</p>
    </div>
  </view-box>
</template>
<script>
import {XHeader, ViewBox, Spinner} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'correct',
  components: {
    XHeader, ViewBox, Spinner
  },
  computed: {
    ...mapGetters(['messageCorrectList'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getMessageCorrect', 'clearMessage'])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getMessageCorrect().then(() => {
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
