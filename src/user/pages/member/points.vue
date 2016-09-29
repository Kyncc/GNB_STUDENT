<template>
<view-box v-ref:view-box class='points'>
  <x-header :left-options="{showBack: true}">我的积分<a slot="right" v-touch:tap="_rule">积分规则</a></x-header>
  <group>
    <h3 class="title vux-1px-b">积分明细</h3>
    <flexbox class="vux-1px-b points-items" v-for="item in fetchNumericalList">
      <flexbox-item :span="1/40">
      </flexbox-item>
      <flexbox-item :span="9/20">
        <div>{{item.title}}</div>
      </flexbox-item>
      <flexbox-item :span="9/20">
        <flexbox orient="vertical">
          <flexbox-item>
            <div class="tar money">{{item.number}}</div>
          </flexbox-item>
          <flexbox-item>
            <div class="tar time">{{item.time}}</div>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item :span="1/40">
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
import {
  numerical
} from '../../actions.js'
import {
  fetchToken,
  fetchNumericalList
} from '../../getters'
import * as _ from '../../../config/whole.js'

export default {
  components: {
    XHeader,
    Group,
    Flexbox,
    FlexboxItem,
    ViewBox
  },
  vuex: {
    actions: {
      numerical
    },
    getters: {
      fetchToken,
      fetchNumericalList
    }
  },
  ready() {
    this.numerical({
      token: this.fetchToken
    })
  },
  methods: {
    _rule() {
      this.$router.go('/user/member/rule')
    }
  }
}
</script>
