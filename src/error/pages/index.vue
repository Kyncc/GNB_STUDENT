<template>
    <view-box v-ref:view-box class="collect">

        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
           <x-header :left-options="{showBack: true}">错题归纳</x-header>
           <flexbox style="padding:10px 0;background:#edf2f1;" class="vux-center">
                <flexbox-item :span="3/4">
                    <button-tab>
                        <button-tab-item v-touch:tap="_time('week')" selected>一周内</button-tab-item>
                        <button-tab-item v-touch:tap="_time('month')">一月内</button-tab-item>
                        <button-tab-item v-touch:tap="_time('all')">全部</button-tab-item>
                     </button-tab>
                </flexbox-item>
            </flexbox>
        </div>

        <div style="margin-top:98px;">
            <scroller lock-x scrollbar-y use-pullup :pullup-status.sync="pullupStatus" @pullup:loading="load" height="300px">
                <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in detail">
                    <div class="weui_panel_hd">
                        <x-button type='primary' mini>参考例题</x-button>
                        {{{item.knowledge}}}
                    </div> 
                    <div class="weui_panel_bd">
                        <a class="weui_media_box weui_media_appmsg" href="#!/error/detail/{{item.id}}">  
                            <div class="weui_media_bd"> 
                                <p class="weui_media_desc">
                                    {{{item.content}}}
                                </p> 
                            </div> 
                        </a>
                        <div class="weui_panel_ft" >
                            <flexbox :gutter="0" wrap="wrap">
                                <flexbox-item :span="1/2">难度：{{item.difficult}} </flexbox-item>
                                <flexbox-item :span="1/4"></flexbox-item>
                                <flexbox-item :span="1/4" style="text-align:right">错误{{item.errorCount}}次 </flexbox-item>
                            </flexbox>
                        </div>
                    </div>  
                </div>
                <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
                    <span v-show="pullupStatus === 'default'"></span>
                    <span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">↑</span>
                    <span v-show="pullupStatus === 'loading'"><spinner type="lines"></spinner></span>
                </div>
            </scroller>
        </div>

	</view-box>
</template>

<script>
import {XHeader,Panel,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem,Scroller,Spinner} from 'vux'
import store from '../../store' 
import { period_id,subject_id,token } from '../../common/getters'
import { errorIndexIds,errorIndexList } from '../getters'
import { getErrorIds,getErrorList } from '../actions'
import moment from 'moment'

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
        XHeader,XButton,Scroller,Spinner,
        Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem
    },
    data(){
        return{
            detail:DATA.data,
            startTime:moment().unix(),
            endTime:moment().add(-7, 'd').unix(),
            pullupStatus: 'default'
        }
    },
    methods: {
        _time(value){
            if(value == 'week'){
                this.startTime = moment().unix();
                this.endTime = moment().add(-7, 'd').unix();
            }else if(value == 'month'){
                this.startTime = moment().unix();
                this.endTime = moment().add(-1, 'M').unix();
            }else{
                this.startTime = moment().unix();
                this.endTime = moment().add(-3, 'M').unix();
            }
        },
        load (uuid) {
			setTimeout(() => {
				this.$broadcast('pullup:reset', uuid);
                // this.getMessageIndex({"token":this.token});
			}, 1000)
		}
    },
    vuex: {
        getters: {
            period_id,subject_id,token,
            errorIndexIds,errorIndexList
        },
        actions: {
            getErrorIds,
            getErrorList
        }
    },
    store,
    computed:{

    }
}
</script>

<style lang="less" scoped>
.rotate {
  display: inline-block;
  transform: rotate(-180deg);
}
.pullup-arrow {
  transition: all linear 0.5s;
  color: #666;
  font-size: 25px;
}
</style>