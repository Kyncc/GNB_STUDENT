<template>
    <view-box v-ref:view-box class="collect">

        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">收藏本</x-header>
            <flexbox style="padding:10px 0;background:#edf2f1;" class="vux-center">
                <flexbox-item :span="3/4">
                    <button-tab >
                        <button-tab-item v-touch:tap="_example">例题收藏</button-tab-item>
                        <button-tab-item selected>错题收藏</button-tab-item>
                    </button-tab >
                </flexbox-item>
            </flexbox>
        </div>
		
        <div style="padding-top:98px;">
            <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in detail">
                 <div class="weui_panel_hd">
                     <x-button type='primary' mini>收藏题</x-button>
                     {{{item.knowledge}}}
                 </div> 
                 <div class="weui_panel_bd">
                    <a class="weui_media_box weui_media_appmsg" href="#!/collect/camera/detail/{{item.id}}">  
                        <div class="weui_media_bd"> 
                            <p class="weui_media_desc">
                                <img v-bind:src="item.pic" width="640" height="150"/>
                            </p> 
                        </div> 
                    </a>
                    <div class="weui_panel_ft" >
                        <flexbox :gutter="0" wrap="wrap">
                            <flexbox-item :span="1/2">收藏时间：{{item.cameraTime | ymd}}</flexbox-item>
                        </flexbox>
                    </div>
                </div>  
            </div>
        </div>

	</view-box>
</template>

<script>
import {XHeader,Panel,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem} from 'vux'

const DATA = {
    "code": 1,
    "data":[
        {
            "difficult": 3,
            "id": 83783,
            "knowledge": "2.5 函数零点判定原理 ",
            "knowledgeId":31,
            "pic":"http://placeholder.qiniudn.com/640x300",
            "cameraTime": "1473682257"
	    },
        {
            "difficult": 3,
            "id": 83783,
            "knowledge": "2.5 函数零点判定原理 ",
            "knowledgeId":31,
            "pic":"http://placeholder.qiniudn.com/640x300",
            "cameraTime":"1473682257"
	    }
    ],
    "msg": 1
}


export default {
    components: {
        XHeader,XButton,
        Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem
    },
    methods: {
        _example(){
            this.$router.go(`/collect/example`);
        }
    },
    data(){
        return{
            detail:DATA.data
        }
    },
    computed:{

    }
}
</script>
