<template>
<view-box v-ref:view-box class='my-bill'>
  <x-header :left-options="{showBack: true}">我的账单</x-header>

    <div class="bill-item" v-for="item in fetchBilllList">
      <flexbox>
        <flexbox-item>
          <flexbox orient="vertical">
            <flexbox-item>
              <div class="bill-left bill-top">
                支付{{item.payMoney}}元
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="bill-left bill-bottom">
                {{item.payTime}}
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
                {{item.endTime}}
              </div>
            </flexbox-item>
          </flexbox>
        </flexbox-item>
      </flexbox>
    </div>

</view-box>
</template>

<script>
import './member.less'
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
import { payList } from '../../actions.js'
import {fetchToken,fetchBilllList} from '../../getters'

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
  vuex:{
      actions:{
          payList
      },
      getters:{
          fetchToken,
          fetchBilllList
      }
  },
  ready(){
      this.payList({token:this.fetchToken})
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
