<template>
<view-box v-ref:view-box class='my-bill'>
  <x-header :left-options="{showBack: true}">我的账单</x-header>

    <div class="bill-item">
      <flexbox>
        <flexbox-item>
          <flexbox orient="vertical">
            <flexbox-item>
              <div class="bill-left bill-top">
                支付9.9
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="bill-left bill-bottom">
                2016-9-16
              </div>
            </flexbox-item>
          </flexbox>
        </flexbox-item>
        <flexbox-item>
          <flexbox orient="vertical">
            <flexbox-item>
              <div class="bill-right bill-top">
                1年
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="bill-right bill-bottom">
                2017-9-16
              </div>
            </flexbox-item>
          </flexbox>
        </flexbox-item>
      </flexbox>
    </div>

</view-box>
</template>

<script>
import {
  XHeader,
  Cell,
  Group,
  Alert,
  Flexbox,
  FlexboxItem,
  Search,
  ViewBox
}
from 'vux'
export default {
  components: {
    XHeader,
    Cell,
    Group,
    Alert,
    Flexbox,
    FlexboxItem,
    Search,
    ViewBox
  },
  methods: {
    _points() {
      this.$router.go('points')
    },
    _recharge() {
      this.$router.go('recharge')
    }
  }
}
</script>
<style lang="less">
    .my-bill{
        .bill-item{
            background-color: #fff;
            padding: 0 3%;
            .vux-flexbox-item{
                margin: 0 !important;
            }
            .bill-right{
                text-align: right;
            }
            .bill-top{
                font-size: 1rem;
            }
            .bill-bottom{
                font-size: 0.5rem;
                color: #999;
            }
        }
    }
</style>
