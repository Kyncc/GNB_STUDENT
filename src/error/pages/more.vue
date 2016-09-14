<template>
	<view-box v-ref:view-box class="errorDetail">

		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
			<x-header :left-options="{showBack: true}">更多例题</x-header>
		</div>

		<div style="padding-top:46px;">
			<!--内容-->
			<div class="weui_panel weui_panel_access exerciseDetail">
				<div class="weui_panel_hd">
					<flexbox :gutter="0" wrap="wrap">
						<flexbox-item :span="2/4" style="color:#4bb7aa">1/7</flexbox-item>
                        <flexbox-item :span="1/4" style="text-align:right;">
							<template v-if="item.isCollect == 1 ? true:false">
								<span style="color:orange"><i class="icon iconfont icon-collect"></i>已收藏</span>
							</template>
							<template v-else>
								<span><i class="icon iconfont icon-collect"></i>收藏</span>
							</template>
                        </flexbox-item>
                        <flexbox-item :span="1/4" style="text-align:right" v-touch:tap="_correct"><i class="icon iconfont icon-error-login"></i>纠错</flexbox-item>
					</flexbox>				
				</div>
				<!--题目整体--> 
				<div class="weui_panel_bd"> 
					<!--题目-->
					<div class="weui_media_bd weui_media_box "> 
						<p class="weui_media_desc">
							{{{* detail.content }}}
						</p>
					</div> 
					<!--选项-->
					<template v-if=" detail.type == 1 ? true:false">
						<div class="weui_media_bd weui_media_box options">
							<p class="weui_media_desc" v-for="value in detail.tabs"> 
									{{ $key }} : {{{* value }}}
							</p>
						</div>  
					</template>
				</div>
			</div>
			<!--解析--> 
			<div class="weui_panel weui_panel_access exerciseDetail">
				<div class="weui_panel_hd">
					<flexbox :gutter="0" wrap="wrap">
						<flexbox-item :span="2/5" style="color:#4bb7aa">本题解析：</flexbox-item>
					</flexbox>				
				</div> 
				<!--解析主体--> 
				<div class="weui_panel_bd"> 
					<div class="weui_media_bd weui_media_box "> 
						<p class="weui_media_desc">
							{{{* detail.answer }}}
						</p>
					</div> 
				</div>
			</div>
		</div>

       

	</view-box>
</template>

<script>
import {XHeader,Flexbox,FlexboxItem,XButton,ViewBox} from 'vux'
import './error.less'

const DATA = {
    "code": 1,
    "data":{
            "content": "小敏家、学校、邮局、图书馆坐落在一条东西走向的大街上，依次记为A，B，C，D，学校位于小敏家西150米，邮局位于小敏家东100米，图书馆位于小敏家西400米．\<br\/\>（1）用数轴表示A，B，C，D的位置；\<br\/\>（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？\<br\/\>",
            "difficult": 3,
            "id": 83783,
            "isCollect": 1,
            "knowledge": "2.5 函数零点判定原理",
			"knowledgeId": 12,
			"isCollect":0,
            "time": "1473682257",
			"tabs":{
				 A: '(-4.2)',
				 B: '(-4.2)',
				 C: '(-4.2)',
				 D: '(-4.2)'
			},
			"type":1,
			"answer":"小敏家、学校、邮局、图书馆坐落在一条东西走向的大街上，依次记为A，B，C，D，学校位于小敏家西150米，邮局位于小敏家东100米，图书馆位于小敏家西400米．\<br\/\>（1）用数轴表示A，B，C，D的位置；\<br\/\>（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？\<br\/\>"
	},
    "msg": 1
}


export default {
	components: {
		XHeader,Flexbox,FlexboxItem,XButton,ViewBox
	},
	methods: {
		_errorList(){
			 this.$router.go('/error/list/'+this.detail.knowledgeId)
		},
		_more(){
			this.$router.go('/error/more/'+this.detail.knowledgeId)
		},
		_recommend(){
			this.$router.go('/error/recommend/'+this.detail.knowledgeId);
		},
		_correct(){
			this.$router.go('/error/correct/'+this.detail.id);
		},
		onAction:(type)=>{
			alert(type);
		}
	},
	data(){
		return{
			 ashow: false,
			 detail:DATA.data
		} 
	},
}
</script>
