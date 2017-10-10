<template>
  <div>
    <card v-for='(detail, index) in downloadCamera.detail' :key='index'>
      <div slot="content">
        <div @click="show(detail.photo)">
          <img v-lazy="detail.photo.url+'-errorList'"/>
        </div>
      </div>
    </card>
    <div style="text-align:center;padding:20px 0;">
      <spinner v-if="loading" type="lines"></spinner>
    </div>
    <!--照片放大 -->
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
import {Group, Card, Cell, Spinner, Previewer, TransferDomDirective as TransferDom} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'chemistry',
  components: {
    Group, Card, Cell, Spinner, Previewer
  },
  computed: {
    ...mapGetters(['downloadCamera'])
  },
  data () {
    return {
      loading: false,
      list: [{
        w: 0,
        h: 0,
        src: ``
      }],
      options: {
        preload: [1, 1],
        bgOpacity: 1,
        fullscreenEl: false,
        history: true
      }
    }
  },
  directives: {
    TransferDom
  },
  methods: {
    ...mapActions(['getDownloadCameraDetail']),
    _getData () {
      this.loading = true
      this.getDownloadCameraDetail().then((res) => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    show (img) {
      this.list[0].w = img.width
      this.list[0].h = img.height
      this.list[0].src = img.url
      this.$nextTick(() => {
        this.$refs.previewer.show(0)
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'downloadCamera') {
        vm._getData()
      }
    })
  },
  beforeRouteLeave (to, from, next) {}
}
</script>
