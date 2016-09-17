<template>
<view-box v-ref:view-box class='myClass'>
  <x-header :left-options="{showBack: true}">添加班级</x-header>
    <group>
        <cell title="数学一班" >
           <x-button type="primary" :mini="true">添加</x-button>
       </cell>
       <cell title="数学一班" >
          <x-button type="primary" :mini="true">添加</x-button>
      </cell>
    </group>
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
