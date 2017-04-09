<template>
  <view-box ref="myClass" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '我的班级'}">
      <div slot="right">
        <router-link :to="{ path: 'class/add'}" style="margin:0">
          <i class="icon iconfont icon-plus" style="padding:8px;font-size:26px;"></i>
        </router-link>
        <router-link :to="{ path: 'class/message'}" style="margin:0">
          <i class="icon iconfont icon-comment2" style="padding:10px;margin:0 -10px 0 0"></i>
        </router-link>
      </div>
    </x-header>
    <group gutter="0">
      <template v-for="item in ClassMy">
        <cell :title="item.name" :link="'class/detail/'+item.classCode"></cell>
      </template>
    </group>
    <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading" spinner="default">
      <div slot="no-results">
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
        <p style="font-size:1rem;display:inline-block;">点我加入班级~</p>
      </div>
      <div slot="no-more"></div>
      <div slot="spinner">
        <spinner type="bubbles" slot="value"></spinner>
      </div>
    </infinite-loading>
  </view-box>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader, Cell, Group, ViewBox, Spinner} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, Cell, Group, ViewBox, InfiniteLoading, Spinner
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
    })
  },
  methods: {
    ...mapActions(['getMyClass']),
    _onInfinite () {
      this.getMyClass()
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
