<template>
<div class='class'>
  <x-header :left-options="{showBack: true}">数学一班</x-header>
  <scroller lock-x scrollbar-y use-pulldown :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @pulldown:loading="load">
    <cell title="我的老师">
      <span class="demo-icon" slot="icon"></span>
    </cell>
    <group>
      <cell title="汪老师">
        <span class="demo-icon" slot="icon"></span>
      </cell>
    </group>
    <cell title="我的同学">
      <span class="demo-icon" slot="icon"></span>
    </cell>
    <group>
      <cell title="李同学">
        <span class="demo-icon" slot="icon"></span>
      </cell>
      <cell title="李同学">
        <span class="demo-icon" slot="icon"></span>
      </cell>
      <cell title="李同学">
        <span class="demo-icon" slot="icon"></span>
      </cell>
      <cell title="李同学">
        <span class="demo-icon" slot="icon"></span>
      </cell>
      <cell title="李同学">
        <span class="demo-icon" slot="icon"></span>
      </cell>
      <cell title="李同学">
        <span class="demo-icon" slot="icon"></span>
      </cell>
      <cell title="李同学">
        <span class="demo-icon" slot="icon"></span>
      </cell>
      <cell title="李同学">
        <span class="demo-icon" slot="icon"></span>
      </cell>
    </group>
  </scroller>
</div>
</template>

<script>
import './myClass.less'
import {
  XHeader,
  Cell,
  Group,
  Alert,
  Flexbox,
  FlexboxItem,
  Scroller,
  Search
}
from 'vux'
export default {
  components: {
    XHeader,
    Cell,
    Group,
    Alert,
    Flexbox,
    FlexboxItem,
    Scroller,
    Search
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
