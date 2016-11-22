<template>
    <div style="height:100%">
        <x-header :left-options="{showBack: false}" class="vux-scroller-header">消息</x-header>
        <div id='wrapper' style="height:100%">
            <group>
                <cell title="班级消息" link="../message/class" :inline-desc='messageIndex.classMsgNew' >
                    <div class="tap-highlight" v-bind:class="{'vux-reddot':messageIndex.hasNewClassMsg}" slot="icon" style="margin-right:.5em;" >
                        <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/class.png">
                    </div>
                </cell>
                <cell title="纠错消息" link="../message/correct" :inline-desc='messageIndex.correctMsgNew' >
                    <div class="tap-highlight" class="tap-highlight" v-bind:class="{'vux-reddot':messageIndex.hasNewCorretMsg}" slot="icon" style="margin-right:.5em;" >
                        <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/correct.png">
                    </div>
                </cell>
                <cell title="系统消息" link="../message/system" :inline-desc='messageIndex.systemMsgNew' >
                    <div class="tap-highlight"  v-bind:class="{'vux-reddot':messageIndex.hasNewSystemMsg}" slot="icon" style="margin-right:.5em;" >
                        <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/system.png">
                    </div>
                </cell>
                <cell title="加入我们" inline-desc='QQ群:458410557' link="javascript:;" v-touch:tap="_openQQ">
                    <div class="tap-highlight"  slot="icon" style="margin-right:.5em;" >
                        <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/add.png">
                    </div>
                </cell>
                <cell title="关注我们" inline-desc='微信公众号:guina_book'  @click="show=true">
                    <div class="tap-highlight"  slot="icon" style="margin-right:.5em;" >
                        <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/focus.png">
                    </div>
                </cell>
            </group>

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
<style>
.homepage>.weui_tab>.weui_tab_bd.vux-fix-safari-overflow-scrolling>div{
    height: 100%;
}
</style>
