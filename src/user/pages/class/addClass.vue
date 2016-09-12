<template>
<view-box v-ref:view-box class='class'>
  <x-header :left-options="{showBack: true}">添加班级</x-header>
  <scroller lock-x scrollbar-y use-pulldown :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @pulldown:loading="load">

    <group>
        <cell title="数学一班" >
           <x-button type="primary" :mini="true">添加</x-button>
       </cell>
       <cell title="数学一班" >
          <x-button type="primary" :mini="true">添加</x-button>
      </cell>
    </group>
  </scroller>
</view-box >
</template>

<script>
import './myClass.less'
import {
  XHeader,
  XButton,
  Cell,
  Group,
  Alert,
  Flexbox,
  FlexboxItem,
  Scroller,
  Search,
  ViewBox
}
from 'vux'
export default {
  components: {
    XHeader,
    XButton,
    Cell,
    Group,
    Alert,
    Flexbox,
    FlexboxItem,
    Scroller,
    Search,
    ViewBox
  },
  methods: {
    load(uuid) {
      setTimeout(() => {
        this.$broadcast('pulldown:reset', uuid)
      }, 1000)
    },
    _points() {
      this.$router.go('points')
    },
    _recharge() {
      this.$router.go('recharge')
    }
  }
}
</script>
