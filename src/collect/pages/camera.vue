<template>
    <view-box v-ref:view-box class="collect">

        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">收藏本</x-header>
            <flexbox style="padding:10px 0;background:#edf2f1;" class="vux-center">
                <flexbox-item :span="3/4">
                    <button-tab>
                        <button-tab-item v-touch:tap="_example">习题收藏</button-tab-item>
                        <button-tab-item selected>错题收藏</button-tab-item>
                    </button-tab>
                </flexbox-item>
            </flexbox>
        </div>
		
        <div style="padding-top:98px;">
            <div class="weui_panel weui_panel_access exerciseExampleList"  v-for="item in detail">
                 <div class="weui_panel_hd">
                     <x-button type='primary' mini>收藏题</x-button>
                     {{{item.knowledge}}}
                 </div> 
                 <div class="weui_panel_bd">
                    <a class="weui_media_box weui_media_appmsg" href="javascript:;">  
                        <div class="weui_media_bd"> 
                            <p class="weui_media_desc">
                                <img v-bind:src="item.pic" width="640" height="150"/>
                            </p> 
                        </div> 
                    </a>
                    <div class="weui_panel_ft" >
                        <flexbox :gutter="0" wrap="wrap">
                            <flexbox-item :span="1/2">收藏时间：{{item.cameraTime | ymd}}</flexbox-item>
                            <flexbox-item :span="1/4"></flexbox-item>
                            <flexbox-item :span="1/4" style="text-align:right;" v-touch:tap="_remove($key)">
                                <span style="color:green"><i class="icon iconfont icon-clear"></i>移除</span>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </div>  
            </div>
        </div>
	</view-box>
    <confirm :show.sync="show" confirm-text="是" cancel-text="否" title="确定将此题移除收藏么?" @on-confirm="_onAction().bind(this)"></confirm>
</template>

<script>
import {XHeader,Panel,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem,Confirm} from 'vux'
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store' 
import { period_id,subject_id,token } from '../../common/getters'
import { CollectCameraIds,CollectCameraList } from '../getters'
import { getCollectCameraIds,getCollectCameraList } from '../actions'

const DATA = {
    "code": 1,
    "data":{
        83783:{
            "difficult": 3,
            "id": 83783,
            "knowledge": "2.5 函数零点判定原理 ",
            "knowledgeId":31,
            "pic":"http://placeholder.qiniudn.com/640x300",
            "cameraTime": "1473682257"
	    },
        83784:{
            "difficult": 3,
            "id": 83783,
            "knowledge": "2.5 函数零点判定原理 ",
            "knowledgeId":31,
            "pic":"http://placeholder.qiniudn.com/640x300",
            "cameraTime":"1473682259"
	    }
    },
    "msg": 1
}


export default {
    components: {
        XHeader,XButton,
        Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem,Confirm
    },
    methods: {
        _example(){
            this.$router.go(`/collect/example`);
        },
        _remove(key){
            this.removeId = key;
			this.show = true
		},
        _onAction(){
			alert(this.removeId);
		}
    },
    vuex: {
        getters: {
            period_id,subject_id,token,
            CollectCameraIds,CollectCameraList
        },
        actions: {
            getCollectCameraIds,
            getCollectCameraList
        }
    },
    store,
    data(){
        return{
            show: false,
            detail:DATA.data,
            removeId:''
        }
    },
   ready(){
        let params =  {
            currentPage:1,
            token:this.token,
            options:{
                period_id:this.period_id,
                subject_id:this.subject_id
            }
        };
        let that = this;

        //根据索引获取题目
        this.getCollectCameraIds(
            params,(ret) => {
                let params = {
                    options:{
                        ids:ret.ids,
                        period_id:that.period_id,
                        subject_id:that.subject_id
                    }
                };
                that.getCollectCameraList(params);
           }
        );
    }
}
</script>
