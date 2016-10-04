<template>
<view-box v-ref:view-box class='rule'>
  <x-header :left-options="{showBack: true}">积分规则</x-header>
  <group>
    <flexbox class="vux-1px-b vux-1px-t">
      <flexbox-item :span="4/10">
        注册
      </flexbox-item>
      <flexbox-item  class="vux-1px-l" :span="6/10">
        +100积分
      </flexbox-item>
    </flexbox>
    <flexbox class="vux-1px-b">
      <flexbox-item :span="4/10">
        完善个人资料
      </flexbox-item>
      <flexbox-item  class="vux-1px-l" :span="6/10">
        +150积分
      </flexbox-item>
    </flexbox>
    <flexbox class="vux-1px-b">
      <flexbox-item :span="4/10">
        分享
      </flexbox-item>
      <flexbox-item  class="vux-1px-l" :span="6/10">
        +50积分/次/天（24小时内可多次分享，但只送积分一次）
      </flexbox-item>
    </flexbox>
    <flexbox class="vux-1px-b">
      <flexbox-item :span="4/10">
        <div>邀请好友</div>
      </flexbox-item>
      <flexbox-item  class="vux-1px-l" :span="6/10">
        +500积分（邀请人）；+1000积分（被邀请人）
      </flexbox-item>
    </flexbox>
    <flexbox class="vux-1px-b">
      <flexbox-item :span="4/10">
        <div>题目纠错</div>
      </flexbox-item>
      <flexbox-item  class="vux-1px-l" :span="6/10">
        <div>+100积分（审核通过）</div>
      </flexbox-item>
    </flexbox>
    <flexbox class="vux-1px-b">
      <flexbox-item :span="4/10">
        <div>拍错题</div>
      </flexbox-item>
      <flexbox-item  class="vux-1px-l" :span="6/10">
        <div>+5积分/题</div>
      </flexbox-item>
    </flexbox>
  </group>
</view-box>
</template>

<script>
import './member.less'
import {
  XHeader,
  Group,
  Flexbox,
  FlexboxItem,
  ViewBox
} from 'vux'

export default {
  components: {
    XHeader,
    Group,
    Flexbox,
    FlexboxItem,
    ViewBox
  }
}
</script>
