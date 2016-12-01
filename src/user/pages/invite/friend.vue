<template>
	<view-box v-ref:view-box class="inviteFriend">
		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
			<x-header :left-options="{showBack: true}">受邀好友</x-header>
		</div>

		<div style="padding-top:46px;">

			<group>
				<cell v-for="item in inviteStudentList" :title="item.name">
					<img slot="icon" width="30" height="30" style="display:block;margin-right:5px;border-radius:50%" v-lazy="item.headImg">
				</cell>
			</group>

			<infinite-loading :on-infinite="_onInfinite" spinner="spiral">
					<span slot="no-results" style="color:#4bb7aa;">
							<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
							<p style="font-size:1rem;display:inline-block;">快来邀请更多好友吧~</p>
					</span>
					<span slot="no-more"></span>
			</infinite-loading>
		</div>
	</view-box>
</template>

<script>
import {XHeader,XInput,Group,Cell,ViewBox} from 'vux'
import {getInviteStudentList } from '../../actions/invite'
import {token} from '../../../common/getters'
import {inviteStudentList} from '../../getters'
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
			token,
			inviteStudentList
		}
	},
	methods: {
		_onInfinite(){
				this.getInviteStudentList({
						token:this.token
				},()=>{
						if(this.inviteStudentList.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
						this.$broadcast('$InfiniteLoading:complete');
				});
		}
	}
}
</script>
