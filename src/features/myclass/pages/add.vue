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
    <infinite-loading :on-infinite="_onInfinite"  ref="infiniteLoading">
      <div slot="no-results" style="color:#4bb7aa;"></div>
      <div slot="spinner" style="padding:.5rem 0"><spinner type="dots" slot="value"></spinner></div>
      <div slot="no-more" style="color:#4bb7aa;">没有更多结果了~</div>
    </infinite-loading>
  </view-box>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader, XButton, Cell, Group, Search, Spinner, ViewBox} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'add',
  components: {
    XHeader, XButton, Cell, Group, Search, ViewBox, Spinner, InfiniteLoading
  },
  data () {
    return {
      searchCode: ''
    }
  },
  methods: {
    ...mapActions(['getMyClassSearchClass', 'postMyClassInto', 'myClassSearchClear']),
    _onSearch (str) {
      this.searchCode = str
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
    },
    _addClass (code) {
      this.postMyClassInto({
        classCode: code
      }).then(() => {
        this.$vux.toast.show({text: '申请成功', type: 'text', time: 1000})
        history.back()
      })
    },
    _onInfinite () {
      this.getMyClassSearchClass({
        classCode: this.searchCode
      }).then(() => {
        if (this.ClassSearch.length !== 0) this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    }
  },
  computed: {
    ...mapGetters(['ClassSearch'])
  },
  activated () {
    this.searchCode = ''
    this.myClassSearchClear()
    this.$nextTick(() => {
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
    })
  },
  deactivated () {
    this.$refs.infiniteLoading.isLoading = false
  }
}
</script>
