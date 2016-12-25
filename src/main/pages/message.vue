<template>
  <div style="height:100%" class="Message">
    <x-header :left-options="{showBack: false}" class="vux-scroller-header">消息</x-header>
    <div id='wrapper' style="padding-bottom:100px;">
      <div>
        <group style="padding-bottom:15px;">
          <cell title="班级消息" link="../message/class/">
            <span class="icon iconfont icon-userInfo" v-bind:class="{'vux-reddot':messageIndex.hasNewClassMsg}"  style="color:#5ECFE7" slot="icon"></span>
          </cell>
          <cell title="纠错消息" link="../message/correct/">
            <span class="icon iconfont icon-userInfo" v-bind:class="{'vux-reddot':messageIndex.hasNewCorretMsg}"  style="color:#5ECFE7" slot="icon"></span>
          </cell>
          <cell title="系统消息" link="../message/system/">
            <span class="icon iconfont icon-userInfo" v-bind:class="{'vux-reddot':messageIndex.hasNewSystemMsg}"  style="color:#5ECFE7" slot="icon"></span>
          </cell>
        </group>
        <group>
          <cell title="参与归纳本讨论群"  link="javascript:;"  @v-touch:tap="_openQQ">
            <span class="icon iconfont icon-userInfo" v-bind:class="{'vux-reddot':messageIndex.hasNewClassMsg}"  style="color:#5ECFE7" slot="icon"></span>
          </cell>
          <cell title="关注我们的公众号" link="javascript:;"  @click="show=true">
            <span class="icon iconfont icon-userInfo" v-bind:class="{'vux-reddot':messageIndex.hasNewClassMsg}"  style="color:#5ECFE7" slot="icon"></span>
          </cell>
        </group>
      </div>
    </div>

    <dialog :show.sync="show" class="dialog-demo" @click="show=false">
        <div class="img-box">
            <img src="../../assets/main/ewm.jpg" style="max-width:100%">
        </div>
        <span class="vux-close">截屛到微信中识别二维码</span>
    </dialog>
  </div>
</template>

<script>
import store from '../../store'
import JRoll from 'jroll'
import '../../common/pulldown.js'
import {XHeader,Group,Scroller,Cell,Spinner,Dialog} from 'vux'
import { token } from '../../common/getters'
import { messageIndex } from '../../message/getters'
import { getMessageIndex} from '../../message/actions'
import * as _ from '../../config/whole'
import './main.less'


export default {
    components: {
        XHeader,Scroller,Group,Cell,Spinner,Dialog
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
        let self = this
        self.getMessageIndex({"token":localStorage.getItem('token')});
        var jroll = new JRoll("#wrapper");
        jroll.pulldown({
            refresh: function(complete) {
                self.getMessageIndex({"token":localStorage.getItem('token')},()=>{
                    complete();
                });
            }
        });
    }
}
</script>

