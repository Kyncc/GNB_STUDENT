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
import {XHeader,XInput,Group,XButton} from 'vux'
import './invite.less'

export default {
	components: {
		XHeader,XInput,Group,XButton
	},
	methods: {
		_friend(){
			this.$router.go('friend');
		},
		_inputCode(){
			this.$router.go('input');
		},
		_sharetCode(){
			//alert(111);
			//router.go('input');
		}
	}
}
</script>
