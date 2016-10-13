<template>
	<view-box v-ref:view-box class="inviteFriend">
		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
			<x-header :left-options="{showBack: true}">受邀好友</x-header>
		</div>

		<div style="padding-top:46px;">
			<cell v-for="item in list" :title="item.name">
				<img slot="icon" width="30" height="30" style="display:block;margin-right:5px;border-radius:50%" v-lazy="item.headImg">
			</cell>
			<infinite-loading :on-infinite="onInfinite" >
				<span slot="no-results"></span>
			</infinite-loading>
		</div>
	</view-box>
</template>

<script>
import {XHeader,XInput,Group,Cell,ViewBox} from 'vux'
import {getInviteStudentList } from '../../actions.js'
import {fetchToken,fetchInviteStudentList} from '../../getters'
import * as _ from '../../../config/whole.js'
import InfiniteLoading from 'vue-infinite-loading'
import './invite.less'

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
	data(){
		return {
			list: []
		}
	},

	methods: {
        onInfinite(){
			setTimeout(() => {
		        const temp = [];
				this.list = this.fetchInviteStudentList
		       	this.$broadcast('$InfiniteLoading:complete');
			}, 500);

       }
	},
	ready(){
		this.getInviteStudentList({token:this.fetchToken})
	}
}
</script>
