<template>
	<view-box v-ref:view-box class="inviteFriend">
		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
			<x-header :left-options="{showBack: true}">受邀好友</x-header>
		</div>
		<div style="padding-top:46px;">
			<group>
				<cell v-for="item in list" :title="item.name">
					<img slot="icon" width="30" style="display:block;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" :src="item.headImg">
				</cell>
			</group>
			<infinite-loading :on-infinite="onInfinite" spinner="spiral">
				<span slot="no-more" style="color:#4bb7aa;">
					<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
					<p style="font-size:1rem;display:inline-block;">没有更多数据了</p>
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
	data(){
		return {
			list: []
		}
	},

	methods: {
        onInfinite(){
			setTimeout(() => {
		        const temp = [];
				this.list = this.fetchInviteStudentList;
		       	this.$broadcast('$InfiniteLoading:loaded');
			}, 1000);

       }
	},
	ready(){
		this.getInviteStudentList({token:this.fetchToken})
	}
}
</script>
