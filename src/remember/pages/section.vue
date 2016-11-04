<template >
    <view-box v-ref:view-box class="rememberSelect">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                第一课时
            </x-header>
        </div>
						
        <div style="padding-top:46px;">
            <div>
               
            </div>
        </div>
    </view-box>
    

</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import { XHeader,Panel,ViewBox,Group,Cell} from 'vux'
import { period_id,subject_id,token } from '../../common/getters'
import '../index.less'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell
  },
  methods: {
	
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
		}
	},
  ready(){
    
  }
}
</script>


