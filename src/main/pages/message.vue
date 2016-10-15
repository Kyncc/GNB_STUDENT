<template>
  <view-box v-ref:view-box class='mainMessage vux-scroller-header-box'>
      <div style="height:46px;"  slot="header" style="position:fixed;left:0;top:0;width:100%;z-index:100">
          <x-header :left-options="{showBack: false}" class="vux-scroller-header">消息</x-header>
      </div>

      <scroller lock-x v-ref:scroller use-pulldown :pulldown-status.sync="pulldownStatus" @pulldown:loading="load" height="-46px">
        <div>
          <group>
            <cell title="班级消息" link="../message/class" :inline-desc='messageIndex.classMsgNew' >
              <div v-bind:class="{'vux-reddot':messageIndex.hasNewClassMsg}" slot="icon" style="margin-right:.5em;" >
                <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/class.png">
              </div>
            </cell>
            <cell title="纠错消息" link="../message/correct" :inline-desc='messageIndex.correctMsgNew' >
              <div v-bind:class="{'vux-reddot':messageIndex.hasNewCorretMsg}" slot="icon" style="margin-right:.5em;" >
                  <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/correct.png">
              </div>
            </cell>
            <cell title="系统消息" link="../message/system" :inline-desc='messageIndex.systemMsgNew' >
              <div v-bind:class="{'vux-reddot':messageIndex.hasNewSystemMsg}" slot="icon" style="margin-right:.5em;" >
                <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/system.png">
              </div>
            </cell>
            <cell title="加入我们" inline-desc='QQ群:458410557' link="javascript:;" v-touch:tap="_openQQ">
              <div slot="icon" style="margin-right:.5em;" >
                <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/add.png">
              </div>
            </cell>
            <cell title="关注我们" inline-desc='微信公众号:guina_book'  @click="show=true">
              <div slot="icon" style="margin-right:.5em;" >
                <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/focus.png">
              </div>
            </cell>
          </group>
          <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
            <span v-show="pulldownStatus === 'default'"></span>
            <span class="pulldown-arrow" v-show="pulldownStatus === 'down' || pulldownStatus === 'up'" :class="{'rotate': pulldownStatus === 'up'}">↓</span>
            <span v-show="pulldownStatus === 'loading'"><spinner type="lines"></spinner></span>
          </div>
        </div>
      </scroller>

    <dialog :show.sync="show" class="dialog-demo">
      <div class="img-box">
        <img src="https://o3e85j0cv.qnssl.com/static/01.jpg?06186f7" style="max-width:100%">
      </div>
      <span class="vux-close" @click="show=false">点我关闭</span>
    </dialog>

  </view-box>
</template>

<script>
import store from '../../store'
import {XHeader,Group,Scroller,Cell,Spinner,ViewBox,Dialog} from 'vux'
import { token } from '../../common/getters'
import { messageIndex } from '../../message/getters'
import { getMessageIndex} from '../../message/actions'
import * as _ from '../../config/whole'

export default {
  components: {
    XHeader,Scroller,Group,Cell,Spinner,ViewBox,Dialog
  },
  vuex: {
      getters: {
          token,messageIndex
      },
      actions: {
          getMessageIndex
      }
  },
  store,
  methods: {
    _openQQ(){
        window.location.href = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=458410557&card_type=group&source=qrcode";
    },
		load (uuid) {
			setTimeout(() => {
				this.$broadcast('pulldown:reset', uuid);
        this._refresh();
			}, 1000)
		},
    _refresh(){
      this.getMessageIndex({"token":localStorage.getItem('token')},()=>{
          _.toast('刷新成功');
      });
    }
	},
  data () {
    return {
      pulldownStatus: 'default',
      show:false
    }
  },
  ready(){
      this.getMessageIndex({"token":localStorage.getItem('token')});
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
.dialog-demo {
   .img-box{
    height: 350px;
    overflow: hidden;
  }
}
.vux-close{
       position: relative; 
    display: inline;
     vertical-align: middle; 
    width: 24px; 
     height: 24px; 
    overflow: hidden;
    color: #ccc;
}
</style>
