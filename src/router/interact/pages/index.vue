<template>
  <div style="height:100%" class="interact">
    <x-header :left-options="{showBack: false}" class="vux-scroller-header">互动</x-header>
    <div id='wrapper' style="padding-bottom:10rem;">
      <div>
        <group style="padding:.5rem 0;">
          <cell title="班级消息" link="../interact/message/class/">
            <span class="icon iconfont icon-class" v-bind:class="{'vux-reddot':interactIndex.hasNewClassMsg}"  style="color:#1296DB" slot="icon"></span>
          </cell>
          <cell title="纠错消息" link="../interact/message/correct/">
            <span class="icon iconfont icon-correct2" v-bind:class="{'vux-reddot':interactIndex.hasNewCorretMsg}"  style="color:#FF5454" slot="icon"></span>
          </cell>
          <cell title="系统消息" link="../interact/message/system/">
            <span class="icon iconfont icon-info" v-bind:class="{'vux-reddot':interactIndex.hasNewSystemMsg}"  style="color:#FFD34E" slot="icon"></span>
          </cell>
        </group>
        <group>
          <cell title="参与归纳本讨论群"    @click="_openQQ">
            <span class="icon iconfont icon-qq1"   style="color:#1296DB" slot="icon"></span>
          </cell>
          <cell title="关注我们的公众号"   @click="show=true">
            <span class="icon iconfont icon-wechat"  style="color:#1FDD00" slot="icon"></span>
          </cell>
        </group>
      </div>
    </div>

    <dialog :show.sync="show" class="dialog-demo" @click="show=false">
        <div class="img-box">
            <img src="../../../assets/main/ewm.jpg" style="max-width:100%">
        </div>
        <span class="vux-close">截屛到微信中识别二维码</span>
    </dialog>
  </div>
</template>

<script>
import JRoll from 'jroll'
import '../../../common/pulldown.js'
import {XHeader,Group,Scroller,Cell,Spinner,Dialog} from 'vux'
import { token } from '../../../common/getters'
import { interactIndex } from '../getters'
import { getInteractIndex} from '../actions'
import { clearMessage} from '../../../featrues/message/actions'
import * as _ from '../../../config/whole'
import './index.less'

export default {
    components: {
        XHeader,Scroller,Group,Cell,Spinner,Dialog
    },
    route: {
        data:function(transition){
            this.clearMessage();
            this.getInteractIndex({"token":this.token});
        }
    },
    vuex: {
        getters: {
            token,interactIndex
        },
        actions: {
            getInteractIndex,clearMessage
        }
    },
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
            this.getInteractIndex({"token":this.token},()=>{
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
        let self = this
        this.getInteractIndex({"token":this.token});
        var jroll = new JRoll("#wrapper");
        jroll.pulldown({
            refresh: function(complete) {
                self.getInteractIndex({"token":self.token},()=>{
                    complete();
                });
            }
        });
    }
}
</script>

