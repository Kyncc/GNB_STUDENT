<template>
<view-box v-ref:view-box class='bag vux-scroller-header-box'>
  <div style="height:46px;">
    <x-header :left-options="{showBack: false}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">书包</x-header>
  </div>
  <scroller lock-x v-ref:scroller height="-47px">
    <div>
      <group style="padding:10px 0;">
        <cell title="成绩报告单" link="bag/report/">
          <span class="icon iconfont icon-pie-chart" style="color:#794BB8" slot="icon"></span>
        </cell>
      </group>

      <group style="padding-bottom:10px;">
        <cell title="斩题本" link="bag/break/">
          <span class="icon iconfont icon-book1" style="color:#5ECFE7" slot="icon"></span>
        </cell>
        <cell title="弃题本" link="bag/pass/">
          <span class="icon iconfont icon-filterclear" style="color:#FFDFB0" slot="icon"></span>
        </cell>
        <cell title="收藏本" link="bag/collect/example">
          <span class="icon iconfont icon-box" style="color:#6DC6FF" slot="icon"></span>
        </cell>
      </group>

      <group>
        <cell title="我的教材" link="bag/textbook/">
          <span class="icon iconfont icon-book2" style="color:#FF546B"  slot="icon"></span>
        </cell>
        <cell title="我的习题册" link="bag/workbook/">
          <span class="icon iconfont icon-workbook" style="color:#ABC97C"  slot="icon"></span>
        </cell>
      </group>

    </div>
  </scroller>
</view-box>
</template>

<script>
import {XHeader,Cell,Group,Confirm,Scroller,ViewBox} from 'vux'
import * as _ from '../config/whole.js'
import {token,system} from '../common/getters'
export default {
    components: {
        XHeader,Cell,Group,Confirm,Scroller,ViewBox
    },
    vuex:{
        getters:{
            token,system
        },
        actions:{
        }
    },
    created(){
      
    },
    ready(){
        this.$nextTick(() => {
            this.$refs.scroller.reset()
        });
    }
}
