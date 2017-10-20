<template>
  <div>
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: this.$route.params.name}">
        <div slot="right">
          <i class="icon iconfont icon-filter" style="padding:10px;margin:0 -10px 0 0"
            @click="$router.push({name:'statisticsGood_options'})">
          </i>
        </div>
      </x-header>
    </div>
    <card v-for="(item, index) in AssembleGood.index.list" :key="index">
      <div class="weui-panel__hd" slot="header" style='color:#4cc0be'>
        {{item.chapterName}}
      </div>
      <div slot="content" @click="$router.push({name:'example', params: {subjectId: item.subject_id, id: item.exercisesId}})">
        <div v-html="item.stem"></div>
        <div v-if="item.opt.hasOwnProperty('A')">
          <div v-for="(value, key) in item.opt" :key='value' style="padding-top:5px;">{{ key }}： <p v-html="value" style="display:inline-block"></p></div>
        </div>
      </div>
      <div slot="footer">
        <div class="weui-cell weui-cell_link" style='padding:5px 15px'>
          <div class="weui-cell__bd">
            <flexbox :gutter='0'>
              <flexbox-item :span="3">难度: {{item.degree}}</flexbox-item>
              <flexbox-item :span="7">更新: {{item.time | ymd}}</flexbox-item>
              <flexbox-item :span="2" @click.native="setStatisticsGoodAssembleUpdate({from: item.from, id: item.exercisesId, index: index})" style='text-align:right'>
                <i v-if='item.isAssembly' class="icon iconfont icon-correct" style="color:#4cc0be;margin-right:1rem;"></i>
                <i v-else class="icon iconfont icon-icon073102" style="color:#4cc0be;margin-right:1rem;" ></i>
              </flexbox-item>
            </flexbox>
          </div>
        </div>
      </div>
    </card>
    <!--组卷个数 -->
    <div class='assembleCount'
      @click="$router.push({name: 'statisticsCamera_assemble', params: {subject: $route.params.subject}})">
      已选<br/>{{AssembleGood.count}}
    </div>
    <div style="text-align:center;padding:20px 0;">
      <spinner v-if="loading" type="lines"></spinner>
      <div>
        <p style="font-size:16px;color:#4cc0be" v-if="loadingNoData">已经加载全部错题~</p>
        <p style="font-size:16px;color:#4cc0be" v-if="!loadingNoData && !loading" @click="_getData">点我加载更多</p>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, Group, Card, Cell, Spinner, Flexbox, FlexboxItem, XButton, TransferDomDirective as TransferDom} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'good',
  components: {
    XHeader, Group, Card, Cell, Spinner, Flexbox, FlexboxItem, XButton
  },
  computed: {
    ...mapGetters(['AssembleGood'])
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      loading: false,
      loadingNoData: false
    }
  },
  methods: {
    ...mapActions(['getStatisticsGood', 'setStatisticsGoodAssembleUpdate', 'setStatisticsScroll']),
    _getData () {
      this.loading = true
      this.getStatisticsGood().then((res) => {
        if (!res.data.data.offset) {
          this.loadingNoData = true
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.AssembleGood.index.reset) {
        vm._getData()
      }
      vm.$parent.$refs.viewBoxBody.scrollTop = vm.AssembleGood.index.scroll
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setStatisticsScroll({type: 'good', height: this.$parent.$refs.viewBoxBody.scrollTop})
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
  box-sizing: border-box;
  padding:.5rem .75rem;
  border-radius: 50%;
  bottom: 10%;
  right: 5%;
  text-align: center;
}
</style>
