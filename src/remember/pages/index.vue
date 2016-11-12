<template>
    <view-box v-ref:view-box class="rememberIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
                记错题
                <a slot="right" @click="_change()">
                    {{subjectName}}
                </a>
            </x-header>
        </div>
						
        <div style="padding-top:46px;">
            <group title="必修一">
                <cell title="5年高考三年模拟" link="/remember/select/1"></cell>
                <cell title="启东中学作业本" link="/remember/select/2"></cell>
                <cell title="全科王" link="/remember/select"></cell>
            </group>

            <group title="必修二">
                <cell title="5年高考三年模拟" link="/remember/select"></cell>
                <cell title="启东中学作业本" link="/remember/select"></cell>
                <cell title="全科王" link="/remember/select"></cell>
            </group>

            <group title="必修二">
                <cell title="5年高考三年模拟" link="/remember/select"></cell>
                <cell title="启东中学作业本" link="/remember/select"></cell>
                <cell title="全科王" link="/remember/select"></cell>
            </group>
            
        </div>
    </view-box>
    <gnb-change-sub :visible.sync="visible" :subject="subjectList" :selected="2" @on-click-back="_click"><gnb-change-sub>
    

</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import { XHeader,Panel,ViewBox,Group,Cell,Search} from 'vux'
import { period_id,subject_id,token } from '../../common/getters'
import gnbChangeSub from '../../components/changesub/index.vue'
import '../index.less'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,Search,gnbChangeSub
  },
  methods: {
	_back() {
      this.$router.go('/main');
    },
    _change(){
        this.visible = true;
    },
    _click(item){
        this.subjectName = item.value;
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
  data(){
		return {
			visible:false,
            subjectList:['math','physics'],
            subjectName:'数学'
		}
    },
  ready(){
    
  }
}
</script>


