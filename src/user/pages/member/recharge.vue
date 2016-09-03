<template>
<div class='recharge'>
  <x-header :left-options="{showBack: true}">充值<a slot="right" v-touch:tap="_rull">我的账单</a></x-header>
  <group>
    <cell title="需支付费用" value="￥9.9" link="javascript:;" v-touch:tap="_clear">
      <span class="demo-icon" slot="icon"></span>
    </cell>
    <cell title="积分兑换" value="500积分可用" link="javascript:;" v-touch:tap="_clear">
      <span class="demo-icon" slot="icon"></span>
    </cell>
    <cell title="总计" value="￥9.9" link="javascript:;" v-touch:tap="_clear">
      <span class="demo-icon" slot="icon"></span>
    </cell>
  </group>
  <group>
    <flexbox>
      <flexbox-item>
        <x-button type="primary">他人支付</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button type="primary">自己支付</x-button>
      </flexbox-item>
    </flexbox>
  </group>
</div>
</template>

<script>
import {
  XHeader,
  Group,
  XButton,
  Cell,
  Flexbox,
  FlexboxItem,
} from 'vux'

export default {
  components: {
    XHeader,
    Group,
    XButton,
    Cell,
    Flexbox,
    FlexboxItem,
  },
  methods: {
    _rull() {
      alert(1);
    }
  }
}
</script>

<style lang="less">
.recharge {
    }
.tar {
    text-align: right;
}
</style>
