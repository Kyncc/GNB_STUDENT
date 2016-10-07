<template>
	<view-box v-ref:view-box class="collectDetail">
		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
			<x-header :left-options="{showBack:true,preventGoBack:true}" @on-click-back="_back()">我的收藏</x-header>
		</div>

		<div style="padding-top:46px;">
			
			<!--内容-->
			<div v-for="detail in list">
				<div class="weui_panel weui_panel_access exerciseDetail" >
					<div class="weui_panel_hd">
						<flexbox :gutter="0" wrap="wrap">
							<flexbox-item :span="1/2" style="color:#4bb7aa">题干</flexbox-item>
							<flexbox-item :span="1/4" style="text-align:right;" v-touch:tap="_remove">
								<span style="color:#666"><i class="icon iconfont icon-clear"></i>取消</span>
							</flexbox-item>
							<flexbox-item :span="1/4" style="text-align:right" v-touch:tap="_correct">
								<span style="color:#666"><i class="icon iconfont icon-error-login"></i>纠错</span>
							</flexbox-item>
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
			
			<infinite-loading :on-infinite="_onInfinite" spinner="default">
				<span slot="no-results" style="color:#4bb7aa;">
					<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
					<p style="font-size:1rem;display:inline-block;">服务器发生一点小问题~</p>
				</span>
				<span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)阅读完毕</span>
			</infinite-loading>

		</div>
	</view-box>
	<confirm :show.sync="show" confirm-text="是" cancel-text="否" title="确定将此题移除收藏么?" @on-confirm="_onAction()"></confirm>
</template>

<script>
import {XHeader,Flexbox,FlexboxItem,XButton,Confirm,ViewBox} from 'vux'
import { collectRemove } from '../../common/actions'
import { getCollectExampleList } from '../actions'
import { CollectExampleList } from '../getters'
import { period_id,subject_id,token,id } from '../../common/getters'
import InfiniteLoading from 'vue-infinite-loading'
import store from '../../store'

export default {
	components: {
		XHeader,Flexbox,FlexboxItem,XButton,Confirm,ViewBox,InfiniteLoading
	},
	vuex: {
        getters: {
            CollectExampleList,period_id,subject_id,token,id
        },
        actions: {
            collectRemove,getCollectExampleList
        }
    },
	methods: {
		_onInfinite(){
			let self = this;
			this.getCollectExampleList({
				options:{
					ids:[this.id],
					period_id:this.period_id,
					subject_id:this.subject_id
				},
				token:this.token
			},()=>{
					setTimeout(()=>{
						self.list = self.CollectExampleList;
						if(self.list.length != 0) {self.$broadcast('$InfiniteLoading:loaded');}
						self.$broadcast('$InfiniteLoading:complete');
					},300);
				}
			)
		},
		_remove(){
			this.show = true
		},
		_correct(){
			this.$router.go('/collect/correct/'+this.id);
		},
		_back(){
			this.$router.go('/collect/');
		},
		_removeCollect(){
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
				setTimeout(()=>{
					history.back();
				},1000);
			});
		},
		_onAction(){
			this._removeCollect();
		}
	},
    store,
	data(){
		return{
			show: false,
			list:[],
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
