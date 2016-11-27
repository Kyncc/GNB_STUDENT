<template>
	<view-box v-ref:view-box class="errorDetail">

		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
			<x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">例题详情</x-header>
		</div>

		<div style="padding-top:46px;">
			<!--内容-->
			<div v-for="detail in list">
				<div class="weui_panel weui_panel_access exerciseDetail">
					<div class="weui_panel_hd">
						<flexbox :gutter="0" wrap="wrap">
							<p style="width:25%;color:#4bb7aa">题干</p>
							<p style="width:50%;text-align:right;">
								<template v-if="detail.collectTime != '0' ? true:false">
									<span @click="_removeCollect(detail.id)" style="color:#666;text-align:right" ><i class="icon iconfont icon-collect"></i>取消</span>
								</template>
								<template v-if="detail.collectTime == '0' ? true:false">
									<span @click="_collectAdd(detail.id)" style="color:#666;text-align:right"><i class="icon iconfont icon-collect"></i>收藏</span>
								</template>
							</p>
							<p style="width:25%;text-align:right" v-touch:tap="_correct"> 
								<i class="icon iconfont icon-error-login"></i>纠错
							</p>
						</flexbox>
					</div>
					<!--题目整体-->
					<div class="weui_panel_bd">
						<!--题目-->
						<div class="weui_media_bd weui_media_box">
							<p class="weui_media_desc">
								{{{* detail.content }}}
							</p>
						</div>
						<template v-if=" detail.type == '1' ? true:false">
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
							<flexbox-item :span="2/5" style="color:#4bb7aa">解析</flexbox-item>
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
		</div>

		<infinite-loading :on-infinite="_onInfinite" spinner="default">
			<span slot="no-results" style="color:#4bb7aa;">
				<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
				<p style="font-size:1rem;display:inline-block;">服务器出差了~</p>
			</span>
			<span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
		</infinite-loading>

		<tabbar class="vux-demo-tabbar bottom" icon-class="vux-center" slot="bottom">
				<flexbox :gutter="0" wrap="wrap">
						<p style="width:50%;text-align:center;">
								<x-button mini type="primary" @click="_errorList" >对应错题</x-button>
						</p>
						<p style="width:50%;text-align:center;">
								<x-button mini type="primary" @click="_recommend" >相近例题</x-button>
						</p>
				</flexbox>
		</tabbar>

	</view-box>
</template>

<script>
import {Tabbar,TabbarItem,XHeader,Flexbox,FlexboxItem,XButton,Confirm,ViewBox} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {collectRemove,collectAdd } from '../../common/actions'
import {token,id } from '../../common/getters'
import {errorIndexDetail,errorRecommendIds,errorMoreIds,errorListIds,errorSubjectId} from '../getters'
import {getErrorList,getErrorListIds,getErrorRecommendIds } from '../actions'
import {getErrorDetail}from '../actions/detail'
import store from '../../store'
import moment from 'moment'
import * as _ from '../../config/whole'
import './error.less'

export default {
	components: {
		Tabbar,TabbarItem,XHeader,Flexbox,FlexboxItem,XButton,Confirm,ViewBox,InfiniteLoading
	},
	store,
	vuex: {
        getters: {
            errorSubjectId,token,id,
			errorIndexDetail,errorMoreIds,errorRecommendIds,errorListIds
        },
        actions: {
            collectRemove,collectAdd,
			getErrorDetail,getErrorRecommendIds,getErrorListIds
        }
    },
	methods: {
		/** 更多错题*/
		_errorList(){
			_.toast("资源建设中");
			return;	
			//错题列表IDS获取
			this.getErrorListIds({
				knowledgeId:this.list[0].knowledgeId,
				options:{
					subject_id:this.errorSubjectId
				},
				token:this.token
			},()=>{
				if(this.errorListIds.length == 0){
					_.toast("暂无例题");
				}else{
					this.$router.go(`/error/list/${this.list[0].knowledgeId}`);
				}
			});
		},
		/** 相近例题*/
		_recommend(){ 	
			this.getErrorRecommendIds({
				knowledgeId:this.list[0].knowledgeId,
				options:{
					subject_id:this.errorSubjectId,
					type:'chapter',
				},
				token:this.token
			},()=>{
				if(this.errorRecommendIds.length == 0){
					_.toast("暂无推荐");
				}else{
					this.$router.go('/error/recommend/'+this.list[0].knowledgeId);
				}
			});
		},
		_correct(){
			this.$router.go(`/error/correct/${this.errorSubjectId}/${this.list[0].id}`);
		},
		_back() {
			this.$router.go('/error');
		},
		_collectAdd(id){
			this.collectAdd({
				options:{
					id:this.id,
					subject_id:this.errorSubjectId
				},
				token:this.token,
				type:'example'
			},()=>{
				this.list[0].collectTime = moment().unix();
			});
		},
		_removeCollect(id){
			this.collectRemove({
				options:{
					id:this.id,
					subject_id:this.errorSubjectId
				},
				token:this.token,
				type:'example'
			},()=>{
				this.list[0].collectTime = 0;
			});
		},
		_onInfinite(){
			let params = {
				options:{
					ids:[this.id],
					subject_id:this.errorSubjectId
				},
				token:this.token
			};
			this.getErrorDetail(params,()=>{
				this.list = this.errorIndexDetail;
				if(this.list.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
				this.$broadcast('$InfiniteLoading:complete');
			});
		}
	},
	data(){
		return{
			list:[]
		}
	},
	watch:{
		id(){
			this.list = [];
			this.$nextTick(() => {
				this.$broadcast('$InfiniteLoading:reset');
			});
		}
	}
}
</script>
