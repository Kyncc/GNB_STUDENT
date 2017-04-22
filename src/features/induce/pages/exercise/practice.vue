<template>
  <div>
    <aside v-if="list.length" style="padding:0 .5rem;font-size:.7rem;line-height:1.5rem;margin-bottom:-10px;">
      <p>本节共有<b style="color:#F8BF4D">{{totalCount}}</b>个题型，已练<b style="color:#F8BF4D">{{recordSize}}</b>题</p>
    </aside>
    <card v-for="(item, index) in list" :key="index">
      <div class="weui-panel__hd" slot="header">
        <flexbox>
          <flexbox-item :span="10" style="color:#4bb7aa">{{item.chapter_name}}</flexbox-item>
          <flexbox-item :span="2">难度: {{item.degree}}</flexbox-item>
        </flexbox>
      </div>
      <div slot="content" @click="$router.push({name:'example', params: {subjectId: Route.params.subject.includes('math') ? 2 : 7, id: item.exercises_id}})">
        <div v-html="item.stem"></div>
        <div v-if="item.opt_jo.hasOwnProperty('A')">
          <template v-for="(value, key) in item.opt_jo">
            <div style="padding-top:5px;">{{ key }}： <p v-html="value" style="display:inline-block"></p></div>
          </template>
        </div>
      </div>
      <div slot="footer">
        <div class="weui-cell weui-cell_access weui-cell_link">
          <div class="weui-cell__bd">
            <flexbox>
              <flexbox-item :span="10"></flexbox-item>
              <flexbox-item :span="2">撤回</flexbox-item>
            </flexbox>
          </div>
        </div>
      </div>
    </card>
    <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading">
      <div slot="no-results" style="color:#4bb7aa;">还没有弃题~</div>
      <div slot="no-more" style="color:#4bb7aa;">已经到头了~</div>
      <div slot="spinner" style="padding:.5rem 0"><spinner type="lines" slot="value"></spinner></div>
    </infinite-loading>
  </div>
</template>

<script>
import {Card, Spinner, Flexbox, FlexboxItem} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'practice',
  components: {
    Card, Spinner, Flexbox, FlexboxItem, InfiniteLoading
  },
  computed: {
    ...mapGetters(['Route', 'inducePractice']),
    list () {
      return this.inducePractice.list
    },
    recordSize () {
      return this.inducePractice.recordSize
    },
    totalCount () {
      return this.inducePractice.totalCount
    }
  },
  methods: {
    ...mapActions(['getInduceList', 'setInduceListScroll', 'induceListClear']),
    _onInfinite () {
      this.getInduceList({type: 'practice'}).then((res) => {
        res.data.data.list.length < 10 ? this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete') : ''
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    // 纠错页面来的不需要刷新
    if (from.name !== 'example') {
      next(vm => {
        vm.induceListClear({type: 'practice'})
        vm.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
    } else {
      next(vm => {
        vm.$parent.$refs.viewBoxBody.scrollTop = vm.inducePractice.scroll
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.setInduceListScroll({type: 'practice', height: this.$parent.$refs.viewBoxBody.scrollTop})
    next()
  }
}
</script>
