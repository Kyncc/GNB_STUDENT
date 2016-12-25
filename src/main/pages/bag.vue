<template>
<view-box v-ref:view-box class='bag vux-scroller-header-box'>
  <div style="height:46px;">
    <x-header :left-options="{showBack: false}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">书包
    </x-header>
  </div>
  <scroller lock-x v-ref:scroller height="-47px">
    <div>
      <group style="padding:10px 0;">
        <cell title="成绩报告单" link="/user/info/">
          <span class="icon iconfont icon-userInfo" style="color:#5ECFE7" slot="icon"></span>
        </cell>
      </group>

      <group style="padding-bottom:10px;">
        <cell title="斩题本" link="/user/info/">
          <span class="icon iconfont icon-userInfo" style="color:#5ECFE7" slot="icon"></span>
        </cell>
        <cell title="弃题本" link="/user/class/">
          <span class="icon iconfont icon-hat" style="color:#73D179" slot="icon"></span>
        </cell>
        <cell title="收藏本" link="/user/class/">
          <span class="icon iconfont icon-hat" style="color:#73D179" slot="icon"></span>
        </cell>
      </group>

      <group>
        <cell title="我的教材" link="/user/settings/">
          <span class="icon iconfont icon-settingfull" style="color:#1296DB"  slot="icon"></span>
        </cell>
        <cell title="我的习题册" link="/user/settings/">
          <span class="icon iconfont icon-settingfull" style="color:#1296DB"  slot="icon"></span>
        </cell>
      </group>

    </div>
  </scroller>
</view-box>
</template>

<script>
import {XHeader,Cell,Group,Confirm,Scroller,ViewBox} from 'vux'
import * as _ from '../../config/whole.js'
import { workbookAllDel } from '../../user/actions/workbook'
import { textbookAllDel } from '../../user/actions/textbook'
import {token,system} from '../../common/getters'

export default {
    components: {
        XHeader,Cell,Group,Confirm,Scroller,ViewBox
    },
    vuex:{
        getters:{
            token,system
        },
        actions:{
            workbookAllDel,textbookAllDel
        }
    },
    created(){
        this.workbookAllDel();
        this.textbookAllDel();
    },
    methods: {

    },
    data(){

    },
    ready () {
        this.$nextTick(() => {
            this.$refs.scroller.reset()
        });

    }
}
