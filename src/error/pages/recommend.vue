<template>
	<view-box v-ref:view-box class="errorRecommend">
		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
			<x-header :left-options="{showBack: true}">
				推荐练习
				<a slot="right" v-touch:tap="_seeAnswer()">
					{{answerText}}
				</a>
			</x-header>
		</div>

		<div style="padding-top:46px;">
			<!--内容-->
			<div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in list">
				<div class="weui_panel_hd">
					<flexbox :gutter="0" wrap="wrap">
						<flexbox-item :span="2/4" style="color:#4bb7aa">练习题{{{$index+1}}}</flexbox-item>
                        <flexbox-item :span="1/4" style="text-align:right;">
                           <template v-if="item.collectTime == '0' ? true:false">
								<span @click="_collectAdd($index,item.id)"><i class="icon iconfont icon-collect"></i>收藏</span>
							</template>
							<template v-if="item.collectTime != '0' ? true:false">
								<span @click="_removeCollect($index,item.id)" class="isCollect"><i class="icon iconfont icon-collect"></i>取消收藏</span>
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

		<infinite-loading :on-infinite="_onInfinite" spinner="default">
			<span slot="no-results" style="color:#4bb7aa;">
				<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
				<p style="font-size:1rem;display:inline-block;">服务器出差了~</p>
			</span>
			<span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已经到底啦~</span>
		</infinite-loading>

		 <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom"  v-show="answerShow">
			<div style="text-align:center;font-size:.8rem;padding-bottom:10px;">
				错题请点击记错呦
			</div>
			<div>
				<checker :value.sync="answer" class="vux-flexbox vux-flex-row" type="checkbox" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
					<checker-item :value="$index+1" class="vux-flexbox-item" style="flex: 0 0 10%;" v-for="item in errorRecommendIds">{{$index+1}}</checker-item>
					<x-button type="primary" @click="_postAnswer()" class="vux-flexbox-item" style="flex: 0 0 25%;">提交 </x-button>
				</checker>
			</div>
        </tabbar>
        
	</view-box>
</template>

<script>
import {Tabbar, TabbarItem,XHeader,Flexbox,FlexboxItem,XButton,ViewBox,Group,Checker,CheckerItem} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import moment from 'moment'
import {period_id,subject_id,token,knowledgeId} from '../../common/getters'
import {errorRecommendIds,errorRecommendList} from '../getters'
import {collectAdd,collectRemove} from '../../common/actions'
import {getErrorRecommendList,postErrorRecommend} from '../actions'
import * as _ from '../../config/whole'
import store from '../../store' 
import './error.less'

export default {
	components: {
		Tabbar,TabbarItem,XHeader,Flexbox,FlexboxItem,XButton,ViewBox,Group,Checker,CheckerItem,InfiniteLoading
	},
	store,
	vuex: {
        getters: {
            period_id,subject_id,token,knowledgeId,errorRecommendIds,errorRecommendList
        },
        actions: {
			collectAdd,collectRemove,getErrorRecommendList,postErrorRecommend
        }
    },
	methods: {
		_correct(id){
			this.$router.go(`/error/correct/${id}`);
		},
		_seeAnswer(){
			if(!this.answerClick) return;
			this.answerShow = !this.answerShow;
			(this.answerText == '解析' ? this.answerText='隐藏':this.answerText='解析');
		},
		_postAnswer(){
			// this.postErrorRecommend();
			let self = this;
			let parm = {
				options:{
					corrects:self.corrects,
					ids:self.errorRecommendIds,
					period_id:self.period_id,
					subject_id:self.subject_id
				},
				token:self.token
			};
			console.log(this.errorRecommendIds);
			this.postErrorRecommend(parm,()=>{
				_.toast("提交成功");
				history.back();
			})
		},
		_startTimeDown(){	//开始倒计时
			let time = 10;
			let self = this;
			let timeDown = setInterval(()=>{
				time--;
				self.answerText = time;
				if(time == '0') {
				clearInterval(timeDown);
					self.answerClick = true;
					self.answerText = '解析';
				};
			},1000);
		},
		_collectAdd(index,id){
			let self =  this;
			this.collectAdd({
				options:{
					id:id,
					period_id:self.period_id,
					subject_id:self.subject_id
				},
				token:self.token,
				type:'example'
			},()=>{
				self.list[index].collectTime = moment().unix();
			});
		},
		_removeCollect(index,id){
			let self =  this;
			this.collectRemove({
				options:{
					id:id,
					period_id:self.period_id,
					subject_id:self.subject_id
				},
				token:self.token,
				type:'example'
			},()=>{
				self.list[index].collectTime = 0;
			});
		},
		_onInfinite(){
			let params = {
				options: {
					ids: this.errorRecommendIds,
					period_id: this.period_id,
					subject_id: this.subject_id
				},
				token: this.token
			};
			this.getErrorRecommendList(params,()=>{
				setTimeout(()=>{
					this.list = this.errorRecommendList;
					if(this.list.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
					this.$broadcast('$InfiniteLoading:complete');
				},300);
			});
		}
	},
	data(){
		return{
			 answerShow: false,
			 list:[],
			 corrects:[],
			 answer: [],
			 answerText:'10',
			 answerClick:false
		} 
	},
	ready(){
		this._startTimeDown();
	},
	watch:{
		answer(){
			this.corrects = new Array(this.errorRecommendIds.length);
			for(let i = 0; i< this.corrects.length;i++){
				this.corrects[i] = '0' ;
			}
			for(let i = 0; i< this.answer.length;i++){
				let index = this.answer[i] - 1;
				this.corrects[index] = '1' ;
			}
		}
	}
}
</script>
