<template>
	<view-box v-ref:view-box class="errorDetail">

		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
			<x-header :left-options="{showBack: true}">
				更多例题
				<a slot="right" href="javascript:;" @click="showPopupPicker = true">选择例题</a>
			</x-header>
		</div>

		<div style="padding-top:46px;">
			<template v-for="item in list">
				<!--内容-->
				<div class="weui_panel weui_panel_access exerciseDetail">
					<div class="weui_panel_hd">
						<flexbox :gutter="0" wrap="wrap">
							<flexbox-item :span="2/4" style="color:#4bb7aa">{{index}}/{{count}}</flexbox-item>
							<flexbox-item :span="1/4" style="text-align:right;">
								<template v-if="item.collectTime == '0' ? true:false">
									<span @click="_collectAdd(item.id)"><i class="icon iconfont icon-collect"></i>收藏</span>
								</template>
								<template v-if="item.collectTime != '0' ? true:false">
									<span @click="_removeCollect(item.id)" class="isCollect"><i class="icon iconfont icon-collect"></i>取消</span>
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
				</div>
				<!--解析--> 
				<div class="weui_panel weui_panel_access exerciseDetail">
					<div class="weui_panel_hd">
						<flexbox :gutter="0" wrap="wrap">
							<flexbox-item :span="2/5" style="color:#4bb7aa">解析</flexbox-item>
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
			</template>
		</div>
		
		<infinite-loading :on-infinite="_onInfinite" spinner="default">
			<span slot="no-results" style="color:#4bb7aa;">
				<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
				<p style="font-size:1rem;display:inline-block;">服务器发生一点小问题~</p>
			</span>
			<span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)阅读完毕</span>
		</infinite-loading>

		<popup-picker :show.sync="showPopupPicker" :show-cell="false" title="TEST" :data="selectIndex" :value.sync="selectData"></popup-picker>	
	</view-box>
</template>

<script>
import {XHeader,Flexbox,FlexboxItem,XButton,ViewBox,PopupPicker} from 'vux'
import moment from 'moment'
import {period_id,subject_id,token,id} from '../../common/getters'
import { errorMoreIds,errorMoreList } from '../getters'
import { collectAdd,collectRemove } from '../../common/actions'
import { getErrorMoreIds,getErrorMoreList } from '../actions'
import store from '../../store' 
import InfiniteLoading from 'vue-infinite-loading'

export default {
	components: {
		XHeader,Flexbox,FlexboxItem,XButton,ViewBox,PopupPicker,InfiniteLoading
	},
	methods: {
		_correct(){
			this.$router.go(`/error/correct/${this.id}`);
		},
		_getData(){
			 let params = {
				options: {
					ids: [this.id],
					period_id: this.period_id,
					subject_id: this.subject_id
				},
				token: this.token
			};
			this.getErrorMoreList(params);
			window.scrollTo(0,0); 
		},
		_collectAdd(id){
			let self =  this;
			this.collectAdd({
				options:{
					id:self.id,
					period_id:self.period_id,
					subject_id:self.subject_id
				},
				token:self.token,
				type:'example'
			},()=>{
				self.list[0].collectTime = moment().unix();
			});
		},
		_removeCollect(id){
			let self =  this;
			this.collectRemove({
				options:{
					id:self.id,
					period_id:self.period_id,
					subject_id:self.subject_id
				},
				token:self.token,
				type:'example'
			},()=>{
				self.list[0].collectTime = 0;
			});
		},
		_onInfinite(){
			let params = {
				options: {
					ids: [this.id],
					period_id: this.period_id,
					subject_id: this.subject_id
				},
				token: this.token
			};
			this.getErrorMoreList(params,()=>{
				setTimeout(()=>{
					this.list = this.errorMoreList;
					if(this.list.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
					this.$broadcast('$InfiniteLoading:complete');
				},300);
			});
		}
	},
	store,
	vuex: {
        getters: {
            period_id,subject_id,token,id,errorMoreIds,errorMoreList
        },
        actions: {
			getErrorMoreIds,getErrorMoreList,collectAdd,collectRemove
        }
    },
	data(){
		return{
			 showPopupPicker: false,
			 list:[],
			 selectData:[]
		}
	},
	computed:{
		knowledgeId(){
			return store.state.route.params.knowledgeId;
		},
		count(){
			//例题数量
			return this.errorMoreIds.length;
		},
		index(){
			//当前题目索引
			return (this.errorMoreIds.indexOf(Number(this.id))+1);
		},
		selectIndex(){
			//选择题目的索引
			let arr= [];
			for(let i = 0; i< this.count;i++){
				arr.push({name:`第${i+1}题`,value:this.errorMoreIds[i]});
			}
			return [arr];
		}
	},
	watch:{
		selectData(val){
			this.$router.replace(`/error/more/${this.knowledgeId}/${Number(val)}`);
		},
		id(){
			this.list = [];
			this.$nextTick(() => {
				this.$broadcast('$InfiniteLoading:reset');
			});
			// this._getData();	
		}
	},
	ready(){
		// this._getData();
	}
}
</script>
