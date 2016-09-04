<style lang="less">
.recharge {
    .weixin {
        margin-top: 0.5rem;
    }
    .recharge-wrap {
        padding: 1.3rem 2%;
        .wrap {
            padding: 0.7rem 2%;
            border-radius: 1rem;
            background: #fff;
            box-shadow: 0.1rem 0.2rem 0.1rem #888888;
            .recharge-item {
                border: none;
                .vux-flexbox-item {
                    margin: 0 !important;
                    &.money-item {
                        border-right: 1px dashed #000;
                        .moeny {
                            text-align: center;
                            color: #ff5722;
                            font-size: 1rem;
                        }
                    }
                    .tip {
                        font-size: 0.3rem;
                    }
                }
            }
        }
    }
    .recharge-btn {
        padding: 0.5rem 3%;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 94%;
        background-color: #edf2f1;
    }
}

.tar {
    text-align: right;
}
</style>

<template>
<div class='recharge'>
  <x-header :left-options="{showBack: true}">充值<a slot="right" v-touch:tap="_rull">我的账单</a></x-header>
  <div class="recharge-wrap">
    <div class="wrap">
      <flexbox class="vux-1px-b recharge-item">
        <flexbox-item :span="2/10" class="money-item">
          <div class="moeny">￥9.9</div>
        </flexbox-item>
        <flexbox-item :span="8/10">
          <flexbox orient="vertical">
            <flexbox-item>
              <div class="tar">1年会员充值</div>
            </flexbox-item>
            <flexbox-item>
              <div class="tar tip">上线优惠期间（截止至2016年12月31日）</div>
            </flexbox-item>
          </flexbox>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
  <group>
    <cell title="需支付费用" value="￥9.9" link="javascript:;" v-touch:tap="_clear">
      <span class="demo-icon" slot="icon"></span>
    </cell>
    <group>
      <selector placeholder="500积分可用" title="积分兑换" :options="list" @on-change="onChange"></selector>
    </group>
    <cell title="总计" value="￥9.9" link="javascript:;" v-touch:tap="_clear">
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
  Selector,
  Switch
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
    Switch
  },
  methods: {
    _rull() {
      alert(1);
    },
    onChange() {

    }
  }
}
</script>
