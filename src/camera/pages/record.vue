<template>
	<view-box v-ref:view-box class="cameraRecord">
		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
			<x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
				拍照例题
			</x-header>
		</div>

		<div style="padding-top:46px;">
			<!--内容-->
			<div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in list">
				<div class="weui_panel_hd">
					<flexbox :gutter="0" wrap="wrap">
						<flexbox-item :span="2/4" style="color:#4bb7aa">拍照例题</flexbox-item>
						<flexbox-item :span="1/4" style="text-align:right;">
							<template v-if="item.collectTime == '0' ? true:false">
								<span @click="_collectAdd(item.id)"><i class="icon iconfont icon-collect"></i>收藏</span>
							</template>
							<template v-if="item.collectTime != '0' ? true:false">
								<span @click="_removeCollect(item.id)" class="isCollect"><i class="icon iconfont icon-collect"></i>取消收藏</span>
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
			<span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已经到底拉~</span>
		</infinite-loading>

	</view-box>
</template>

<script>
import {XHeader,Flexbox,FlexboxItem,XButton,ViewBox,Group} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { collectRemove,collectAdd } from '../../common/actions'
import { getCameraExample } from '../actions'
import {period_id,subject_id,token,id } from '../../common/getters'
import { cameraExampleList } from '../getters'
import moment from 'moment'
import store from '../../store'
import './camera.less'

export default {
	components: {
		XHeader,Flexbox,FlexboxItem,XButton,ViewBox,Group,InfiniteLoading
	},
	store,
	vuex: {
        getters: {
            period_id,subject_id,token,id,cameraExampleList
        },
        actions: {
            collectRemove,collectAdd,getCameraExample
        }
    },
	methods: {
		_collectAdd(id){
			this.collectAdd({
				options:{
					id:id,
					period_id:this.period_id,
					subject_id:this.subject_id
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
					id:id,
					period_id:this.period_id,
					subject_id:this.subject_id
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
					period_id:this.period_id,
					subject_id:this.subject_id
				},
				token:this.token
			};
			this.getCameraExample(params,()=>{
				setTimeout(()=>{
					this.list = this.cameraExampleList;
					if(this.list.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
					this.$broadcast('$InfiniteLoading:complete');
				},300);
			});
		},
		_correct(id){
			this.$router.go(`/camera/correct/${id}`);
		},
		_back(){
			this.$router.go(`/camera/history`);
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

