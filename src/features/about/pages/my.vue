<template>
  <view-box  body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '关于我们'}"></x-header>
    <div style="padding:1rem">
      <flexbox wrap="wrap" :gutter="0">
        <flexbox-item><img src="../assets/ewm.jpg"></flexbox-item>
      </flexbox>
      <flexbox wrap="wrap" :gutter="0">
        <flexbox-item><p style="text-align:center;margin:.5rem 0;">请截屏到微信中识别二维码</p></flexbox-item>
      </flexbox>
    </div>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Flexbox, FlexboxItem} from 'vux'

export default {
  name: 'my',
  components: {
    XHeader, ViewBox, Flexbox, FlexboxItem
  }
}
</script>
