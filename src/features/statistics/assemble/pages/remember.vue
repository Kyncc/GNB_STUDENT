<template>
  <div>
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: this.$route.params.name}">
        <!-- <div slot="right">
          <i class="icon iconfont icon-filter" style="padding:10px;margin:0 -10px 0 0" @click="$router.push({name:'statisticsRemember_options'})">
          </i>
        </div> -->
      </x-header>
    </div>
    <card v-for='(error, index) in AssembleRemember.index.list' :key='index'>
      <div class="weui-panel__hd" slot="header">
        <flexbox>
          <flexbox-item :span="8" style='color:#4cc0be'>{{error.workbookName}}</flexbox-item>
          <flexbox-item :span="4" style="text-align:right">{{error.time | ymd}}</flexbox-item>
        </flexbox>
      </div>
      <div slot="content">
        <div @click="show(error.photo)">
          <img v-lazy="error.photo.url+'-errorList'"/>
        </div>
      </div>
      <div slot="footer">
        <div class="weui-cell">
          <flexbox class="weui-cell__bd">
            <flexbox-item :span="4" >
              <x-button mini type="primary" plain v-if='error.errorComment.length'>
                {{error.errorComment}}
              </x-button>
            </flexbox-item>
            <flexbox-item :span="4">
              <x-button mini type="primary" plain @click.native="$router.push({name: 'error_comment', params: {wbeid: error.id}})" v-if='error.comment'>查看点评</x-button>
            </flexbox-item>
            <flexbox-item :span="4" style='text-align:right;'
              @click.native="setStatisticsRememberAssembleUpdate({id: error.id, index: index})">
              <i v-if='error.isAssembly' class="icon iconfont icon-correct" style="color:#4cc0be;margin-right:1rem;"></i>
              <i v-else class="icon iconfont icon-icon073102" style="color:#4cc0be;margin-right:1rem;" ></i>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
    </card>
    <div style="text-align:center;padding:20px 0;">
      <spinner v-if="loading" type="lines"></spinner>
      <div>
        <p style="font-size:16px;color:#4cc0be" v-if="loadingNoData">已经加载全部错题~</p>
        <p style="font-size:16px;color:#4cc0be" v-if="!loadingNoData && !loading" @click="_getData">点我加载更多</p>
      </div>
    </div>
    <!--照片放大 -->
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
    <!--组卷个数 -->
    <div class='assembleCount'
      @click="$router.push({name: 'statisticsRemember_assemble', params: {subject: $route.params.subject}})">
      已选<br/>{{AssembleRemember.count}}
    </div>
  </div>
</template>

<script>
import {XHeader, Group, Card, Cell, Spinner, Flexbox, FlexboxItem, XButton, Previewer, TransferDomDirective as TransferDom} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'remember',
  components: {
    XHeader, Group, Card, Cell, Spinner, Flexbox, FlexboxItem, XButton, Previewer
  },
  computed: {
    ...mapGetters(['AssembleRemember'])
  },
  data () {
    return {
      loading: false,
      loadingNoData: false,
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
    ...mapActions(['getStatisticsRemember', 'setStatisticsRememberAssembleUpdate', 'setStatisticsScroll']),
    _getData () {
      this.loading = true
      this.getStatisticsRemember().then((res) => {
        if (!res.data.data.offset) {
          this.loadingNoData = true
        }
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
      if (vm.AssembleRemember.index.reset) {
        vm._getData()
      }
      vm.$parent.$refs.viewBoxBody.scrollTop = vm.AssembleRemember.index.scroll
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setStatisticsScroll({type: 'remember', height: this.$parent.$refs.viewBoxBody.scrollTop})
    next()
  }
}
</script>
<style scoped>
.weui-btn + .weui-btn{
  margin-top:0;
}
.assembleCount{
  position: fixed;
  background:#4cc0be;
  color:#fff;
  font-size: .9rem;
  height: 3.5rem;
  width: 3.5rem;
  box-shadow: 2px 2px 7px #4cc0be;
  box-sizing: border-box;
  padding:.5rem .75rem;
  border-radius: 50%;
  bottom: 10%;
  right: 5%;
  text-align: center;
}
</style>
