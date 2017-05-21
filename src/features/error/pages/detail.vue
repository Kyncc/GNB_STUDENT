<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '例题详情'}">
      <div slot="right">
        <i class="icon iconfont icon-share" style="top:1px;"></i>
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

export default {
  name: 'detail',
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
    ...mapActions(['getErrorDetail', 'setErrorExampleWrong', 'getErrorCorrelation', 'clearErrorDetail', 'setErrorDetailScroll']),
    _getDate () {
      this.loading = true
      this.getErrorDetail().then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name !== 'error_math' && from.name !== 'error_physics') {
      next(vm => {
        vm.clearErrorDetail()
        vm._getDate()
      })
    } else {
      next()
    }
  }
}
</script>
