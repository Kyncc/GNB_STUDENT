<template>
  <view-box ref="myClass" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '我的班级'}">
      <div slot="right">
        <router-link :to="{ path: 'add'}" >
          <i class="icon iconfont icon-plus"></i>
        </router-link>
        <router-link :to="{ path: 'message'}" >
          <i class="icon iconfont icon-comment2"></i>
        </router-link>
      </div>
    </x-header>
    <group>
      <template v-for="item in ClassMy">
        <cell :title="item.name" :link="'detail/'+item.classCode"></cell>
      </template>
    </group>
    <infinite-loading :on-infinite="_onInfinite"  ref="infiniteLoading" spinner="default">
      <div slot="no-results" >
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
        <p style="font-size:1rem;display:inline-block;">点我加入班级~</p>
      </div>
      <div slot="no-more"></div>
    </infinite-loading>
  </view-box>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader, Cell, Group, ViewBox} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    XHeader, Cell, Group, ViewBox, InfiniteLoading
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
    })
  },
  methods: {
    ...mapActions(['getMyClass']),
    _onInfinite () {
      this.getMyClass({
        token: this.token
      })
      .then(() => {
        if (this.ClassMy.length !== 0) this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    }
  },
  computed: {
    ...mapGetters(['ClassMy'])
  }
}
</script>
