<template>
<view-box v-ref:view-box class='textbook'>
  <x-header :left-options="{showBack: true}">我的教材</x-header>
</view-box>
</template>

<script>
import {
  XHeader,
  XInput,
  Group,
  Selector,
  Flexbox,
  FlexboxItem,
  Scroller,
  ViewBox
} from 'vux'

export default {
  components: {
    XHeader,
    XInput,
    Group,
    Selector,
    Flexbox,
    FlexboxItem,
    Scroller,
    ViewBox
  },
  methods: {
    
  }
}
</script>


