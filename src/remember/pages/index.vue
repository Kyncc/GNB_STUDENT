<template >
    <view-box v-ref:view-box class="rememberIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
                记错题
                <a slot="right" link="/remember/1">
                    <i class="icon iconfont icon-plus" style="font-size:1.5rem;position: relative;top:-.1rem;right:-.5rem;"></i>
                </a>
            </x-header>
        </div>

        <div style="padding-top:46px;">
            <group title="必修一">
                <cell title="5年高考三年模拟" link="/remember/1"></cell>
                <cell title="启东中学作业本" link="/remember/1"></cell>
                <cell title="全科王" link="/remember/1"></cell>
            </group>

            <group title="必修二">
                <cell title="5年高考三年模拟" ></cell>
                <cell title="启东中学作业本" ></cell>
                <cell title="全科王" ></cell>
            </group>

            <group title="必修二">
                <cell title="5年高考三年模拟" ></cell>
                <cell title="启东中学作业本" ></cell>
                <cell title="全科王" ></cell>
            </group>
            
        </div>
    </view-box>
    <mt-popup :visible="true" popup-transition="popup-fade" class="mint-popup-1" :style="{ top: buttonBottom + 10 + 'px' }">
      <p>数学</p>
      <p>物理</p>
      <p>化学</p>
    </mt-popup>

</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import { Popup } from 'mint-ui';
import { XHeader,Panel,ViewBox,Group,Cell,Search} from 'vux'
import { period_id,subject_id,token } from '../../common/getters'
import '../index.less'


Vue.component('mt-popup', Popup);  
export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,Search
  },
  methods: {
	_back() {
      this.$router.go('/main');
    }
  },
  vuex: {
    getters:{
        period_id,subject_id,token
    },
    actions:{

    }
  },
  store,
  ready(){
    
  }
}
</script>


<style>
.mint-popup-1{
    width: 5rem;
    border-radius: 8px;
    padding: 10px;
    transform: translate(-50%, 0);
    p{margin-bottom: .5rem;font-size:.8rem;}
}
.mint-popup-1:before {
display: inline-block;
width: 0;
height: 0;
border: solid transparent;
border-width:.5rem;
border-bottom-color: #fff;
content: '';
position: absolute;
top: -1rem;
right: 1rem;
}
</style>