<template>
	<div class='codeInput '>
		<x-header :left-options="{showBack: true}">输入邀请码<a slot="right" v-touch:tap="_complete">确定</a></x-header>
		<group>
        	<x-input type="text" name="code" placeholder="请输入4位邀请码" keyboard="number"></x-input>
		</group>
	</div>
	
</template>

<script>
import {XHeader,XInput,Group} from 'vux'

export default {
	components: {
		XHeader,XInput,Group
	},
	methods: {
		_complete(){
			alert(1);
		}
	}
}
</script>

<style lang="less">
.codeInput{
	.vux-header{
		color:#fff;
		background-color:#4bb7aa;
	}
	.weui_cells{margin-top:0;}
	.vux-no-group-title{margin-top:0;}
}
</style>
