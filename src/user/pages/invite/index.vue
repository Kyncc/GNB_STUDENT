<template>
	<div class='inviteIndex  vux-scroller-header-box'>
		<div style="height:46px;">
			<x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">邀请好友<a slot="right" v-touch:tap="_friend">受邀好友</a></x-header>
		</div>
		<img src="../../../assets/user/friend_title.png" class="title"/>
		<section class="step">
			<article>
				<h3>第一步</h3>
				<p>被邀请的好友需安装归纳本APP，且被邀请好友必须是新用户哦！</p>		
			</article>
			<article>
				<h3>第二步</h3>
				<p>请好友在本界面填写您的邀请码，您和您的好友登录归纳本APP均可获得1000点积分。</p>		
			</article>
		</section>
		<section class="copyCode">
			<h3>我的邀请码</h3>
			<b>3418</b>
		</section>
		<div class="button">
			<x-button type="primary" v-touch:tap="_shareCode">分享给好友</x-button>
			<x-button type="primary" v-touch:tap="_inputCode">输入邀请码</x-button>	
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import {XHeader,XInput,Group,XButton} from 'vux'


Vue.use(Router)
const router = new Router();

export default {
	components: {
		XHeader,XInput,Group,XButton
	},
	methods: {
		_friend(){
			router.go('friend');
		},
		_inputCode(){
			router.go('input');
		},
		_sharetCode(){
			//alert(111);
			//router.go('input');
		}
	}
}
</script>

<style lang="less">
.inviteIndex{
	font-size:inheirt;
	.vux-header{
		color:#fff;
		background-color:#4bb7aa;
	}
	.title{width:750/40em;height:104/40em;padding:45/40em 0 0}
	.step {
		margin-bottom:65/40em;
		article{width:590/40em;height:155/40em;background: #ffffff;border-radius:5px;padding:.5em .75em .75em;margin:.5em auto;}
		h3{font-size:30/40em;color:#229bf5;padding:0 0 .5em;}
		p{font-size:30/40em;color:#000;line-height:1.8em;}
	}
	.copyCode{width:590/40em;height:120/40em;background: #ffffff;border-radius:5px;margin:0 auto 65/40em;border:2px dashed #959595;text-align:center;padding:.75em 0 1em;}
	.button{width:560/40em;margin:0 auto;}
	.weui_btn_primary{
		background: #fd7e3f;
	}
	.weui_btn_primary:not(.weui_btn_disabled):active {
		color: hsla(0,0%,100%,.4);
		background: #fd7e3f ;
	}
	.weui_cells{margin-top:0;}
	.vux-no-group-title{margin-top:0;}
	.vux-header .vux-header-right a{color:#fff;}
	.vux-header .vux-header-left, .vux-header .vux-header-right{font-size:16px;}
	.vux-header .vux-header-left .vux-header-back:before{border-color:#fff;}
	.vux-header .vux-header-title, .vux-header h1{margin-left:88px;}
}
</style>
