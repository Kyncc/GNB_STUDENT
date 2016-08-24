<template>
	<div class='inviteFriend vux-scroller-header-box'>
		<div style="height:46px;">
			<x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">受邀好友<a slot="right" v-touch:tap="_refersh">刷新</a></x-header>
		</div>
		<scroller lock-x v-ref:scroller use-pulldown :pulldown-config={content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}  @pulldown:loading="load" height="-46px">
			<group>
				<cell title="张同学">
					<img slot="icon" width="30" style="display:block;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
				</cell>
				<cell title="李同学">
					<img slot="icon" width="30" style="display:block;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
				</cell>
			</group>
		</scroller>
	</div>
</template>

<script>
import {XHeader,XInput,Group,Scroller,Cell} from 'vux'

export default {
	components: {
		XHeader,XInput,Group,Cell,Scroller
	},
	methods: {
		_refersh(){
			alert(1);
		},
		load (uuid) {
			setTimeout(() => {
				this.$broadcast('pulldown:reset', uuid)
			}, 2000)
		}
	}
}
</script>

<style lang="less">
.inviteFriend{
	.vux-header{
		color:#fff;
		background-color:#4bb7aa;
	}
	.weui_cells{
		margin-top:0;fonr-size:22px;
		img{border-radius:50%;}
	}
	.vux-no-group-title{margin-top:0;}
	.vux-header .vux-header-right a{color:#fff;}
	.vux-header .vux-header-left, .vux-header .vux-header-right{font-size:16px;}
	.vux-header .vux-header-left .vux-header-back:before{border-color:#fff;}
	.vux-header .vux-header-title, .vux-header h1{margin-left:88px;}
}
</style>
