<template>
	<div class='inviteFriend vux-scroller-header-box'>
		<div style="height:46px;">
			<x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">受邀好友</x-header>
		</div>
		<group>
			<div>
				<cell v-for="item in fetchInviteStudentList" :title="item.name">
					<img slot="icon" width="30" style="display:block;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" :src="item.headImg">
				</cell>
				<infinite-loading :on-infinite="_onInfinite" spinner="waveDots">
					<span slot="no-more" style="color:#4bb7aa;">
						<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
						<p style="font-size:1rem;display:inline-block;">没有更多数据了</p>
					</span>
				</infinite-loading>
			</div>
		</group>
	</div>
</template>

<script>
import {XHeader,XInput,Group,Cell} from 'vux'
import { getInviteStudentList } from '../../actions.js'
import {fetchToken,fetchInviteStudentList} from '../../getters'
import * as _  from '../../../config/whole.js'
import InfiniteLoading from 'vue-infinite-loading'

export default {
	components: {
		XHeader,XInput,Group,Cell,InfiniteLoading
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
	ready(){
		// this.getInviteStudentList({token:this.fetchToken})
		//console.log(this.fetchInviteStudentList)
	},
	methods: {
        _onInfinite(){
			setTimeout(() => {
		        const temp = [];
		        for (let i = this.fetchInviteStudentList.length + 1; i <= this.fetchInviteStudentList.length + 20; i++) {
		          temp.push(i);
		        }
		       	 	this.fetchInviteStudentList = this.fetchInviteStudentList.concat(temp);
		        	this.$broadcast('$InfiniteLoading:loaded');
			}, 1000);
       }
	}
}
</script>
