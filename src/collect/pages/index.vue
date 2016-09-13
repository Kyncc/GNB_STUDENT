<template>
    <view-box v-ref:view-box class="collect">

        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">收藏本</x-header>
        </div>
		
        <div style="padding-top:46px;">
            <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in detail">
                 <div class="weui_panel_hd">
                     <x-button type='primary' mini>收藏题</x-button>
                     {{{item.knowledge}}}
                 </div> 
                 <div class="weui_panel_bd">
                    <a class="weui_media_box weui_media_appmsg" href="#!/collect/detail/{{item.id}}">  
                        <div class="weui_media_bd"> 
                            <p class="weui_media_desc">
                                <template v-if="item.pic != '' ? false:true">
                                    {{{item.content}}}
                                 </template>
                                 <template v-else>
                                    <img v-bind:src="item.pic"/>
                                </template>
                            </p> 
                        </div> 
                    </a>
                    
                    <div class="weui_panel_ft" >
                        <flexbox :gutter="0" wrap="wrap">
                            <flexbox-item :span="1/2">收藏时间：{{item.time | ymd}}</flexbox-item>
                            <flexbox-item :span="1/4"></flexbox-item>
                            <template v-if="item.pic != '' ? false:true">
                                <flexbox-item :span="1/4" style="text-align:right"> 难度：{{item.difficult}}</flexbox-item>
                            </template>
                        </flexbox>
                    </div>
                    
                </div>  
            </div>
        </div>

	</view-box>
</template>

<script>
import {XHeader,Panel,Flexbox,FlexboxItem,XButton,ViewBox} from 'vux'


import './collect.less'


const DATA = {
    "code": 1,
    "data":[
        {
            "content": "小敏家、学校、邮局、图书馆坐落在一条东西走向的大街上，依次记为A，B，C，D，学校位于小敏家西150米，邮局位于小敏家东100米，图书馆位于小敏家西400米．\<br\/\>（1）用数轴表示A，B，C，D的位置；\<br\/\>（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？\<br\/\>",
            "difficult": 3,
            "id": 83783,
            "knowledge": "2.5 函数零点判定原理 ",
            "pic": "",
            "time": "1473682257"
	    },
        {
            "content": "小敏家、学校、邮局、图书馆坐落在一条东西走向的大街上，依次记为A，B，C，D，学校位于小敏家西150米，邮局位于小敏家东100米，图书馆位于小敏家西400米．\<br\/\>（1）用数轴表示A，B，C，D的位置；\<br\/\>（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？\<br\/\>",
            "difficult": 3,
            "id": 83783,
            "knowledge": "2.5 函数零点判定原理 ",
            "pic": "http://placeholder.qiniudn.com/640x300",
            "time": "1473682257"
	    },
        {
            "content": "小敏家、学校、邮局、图书馆坐落在一条东西走向的大街上，依次记为A，B，C，D，学校位于小敏家西150米，邮局位于小敏家东100米，图书馆位于小敏家西400米．\<br\/\>（1）用数轴表示A，B，C，D的位置；\<br\/\>（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？\<br\/\>",
            "difficult": 3,
            "id": 83783,
            "knowledge": "2.5 函数零点判定原理 ",
            "pic": "http://placeholder.qiniudn.com/640x300",
            "time": "1473682257"
	    }
    ],
    "msg": 1
}



export default {
    components: {
        XHeader,XButton,
        Panel,Flexbox,FlexboxItem,ViewBox
    },
    methods: {
        
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
