<template>
  <view-box ref="myClassAdd" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '添加班级'}"></x-header>
    <search @on-submit="_onSearch"  @on-change="_onSearch" v-model="searchCode" :auto-fixed="false" placeholder="请输入班级码"></search>
    <group gutter="0">
      <template v-if="ClassSearch.name">
        <cell :title="ClassSearch.name">
          <x-button type="primary" :mini="true" @click.native="_addClass(ClassSearch.classCode)">申请加入</x-button>
        </cell>
      </template>
    </group>
    <infinite-loading :on-infinite="_onInfinite"  ref="infiniteLoading" spinner="default">
      <div slot="no-results" >
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
        <p style="font-size:1rem;display:inline-block;">没有查询到班级~</p>
      </div>
      <div slot="no-more"></div>
    </infinite-loading>
  </view-box>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader, XButton, Cell, Group, Search, ViewBox} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    XHeader, XButton, Cell, Group, Search, ViewBox, InfiniteLoading
  },
  data () {
    return {
      searchCode: ''
    }
  },
  methods: {
    ...mapActions(['getMyClassSearchClass', 'postMyClassInto']),
    _onSearch (str) {
      this.searchCode = str
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
    },
    _addClass (code) {
      this.postMyClassInto({
        classCode: code
      })
      .then(() => {
        this.$vux.toast.show({text: '申请成功', type: 'text', time: 1000})
        history.back()
      })
    },
    _onInfinite () {
      this.getMyClassSearchClass({
        'classCode': this.searchCode
      })
      .then(() => {
        if (this.ClassSearch.length !== 0) this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    }
  },
  computed: {
    ...mapGetters(['ClassSearch'])
  }
}
</script>
