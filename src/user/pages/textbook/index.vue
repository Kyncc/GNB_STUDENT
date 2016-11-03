<template>
<view-box v-ref:view-box class='textbookIndex'>

   <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
          我的教材
          <a slot="right" >
              科目
          </a>
      </x-header>
  </div>

  <div style="padding-top:46px;">
      <group title="数学">
          <cell title="必修一"></cell>
          <cell title="必修二"></cell>
          <cell title="必修三"></cell>
      </group>
  </div>  
  <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom" >
      <x-button style="width:100%;border-radius:0px;"  @click="_addTextBook()">教材添加</x-button>
  </tabbar>

</view-box>
</template>

<script>
import {
  XHeader,
  XInput,
  Cell,
  Group,
  Selector,
  ViewBox,Tabbar,XButton
} from 'vux'

export default {
  components: {
    XHeader,
    XInput,
    Group,
    Selector,
    Cell,
    ViewBox,Tabbar,XButton
  },
  methods: {
    _back() {
      this.$router.go('/main/user');
    },
    _addTextBook(){
      this.$router.go('add');
    }
    
  }
}
</script>


