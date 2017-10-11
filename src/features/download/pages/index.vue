<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '下载中心'}">
    </x-header>
    <div>
      <group title='下载历史'>
        <cell title='记错题' :link="{name: 'downloadRemember'}"></cell>
        <cell title='拍错题' :link="{name: 'downloadCamera'}"></cell>
        <cell title='精选练习' :link="{name: 'downloadGood'}"></cell>
      </group>
    </div>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Group, Cell} from 'vux'
export default {
  name: 'index',
  components: {
    XHeader, ViewBox, Group, Cell
  }
}
</script>
