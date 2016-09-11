<template>
<view-box v-ref:view-box class='points'>
  <x-header :left-options="{showBack: true}">我的积分<a slot="right" v-touch:tap="_rull">积分规则</a></x-header>
  <scroller lock-x scrollbar-y use-pulldown :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @pulldown:loading="load">
    <group>
      <h3 class="title vux-1px-b">积分明细</h3>
      <flexbox class="vux-1px-b points-items">
        <flexbox-item :span="1/40">
        </flexbox-item>
        <flexbox-item :span="9/20">
          <div>注册</div>
        </flexbox-item>
        <flexbox-item :span="9/20">
          <flexbox orient="vertical">
            <flexbox-item>
              <div class="tar money">+100</div>
            </flexbox-item>
            <flexbox-item>
              <div class="tar time">2016.9.3</div>
            </flexbox-item>
          </flexbox>
        </flexbox-item>
        <flexbox-item :span="1/40">
        </flexbox-item>
      </flexbox>
    </group>
  </scroller>
</view-box>
</template>

<script>
import './member.less'
import {
  XHeader,
  Group,
  Scroller,
  Flexbox,
  FlexboxItem,
  ViewBox
} from 'vux'

export default {
  components: {
    XHeader,
    Group,
    Scroller,
    Flexbox,
    FlexboxItem,
    ViewBox
  },
  methods: {
    load(uuid) {
      setTimeout(() => {
        this.$broadcast('pulldown:reset', uuid)
      }, 1000)
    },
    _rull() {
      alert(1);
    }
  }
}
</script>
