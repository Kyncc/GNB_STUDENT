<template>
  <div style="height:100%" class="interact">
  <x-header :left-options="{showBack: false}" class="vux-scroller-header">互动</x-header>
  <div id='wrapper' style="padding-bottom:10rem;">
    <div>
      <group style="padding:.5rem 0;">
        <cell title="班级消息" link="/main/interact/message/class/">
          <span class="icon iconfont icon-class" v-bind:class="{'vux-reddot':hasNewClassMsg}"  style="color:#1296DB" slot="icon"></span>
        </cell>
        <cell title="纠错消息" link="/main/interact/message/correct/">
          <span class="icon iconfont icon-correct2" v-bind:class="{'vux-reddot':hasNewCorretMsg}"  style="color:#FF5454" slot="icon"></span>
        </cell>
        <cell title="系统消息" link="/main/interact/message/system/">
          <span class="icon iconfont icon-info" v-bind:class="{'vux-reddot':hasNewSystemMsg}"  style="color:#FFD34E" slot="icon"></span>
        </cell>
      </group>
      <group>
        <cell title="参与归纳本讨论群"   @click="_openQQ">
          <span class="icon iconfont icon-qq1"  style="color:#1296DB" slot="icon"></span>
        </cell>
        <cell title="关注我们的公众号"   @click="show=true">
          <span class="icon iconfont icon-wechat" style="color:#1FDD00" slot="icon"></span>
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
import 'src/common/libs/jroll/jroll-pulldown.js'
import {XHeader,Group,Scroller,Cell,Spinner,Dialog} from 'vux'
import * as _ from 'config/whole'
import { mapActions,mapGetters } from 'vuex'

export default {
  components: {
    XHeader,Scroller,Group,Cell,Spinner,Dialog
  },
  route: {
    data:function(transition){
      //检测是否已加载消息模块
      if(this.$store.state.message){
       this.clearMessage()
      }
      this.getInteract();
    }
  },
  methods: {
    ...mapActions(['getInteract','clearMessage']),
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
      this.getInteract()
      .then(()=>{
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
  computed:{
    ...mapGetters(['hasNewClassMsg','hasNewCorretMsg','hasNewSystemMsg'])
	},
  ready(){
    let self = this
    // this.getInteract();
    var jroll = new JRoll("#wrapper");
    jroll.pulldown({
      refresh: function(complete) {
        self.getInteract()
        .then(()=>{
          complete();
        });
      }
    });
  }
}
</script>

