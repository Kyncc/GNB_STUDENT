<template>
	<div class='agreement vux-scroller-header-box'>
		<div style="height:46px;">
			<x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">用户协议</x-header>
		</div>
		<article>


		</article>
	</div>
</template>

<script>
import {XHeader,XInput} from 'vux'

export default {
	components: {
		XHeader,XInput
	},
	methods: {
	
	}
}
</script>

<style lang="less">
.agreement{
	.vux-header{
		color:#fff;
		background-color:#4bb7aa;
	}
	.vux-header .vux-header-right a{color:#fff;}
	.vux-header .vux-header-left a{color:#fff;}
	.vux-header .vux-header-left, .vux-header .vux-header-right{font-size:16px;}
	.vux-header .vux-header-left .vux-header-back:before{border:1px solid #fff;}
	.vux-header .vux-header-title, .vux-header h1{margin-left:88px;}
}
</style>
