<template>
    <view-box v-ref:view-box class="cameraHistory">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">拍题记录</x-header>
        </div>

        <div style="margin-top:46px;">

        </div>
	</view-box>
</template>

<script>
import {XHeader,Panel,ViewBox} from 'vux'

const DATA = {
    "code": 1,
    "data":[
        {
            "content": "小敏家、学校、邮局、图书馆坐落在一条东西走向的大街上，依次记为A，B，C，D，学校位于小敏家西150米，邮局位于小敏家东100米，图书馆位于小敏家西400米．\<br\/\>（1）用数轴表示A，B，C，D的位置；\<br\/\>（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？\<br\/\>",
            "difficult": 3,
            "id": 83783,
            "knowledge": "2.5 函数零点判定原理 ",
            "knowledgeId": 31,
            "time": "1473682257",
            "errorCount":3
	    },
        {
            "content": "小敏家、学校、邮局、图书馆坐落在一条东西走向的大街上，依次记为A，B，C，D，学校位于小敏家西150米，邮局位于小敏家东100米，图书馆位于小敏家西400米．\<br\/\>（1）用数轴表示A，B，C，D的位置；\<br\/\>（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？\<br\/\>",
            "difficult": 3,
            "id": 83783,
            "knowledge": "2.5 函数零点判定原理 ",
            "knowledgeId": 31,
            "time": "1473682257",
            "errorCount":3
	    },
        {
             "content": "小敏家、学校、邮局、图书馆坐落在一条东西走向的大街上，依次记为A，B，C，D，学校位于小敏家西150米，邮局位于小敏家东100米，图书馆位于小敏家西400米．\<br\/\>（1）用数轴表示A，B，C，D的位置；\<br\/\>（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？\<br\/\>",
            "difficult": 3,
            "id": 83783,
            "knowledge": "2.5 函数零点判定原理 ",
            "knowledgeId": 31,
            "time": "1473682257",
            "errorCount":3
	    }
    ],
    "msg": 1
}


export default {
    components: {
       XHeader,Panel,ViewBox
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
