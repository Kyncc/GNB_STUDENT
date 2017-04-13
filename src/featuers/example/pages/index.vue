<template>
  <view-box ref="gnb_example" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '例题详情'}"></x-header>
    <template v-for="detail in Example"> 
      <card>
        <div slot="header" class="weui-panel__hd">
          题干
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
    <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading" spinner="spiral">
      <div slot="no-results" style="color:#4bb7aa;">
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
        <p style="font-size:1rem;display:inline-block;">加载题目失败~</p>
      </div>
      <div slot="no-more"></div>
    </infinite-loading>
  </view-box>
</template>

<script>
import {XHeader, Card, ViewBox} from 'vux'
import {mapActions, mapGetters} from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import modules from '../modules/store'
import store from '@/store'

store.registerModule('example', {
  ...modules
})

export default {
  name: 'example',
  components: {
    XHeader, Card, ViewBox, InfiniteLoading
  },
  computed: {
    ...mapGetters(['Example', 'Params'])
  },
  methods: {
    ...mapActions(['getExample', 'exampleClear', 'collectRemove', 'collectAdd']),
    _onInfinite () {
      this.getExample().then(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      }).catch(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    }
    // _correct(){
    //   this.$router.push(`/correct/${this.Params.subjectId}/${this.Params.id}`)
    // },
    // _collect(state){
    //   if(Number(state) != 0){
    //     //已收藏
    //     this.collectRemove();
    //   }else{
    //     //未收藏
    //     this.collectAdd();
    //   }
    // }
  },
  activated () {
    this.exampleClear()
    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
  }
}
</script>
