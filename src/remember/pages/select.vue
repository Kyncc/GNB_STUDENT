<template >
    <view-box v-ref:view-box class="rememberSelect">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                选择章节
            </x-header>
        </div>

        <div style="padding-top:46px;">
            <div>
                <header class="sectionHeader">第一章 解三角形<span class="with_arrow"></span></header>
                <group>
                    <cell title="第一章" link="section/1/1"></cell>
                    <cell title="启东中学作业本" link="section/1/2"></cell>
                    <cell title="全科王" link="section/1/3"></cell>
                    <cell title="第一节" class="indent1" link="section/1/1"></cell>
                    <cell title="第一课时" class="indent2" link="section/1/1"></cell>
                    <cell title="第一课时" class="indent3" link="section/1/1"></cell>
                </group>
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
