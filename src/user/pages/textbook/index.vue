<template>
<view-box v-ref:view-box class='textbook'>

   <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
          我的教材
          <a slot="right" link="/remember/1">
              <i class="icon iconfont icon-plus" style="font-size:1.5rem;position: relative;top:-.1rem;right:-.5rem;"></i>
          </a>
      </x-header>
  </div>

  <div style="padding-top:46px;">
      <group title="数学">
          <cell title="必修一" ></cell>
          <cell title="必修二" ></cell>
          <cell title="必修三"></cell>
      </group>

      <group title="物理">
          <cell title="必修一" ></cell>
          <cell title="必修二" ></cell>
          <cell title="必修三"></cell>
      </group>

      

  </div>  

</view-box>
</template>

<script>
import {
  XHeader,
  XInput,
  Cell,
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
    Scroller,Cell,
    ViewBox
  },
  methods: {
    _back() {
      this.$router.go('/main');
    }
    
  }
}
</script>


