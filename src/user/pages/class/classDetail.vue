<template>
<view-box v-ref:view-box class='myClass'>
  <x-header :left-options="{showBack: true}">数学一班</x-header>
  <cell title="我的老师">

  </cell>
  <group>
    <cell title="汪老师">

    </cell>
  </group>
  <cell title="我的同学">

  </cell>
  <group>
    <cell title="李同学">

    </cell>

  </group>
</view-box>
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
  Search,
  ViewBox
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
    Search,
    ViewBox
  },
  methods: {
    _points() {
      this.$router.go('points')
    },
    _recharge() {
      this.$router.go('recharge')
    }
  }
}
</script>
