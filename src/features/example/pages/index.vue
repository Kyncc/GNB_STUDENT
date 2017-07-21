<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '例题详情'}">
      <div slot="right">
        <i v-for="detail in Example.detail" class="icon iconfont icon-collect1" style="top:1px;" :style="(detail.collectTime.toString() !== '0' ? 'color:#FBC34B' : 'color:#FFF')" @click="_collect(detail.collectTime)"></i>
        <i class="icon iconfont icon-bianji" style="padding:10px;margin:0 -10px 0 0"
          @click="$router.push({name:'correct', params:{subjectId: Params.subjectId, id: Params.id}})">
        </i>
      </div>
    </x-header>
    <template v-for="detail in Example.detail">
      <card>
        <div slot="header" class="weui-panel__hd">
          <flexbox><flexbox-item :span="10" style="color:#4bb7aa">{{detail.charpterName}}</flexbox-item></flexbox>
        </div>
        <div slot="content">
          <div v-html="detail.stem"></div>
          <div v-if="detail.opt.hasOwnProperty('A')">
            <template v-for="(value, key) in detail.opt">
              <div style="padding-top:5px;">{{ key }}： <p v-html="value" style="display:inline-block"></p></div>
            </template>
          </div>
        </div>
      </card>
      <card>
        <div slot="header" class="weui-panel__hd" style="color:#4bb7aa">解析</div>
        <div slot="content" v-html="detail.answer"></div>
      </card>
    </template>
    <div style="text-align:center">
      <spinner v-if="loading" type="dots"></spinner>
      <p v-else-if="Example.detail.length == 0" style="font-size:16px;padding:10px 0;color:#4BB7AA">出错了~</p>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Card, ViewBox, Spinner, Flexbox, FlexboxItem} from 'vux'
import {mapActions, mapGetters} from 'vuex'
import store from '@/store'
import modules from '../modules/store'

export default {
  name: 'example',
  components: {
    XHeader, Card, ViewBox, Spinner, Flexbox, FlexboxItem
  },
  computed: {
    ...mapGetters(['Example', 'Params'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getExample', 'exampleClear', 'collectRemove', 'collectAdd']),
    _getDate () {
      this.loading = true
      this.getExample().then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
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
        vm._getDate()
      })
    } else {
      next()
    }
  },
  beforeCreate () {
    store.registerModule('example', {
      ...modules
    })
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
