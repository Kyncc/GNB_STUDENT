<template>
	<view-box v-ref:view-box class="cameraResult">
		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
			<x-header :left-options="{showBack: true}" >
				搜题结果
			</x-header>
		</div>

		<div style="padding-top:46px;">
			<!--内容-->
			<div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in list">
				<div class="weui_panel_hd">
					<flexbox :gutter="0" wrap="wrap">
						<flexbox-item :span="2/4" style="color:#4bb7aa">例题{{{$index+1}}}</flexbox-item>
                        <flexbox-item :span="1/4" style="text-align:right;">
                           <template v-if="item.collectTime == '0' ? true:false">
								<span @click="_collectAdd(item.id)"><i class="icon iconfont icon-collect"></i>收藏</span>
							</template>
							<template v-if="item.collectTime != '0' ? true:false">
								<span @click="_removeCollect(item.id)" class="isCollect"><i class="icon iconfont icon-collect"></i>取消收藏</span>
							</template>
                        </flexbox-item>
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
			<span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已经到底了</span>
		</infinite-loading>

		 <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
			 <x-button type="primary" v-touch:tap="_camera()">再拍一题</x-button>
        </tabbar>

	</view-box>
</template>

<script>
import {XHeader,Flexbox,FlexboxItem,XButton,ViewBox,Group,Tabbar, TabbarItem} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { period_id,subject_id,token,id } from '../../common/getters'
import { cameraResultIds,cameraResultList } from '../getters'
import { collectRemove,collectAdd } from '../../common/actions'
import { getCameraResultList } from '../actions'
import moment from 'moment'
import store from '../../store'
import './camera.less'

export default {
	components: {
		XHeader,Flexbox,FlexboxItem,XButton,ViewBox,Group,Tabbar,TabbarItem,InfiniteLoading
	},
	store,
	vuex: {
        getters: {
            period_id,subject_id,token,id,cameraResultIds,cameraResultList
        },
        actions: {
            collectRemove,collectAdd,getCameraResultList
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
		_camera(){
			this.$router.go(`/camera`);
		},
		_onInfinite(){
			let params = {
				options:{
					ids:this.cameraResultIds,
					period_id:this.period_id,
					subject_id:this.subject_id
				},
				token:this.token
			};
			this.getCameraResultList(params,()=>{
				setTimeout(()=>{
					this.list = this.cameraResultList;
					if(this.list.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
					this.$broadcast('$InfiniteLoading:complete');
				},300);
			});
		}
	},
	data(){
		return{
			list:[]
		} 
	}
}
</script>

