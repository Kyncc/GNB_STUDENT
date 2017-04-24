<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '例题详情'}">
      <div slot="right">
        <i v-for="detail in Example" class="icon iconfont icon-collect1" :class="(detail.collectTime ? 'icon-collect' : 'icon-collect1')" @click.native="_collect"></i>
        <i class="icon iconfont icon-bianji" style="padding:10px;margin:0 -10px 0 0"
          @click="$router.push({name:'correct', params:{subjectId: Params.subjectId, id: Params.id}})">
        </i>
      </div>
    </x-header>
    <template v-for="detail in Example"> 
      <card>
        <div slot="header" class="weui-panel__hd">
          <flexbox><flexbox-item :span="2" style="color:#4bb7aa">题干</flexbox-item></flexbox>
        </div>
        <div slot="content">
          <div v-html="detail.content"></div>
          <template v-if="detail.type === '1'">
            <div style="padding-top:5px;" v-for="(value, key) in detail.tabs" >
              {{ key }}： <p v-html="value" style="display:inline-block"></p>
            </div>
          </template> 
        </div>
      </card>
      <card>
        <div slot="header" class="weui-panel__hd" style="color:#4bb7aa">解析</div>
        <div slot="content" v-html="detail.answer"></div>
      </card>
    </template>
    <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading">
      <div slot="no-results" style="color:#4bb7aa;">加载题目失败~</div>
      <div slot="no-more"></div>
      <div slot="spinner" style="padding:.5rem 0"><spinner type="ripple" slot="value"></spinner></div>
    </infinite-loading>
  </view-box>
</template>

<script>
import {XHeader, Card, ViewBox, Spinner, Flexbox, FlexboxItem} from 'vux'
import {mapActions, mapGetters} from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'example',
  components: {
    XHeader, Card, ViewBox, Spinner, InfiniteLoading, Flexbox, FlexboxItem
  },
  computed: {
    ...mapGetters(['Example', 'Params'])
  },
  methods: {
    ...mapActions(['getExample', 'exampleClear', 'collectRemove', 'collectAdd']),
    _onInfinite () {
      this.getExample().then(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$nextTick(() => { this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete') })
      }).catch(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    },
    _collect (state) {
      Number(state) === 0 ? this.collectAdd() : this.collectRemove()
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name !== 'correct') {
      next(vm => {
        vm.exampleClear()
      })
    } else {
      next()
    }
  }
}
</script>
<style lang="less" scoped>
.icon-collect1,.icon-collect{
  font-size:24px;
}
.icon-bianji{
  font-size:24px;
}
</style>
