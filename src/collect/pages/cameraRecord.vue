<template>
	<view-box v-ref:view-box class="cameraRecord">
		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
			<x-header :left-options="{showBack: true}">
				参考例题
			</x-header>
		</div>

		<div style="padding-top:46px;">
			<!--内容-->
			<div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in list">
				<div class="weui_panel_hd">
					<flexbox :gutter="0" wrap="wrap">
						<p style="width:25%;color:#4bb7aa">题干</p>
						<p style="width:25%;text-align:right;">
							<template v-if="item.collectTime == '0' ? true:false">
								<span style="color:#666" @click="_collectAdd(item.id)"><i class="icon iconfont icon-collect"></i>收藏</span>
							</template>
							<template v-if="item.collectTime != '0' ? true:false">
								<span style="color:#666" @click="_removeCollect(item.id)" class="isCollect"><i class="icon iconfont icon-collect"></i>取消</span>
							</template>
						</p>	
                        <p style="width:25%;text-align:right;color:#666" v-touch:tap="_comment(item.id)" ><i class="icon iconfont icon-error-login"></i>点评</p>
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
			</div>
		</div>
        
		<infinite-loading :on-infinite="_onInfinite" spinner="default">
			<span slot="no-results" style="color:#4bb7aa;">
				<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
				<p style="font-size:1rem;display:inline-block;">服务器出差了~</p>
			</span>
			<span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已经到底啦~</span>
		</infinite-loading>

	</view-box>
</template>

<script>
import {XHeader,Flexbox,FlexboxItem,XButton,ViewBox,Group} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { collectRemove,collectAdd } from '../../common/actions'
import { getCollectExampleList } from '../actions'
import {CollectSubjectId,token,id } from '../../common/getters'
import { CollectExampleList } from '../getters'
import moment from 'moment'
import store from '../../store'

export default {
	components: {
		XHeader,Flexbox,FlexboxItem,XButton,ViewBox,Group,InfiniteLoading
	},
	store,
	vuex: {
        getters: {
            CollectSubjectId,token,id,CollectExampleList
        },
        actions: {
            collectRemove,collectAdd,getCollectExampleList
        }
    },
	methods: {
		_collectAdd(id){
			this.collectAdd({
				options:{
					id:id,
					subject_id:this.CollectSubjectId
				},
				token:this.token,
				type:'camera'
			},()=>{
				this.list[0].collectTime = moment().unix();
			});
		},
		_removeCollect(id){
			this.collectRemove({
				options:{
					id:id,
					subject_id:this.CollectSubjectId
				},
				token:this.token,
				type:'camera'
			},()=>{
				this.list[0].collectTime = 0;
			});
		},
		_onInfinite(){
			let params = {
				options:{
					ids:[this.id],
					subject_id:this.CollectSubjectId
				},
				token:this.token
			};
			this.getCollectExampleList(params,()=>{
				setTimeout(()=>{
					this.list = this.CollectExampleList;
					if(this.list.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
					this.$broadcast('$InfiniteLoading:complete');
				},300);
			});
		},
		_comment(id){
			this.$router.go(`/camera/comment/${id}`);
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

