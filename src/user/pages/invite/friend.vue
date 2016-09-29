<template>
	<view-box v-ref:view-box class="inviteFriend">
		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
			<x-header :left-options="{showBack: true}">受邀好友</x-header>
		</div>

		<div style="padding-top:46px;">
			<group>
				<cell v-for="item in list" :title="item.name">
					<img slot="icon" width="30" style="display:block;margin-right:5px;" :src="item.headImg | img" :onerror="_onError($index)"/>
				</cell>
			</group>
			<infinite-loading :on-infinite="onInfinite" spinner="spiral">
				<span slot="no-more" style="color:#4bb7aa;">
					<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
					<p style="font-size:1rem;display:inline-block;">快来邀请~</p>
				</span>
			</infinite-loading>
		</div>
	</view-box>
</template>

<script>
import {XHeader,XInput,Group,Cell,ViewBox} from 'vux'
import { getInviteStudentList } from '../../actions.js'
import {fetchToken,fetchInviteStudentList} from '../../getters'
import * as _ from '../../../config/whole.js'
import InfiniteLoading from 'vue-infinite-loading'

export default {
	components: {
		XHeader,XInput,Group,Cell,InfiniteLoading,ViewBox
	},
	vuex:{
		actions:{
			getInviteStudentList
		},
		getters:{
			fetchToken,
			fetchInviteStudentList
		}
	},
	filters:{
		'img'(val){
			if(val){
				return val
			}else{
				return 'http://www.atool.org/placeholder.png?size=60x60&text=头像&&bg=4bb7aa&fg=fff'
			}
		}
	},
	data(){
		return {
			list: []
		}
	},
	methods: {
		_onError(index){
			this.list[index].headImg = 'http://www.atool.org/placeholder.png?size=60x60&text=头像&&bg=4bb7aa&fg=fff';
		},
        onInfinite(){
			let self = this;
			this.getInviteStudentList({
				token:this.fetchToken
			},()=>{
					setTimeout(()=>{
						self.$broadcast('$InfiniteLoading:loaded');	
						self.list = self.fetchInviteStudentList;
						(self.list.length == 0 ? self.$broadcast('$InfiniteLoading:complete'):self.$broadcast('$InfiniteLoading:loaded'));
					},1000);
				}
			)
       }
	}
}
</script>
