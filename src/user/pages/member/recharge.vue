<template>
<view-box v-ref:view-box class='recharge'>
  <x-header :left-options="{showBack: true}">充值<a slot="right" v-touch:tap="_rull">我的账单</a></x-header>
  <div class="recharge-wrap">
    <div class="wrap">
      <flexbox class="vux-1px-b recharge-item">
        <flexbox-item :span="2/10" class="money-item">
          <flexbox orient="vertical">
            <flexbox-item>
              <div class="moeny">￥9.9</div>
            </flexbox-item>
            <flexbox-item>
              <div class="tip tac"><s>￥49</s> </div>
            </flexbox-item>
          </flexbox>
        </flexbox-item>
        <flexbox-item :span="8/10">
          <flexbox orient="vertical">
            <flexbox-item>
              <div class="tar">1年会员充值</div>
            </flexbox-item>
            <flexbox-item>
              <div class="tar tip">上线优惠期间（截止至2017年3月1日）</div>
            </flexbox-item>
          </flexbox>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
  <group>
    <cell title="需支付费用" value="￥9.9" v-touch:tap="_clear">
      <span class="demo-icon" slot="icon"></span>
    </cell>

    <selector placeholder="500积分可用" title="积分兑换" :options="list" @on-change="onChange"></selector>

    <cell title="总计" value="￥9.9" v-touch:tap="_clear">
      <span class="demo-icon" slot="icon"></span>
    </cell>
  </group>
  <group class="weixin">
    <switch :title="'微信支付'" :value.sync="weixin"></switch>
  </group>
  <group class="recharge-btn">
    <flexbox>
      <flexbox-item>
        <x-button type="primary">他人支付</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button type="primary">自己支付</x-button>
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
  XButton,
  Cell,
  Flexbox,
  FlexboxItem,
  Selector,
  Switch,
  ViewBox
}
from 'vux'

export default {
  data() {
    return {
      weixin: true,
      list: [{
        key: '1000',
        value: '1000积分可用'
      }, {
        key: '1500',
        value: '1500积分可用'
      }],
    }
  },
  components: {
    XHeader,
    Group,
    XButton,
    Cell,
    Flexbox,
    FlexboxItem,
    Selector,
    Switch,
    ViewBox
  },
  methods: {
    _rull() {
      this.$router.go('myBill')
    },
    onChange() {

    }
  }
}
</script>
