<template>
	<view-box v-ref:view-box class="errorRecommend">
		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
			<x-header :left-options="{showBack: true}">
				推荐练习
				<a slot="right" v-touch:tap="_seeAnswer()">
					{{answerText}}
				</a>
			</x-header>
			<!--<group class="currentTime">
				离查看解析还有20秒
    		</group>-->
		</div>

		<div style="padding-top:46px;">
			<!--内容-->
			<div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in exerciseList">
				<div class="weui_panel_hd">
					<flexbox :gutter="0" wrap="wrap">
						<flexbox-item :span="2/4" style="color:#4bb7aa">练习题{{{$index+1}}}</flexbox-item>
                        <flexbox-item :span="1/4" style="text-align:right;">
                           <template v-if="item.isCollect == 1 ? true:false">
								<span style="color:orange"><i class="icon iconfont icon-collect"></i>已收藏</span>
							</template>
							<template v-else>
								<span><i class="icon iconfont icon-collect"></i>收藏</span>
							</template>
                        </flexbox-item>
                        <flexbox-item :span="1/4" style="text-align:right" v-touch:tap="_correct(item.id)" ><i class="icon iconfont icon-error-login"></i>纠错</flexbox-item>
					</flexbox>				
				</div>
				<!--题目整体--> 
				<div class="weui_panel_bd" > 
					<!--题目-->
					<div class="weui_media_bd weui_media_box "> 
						<p class="weui_media_desc">
							{{{* item.content }}}
						</p>
					</div> 
					<!--选项-->
					<template v-if=" item.type == 1 ? true:false">
						<div class="weui_media_bd weui_media_box options">
							<p class="weui_media_desc" v-for="value in item.tabs"> 
									{{ $key }} : {{{* value }}}
							</p>
						</div>  
					</template>
				</div>
				
				<div class="weui_panel weui_panel_access exerciseDetail" v-show="answerShow">
					<div class="weui_panel_hd">
						<flexbox :gutter="0" wrap="wrap">
							<flexbox-item :span="2/5" style="color:#4bb7aa">本题解析：</flexbox-item>
						</flexbox>				
					</div> 
					<!--解析主体--> 
					<div class="weui_panel_bd"> 
						<div class="weui_media_bd weui_media_box "> 
							<p class="weui_media_desc">
								{{{* item.answer }}}
							</p>
						</div> 
					</div>
				</div>

			</div>
		</div>

		 <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom"  v-show="answerShow">
			<div style="text-align:center;font-size:.8rem;padding-bottom:10px;">
				错题请点击记错呦
			</div>
			<div >
				<checker :value.sync="demo2" class="vux-flexbox vux-flex-row" type="checkbox" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
					<checker-item value="1" class="vux-flexbox-item" style="flex: 0 0 10%;">1</checker-item>
					<checker-item value="2" class="vux-flexbox-item" style="flex: 0 0 10%;">2</checker-item>
					<checker-item value="3" class="vux-flexbox-item" style="flex: 0 0 10%;">3</checker-item>
					<checker-item value="4" class="vux-flexbox-item" style="flex: 0 0 10%;">4</checker-item>
					<checker-item value="5" class="vux-flexbox-item" style="flex: 0 0 10%;">5</checker-item>
					<x-button type="primary"  class="vux-flexbox-item" style="flex: 0 0 25%;">提交 </x-button>
				</checker>
			</div>
        </tabbar>
        
	</view-box>
</template>

<script>
import {Tabbar, TabbarItem,XHeader,Flexbox,FlexboxItem,XButton,ViewBox,Group,Checker,CheckerItem} from 'vux'
import './error.less'


const DATA = {
    "code": 1,
    "data":
		[
			{
				"content": "小敏家、学校、邮局、图书馆坐落在一条东西走向的大街上，依次记为A，B，C，D，学校位于小敏家西150米，邮局位于小敏家东100米，图书馆位于小敏家西400米．\<br\/\>（1）用数轴表示A，B，C，D的位置；\<br\/\>（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？\<br\/\>",
				"difficult": 3,
				"id": 321,
				"isCollect": 1,
				"knowledge": "2.5 函数零点判定原理",
				"knowledgeId": 12,
				"isCollect":1,
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
			{
				"content": "小敏家、学校、邮局、图书馆坐落在一条东西走向的大街上，依次记为A，B，C，D，学校位于小敏家西150米，邮局位于小敏家东100米，图书馆位于小敏家西400米．\<br\/\>（1）用数轴表示A，B，C，D的位置；\<br\/\>（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？\<br\/\>",
				"difficult": 3,
				"id": 321,
				"isCollect": 1,
				"knowledge": "2.5 函数零点判定原理",
				"knowledgeId": 12,
				"isCollect":1,
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
			{
				"content": "小敏家、学校、邮局、图书馆坐落在一条东西走向的大街上，依次记为A，B，C，D，学校位于小敏家西150米，邮局位于小敏家东100米，图书馆位于小敏家西400米．\<br\/\>（1）用数轴表示A，B，C，D的位置；\<br\/\>（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？\<br\/\>",
				"difficult": 3,
				"id": 321,
				"isCollect": 1,
				"knowledge": "2.5 函数零点判定原理",
				"knowledgeId": 12,
				"isCollect":1,
				"time": "1473682257",
				"tabs":{
					A: '(-4.2)',
					B: '(-4.2)',
					C: '(-4.2)',
					D: '(-4.2)'
				},
				"type":1,
				"answer":"小敏家、学校、邮局、图书馆坐落在一条东西走向的大街上，依次记为A，B，C，D，学校位于小敏家西150米，邮局位于小敏家东100米，图书馆位于小敏家西400米．\<br\/\>（1）用数轴表示A，B，C，D的位置；\<br\/\>（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？\<br\/\>"
			}
		]
	,
    "msg": 1
}



export default {
	components: {
		Tabbar, TabbarItem,XHeader,Flexbox,FlexboxItem,XButton,ViewBox,Group,
		 Checker,CheckerItem
	},
	methods: {
		_correct(id){
			this.$router.go(`/error/correct/${id}`);
		},
		_seeAnswer(){
			if(!this.answerClick) return;
			this.answerShow = !this.answerShow;
			(this.answerText == '解析' ? this.answerText='隐藏':this.answerText='解析');
		}
	},
	data(){
		return{
			 answerShow: false,
			 exerciseList:DATA.data,
			 demo2: [],
			 answerText:'10',
			 answerClick:false
		} 
	},
	ready(){
		let time = 10;
        let _this = this;
        let timeDown = setInterval(()=>{
			time--;
			_this.answerText = time;
            if(time == '0') {
              clearInterval(timeDown);
			  _this.answerClick = true;
              _this.answerText = '解析';
            };
        },1000);

	}
}
</script>

<style scoped>
.weui_tabbar{
	display:block;padding:3%; 
	box-sizing: border-box;
}
.weui_tab_bd{padding-bottom:100px;}
.demo2-item {
  height: 40px;
  border: 1px solid #4bb7aa;
  display: inline-block;
  line-height: 40px;
  text-align: center;
  color: #4bb7aa;
  background-color: #fff;
  margin-right:4.5%;
  
}
.demo2-item-selected {
  background-color: #4bb7aa;
  color:#fff;
}
</style>