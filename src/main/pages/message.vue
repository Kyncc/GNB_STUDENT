<template>
  <view-box v-ref:view-box  class='mainMessage vux-scroller-header-box'>
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
      <x-header :left-options="{showBack: false}">消息</x-header>
    </div>

    <div style="padding-top:48px;">
      <scroller lock-x scrollbar-y use-pulldown :pulldown-status.sync="pulldownStatus" @pulldown:loading="load">
        <group>
          <cell title="班级消息" link="../message/class" inline-desc='这是张老师布置的一道作业' >
            <div class="vux-reddot" slot="icon" style="margin-right:.5em;" >
              <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/class.png">
            </div>
          </cell>
          <cell title="纠错消息" link="../message/correct" inline-desc='这是张老师布置的一道作业' >
            <div class="vux-reddot" slot="icon" style="margin-right:.5em;" >
                <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/correct.png">
            </div>
          </cell>
          <cell title="系统消息" link="../message/system" inline-desc='这是张老师布置的一道作业' >
            <div class="vux-reddot" slot="icon" style="margin-right:.5em;" >
              <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/system.png">
            </div>
          </cell>
          <cell title="关注我们" link="javascript:;" inline-desc='微信公众号:guina_book' >
            <div slot="icon" style="margin-right:.5em;" >
              <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/focus.png">
            </div>
          </cell>
          <cell title="加入我们" inline-desc='QQ群:458410557' link="javascript:;" v-touch:tap="_openQQ">
            <div slot="icon" style="margin-right:.5em;" >
              <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/add.png">
            </div>
          </cell>
        </group>
        <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
          <span v-show="pulldownStatus === 'default'"></span>
          <span class="pulldown-arrow" v-show="pulldownStatus === 'down' || pulldownStatus === 'up'" :class="{'rotate': pulldownStatus === 'up'}">↓</span>
          <span v-show="pulldownStatus === 'loading'"><spinner type="lines"></spinner></span>
        </div>
      </scroller>
    </div>
</view-box>   
</template>

<script>

import Vue from 'vue'
import Router from 'vue-router'
import {XHeader,Group,Scroller,Cell,ViewBox,Spinner} from 'vux'
import { token } from '../../common/getters'

import { messageIndex } from '../../message/getters'
import { getMessageIndex} from '../../message/actions'

export default {
  components: {
    XHeader,Scroller,Group,Cell,ViewBox,Spinner
  },
  methods: {
    load (uuid) {
      setTimeout(() => {
        this.$broadcast('pulldown:reset', uuid)
      }, 2000)
    },
		_refersh(){
			alert(1);
		},
     _openQQ(){
      window.location.href = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=458410557&card_type=group&source=qrcode";
    },
		load (uuid) {
			setTimeout(() => {
				this.$broadcast('pulldown:reset', uuid)
			}, 1000)
		}
	},
  data () {
    return {
      pulldownStatus: 'default'
    }
  }
}
</script>

<style>
  .rotate {
  transform: rotate(-180deg);
}
.pulldown-arrow {
  display: inline-block;
  transition: all linear 0.2s;
  color: #666;
  font-size: 25px;
}
</style>