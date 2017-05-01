<template>
  <div>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{showBack: true, backText: SwiperInfo.title}"></x-header>
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="50px">
      <div v-html="SwiperInfo.content" style="padding:1rem;font-size:16px;"></div>
      <div style="text-align:center">
        <spinner v-if="loading" type="dots"></spinner>
      </div>
    </view-box>
  </div>
</template>

<script>
import {XHeader, ViewBox, Spinner} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'article',
  components: {
    XHeader, ViewBox, Spinner
  },
  computed: {
    ...mapGetters(['SwiperInfo'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getSwiperInfo', 'swiperInfoClear'])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.loading = true
      vm.swiperInfoClear()
      vm.getSwiperInfo().then(() => {
        vm.loading = false
      })
    })
  }
}
</script>
