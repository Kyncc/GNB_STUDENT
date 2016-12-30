<template>
	<view-box v-ref:view-box class="errorRecommend">
		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
			<x-header :left-options="{showBack: true}">
				相近例题
			</x-header>
			<div class="exerciseSelected">
				<checker :value.sync="selected" default-item-class="selectItem" selected-item-class="recommendSelected">
					<checker-item v-for="i in itemList" :value="i">{{i}}</checker-item>
    			</checker>
			</div>
		</div>

		<div style="padding-top:100px;">
			<!--内容-->
			<template v-if="list.length !=0 ">
				<div class="weui_panel weui_panel_access exerciseExampleList">
					<div class="weui_panel_hd">
						<flexbox :gutter="0" wrap="wrap">
							<p style="width:25%;color:#4bb7aa">题干</p>
							<p style="width:50%;text-align:right;">
								<template v-if="item.collectTime != '0' ? true:false">
									<span @click="_removeCollect(item.id)" style="color:#666;text-align:right" ><i class="icon iconfont icon-collect"></i>取消</span>
								</template>
								<template v-if="item.collectTime == '0' ? true:false">
									<span @click="_collectAdd(item.id)" style="color:#666;text-align:right"><i class="icon iconfont icon-collect"></i>收藏</span>
								</template>
							</p>
							<p style="width:25%;text-align:right" v-touch:tap="_correct"> 
								<i class="icon iconfont icon-error-login"></i>纠错
							</p>
						</flexbox>				
					</div>
					<!--题目整体--> 
					<div class="weui_panel_bd" > 
						<!--题目-->
						<div class="weui_media_bd weui_media_box "> 
							<p class="weui_media_desc">
								{{{ item.content }}}
							</p>
						</div> 
						<!--选项-->
						<template v-if=" item.type == 1 ? true:false">
							<div class="weui_media_bd weui_media_box options">
								<p class="weui_media_desc" v-for="value in item.tabs"> 
									{{ $key }} : {{{ value }}}
								</p>
							</div>  
						</template>
					</div>
					
					<div class="weui_panel weui_panel_access exerciseDetail">
						<div class="weui_panel_hd">
							<p style="color:#4bb7aa">解析</p>
						</div> 
						<!--解析主体--> 
						<div class="weui_panel_bd"> 
							<div class="weui_media_bd weui_media_box "> 
								<p class="weui_media_desc">
									{{{ item.answer }}}
								</p>
							</div> 
						</div>
					</div>
				</div>
			</template>
		</div>

		<infinite-loading :on-infinite="_onInfinite" spinner="default">
			<span slot="no-results" style="color:#4bb7aa;">
				<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
				<p style="font-size:1rem;display:inline-block;">服务器出差了~</p>
			</span>
			<span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
		</infinite-loading>
        
	</view-box>
</template>

<script>
import { XHeader,Flexbox,FlexboxItem,XButton,ViewBox,Group,Checker, CheckerItem,} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import moment from 'moment'
import {token,knowledgeId} from '../../common/getters'
import {errorRecommendIds,errorRecommendList,errorSubjectId} from '../getters'
import {collectAdd,collectRemove} from '../../common/actions'
import {getErrorRecommendList} from '../actions/recommend'
import * as _ from '../../config/whole'
import store from '../../store' 
import './error.less'

export default {
	components: {
		Checker, CheckerItem,XHeader,Flexbox,FlexboxItem,XButton,ViewBox,Group,InfiniteLoading
	},
	store,
	vuex: {
        getters: {
            errorSubjectId,token,knowledgeId,errorRecommendIds,errorRecommendList
        },
        actions: {
			collectAdd,collectRemove,getErrorRecommendList
        }
    },
	methods: {
		_correct(id){
			this.$router.go(`/error/correct/${id}`);
		},
		_collectAdd(id){
			this.collectAdd({
				options:{
					id:id,
					subject_id:this.errorSubjectId
				},
				token:this.token,
				type:'example'
			},()=>{
				this.list[this.selected-1].collectTime = moment().unix();
			});
		},
		_removeCollect(id){
			this.collectRemove({
				options:{
					id:id,
					subject_id:this.errorSubjectId
				},
				token:this.token,
				type:'example'
			},()=>{
				this.list[this.selected-1].collectTime = 0;
			});
		},
		_onInfinite(){
			let params = {
				options: {
					ids: this.errorRecommendIds,
					subject_id: this.errorSubjectId
				},
				token: this.token
			};
			this.getErrorRecommendList(params,()=>{
				if(this.errorRecommendList.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
				this.$broadcast('$InfiniteLoading:complete');
			});
		}
	},
	data(){
		return{
			 list:[],
			 item:[],
			 itemList:[],	//根据题目数量来生成选择
			 selected:1		//当前选择的题目
		} 
	},
	watch:{
		errorRecommendList(){
			this.list = this.errorRecommendList;
			this.itemList = [];
			for(let i = 0;i< this.errorRecommendList.length;i++){
				this.itemList.push(i+1);
			}
			this.item = this.list[0];
		},
		selected(){
			this.item = this.list[this.selected-1];
		}
	}
}
</script>
