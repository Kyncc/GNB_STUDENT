<template>
	<div class='inviteIndex  vux-scroller-header-box'>
		<div style="height:46px;">
			<x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">邀请好友<a slot="right" v-touch:tap="_friend">受邀好友</a></x-header>
		</div>
		<!--<img src="../../../assets/user/friend_title.png" class="title" />-->
		<section class="step">		
			<article>
				<h3>提示</h3>
				<p>被邀请的好友需安装归纳本APP，且被邀请好友必须是新用户哦！</p>
				<!--<p>请好友在本界面填写您的邀请码，您再次登录归纳本APP即可获得500积分。</p>-->
			</article>
		</section>
		<section class="copyCode">
			<h3>我的邀请码</h3>
			<b>{{inviteCode}}</b>
		</section>
		<div class="button">
			<!--<x-button type="primary" v-touch:tap="_shareCode">分享给好友</x-button>-->
			<x-button v-show="!inviteStatus" type="primary" v-touch:tap="_inputCode">输入邀请码</x-button>
		</div>
	</div>
</template>

<script>
import {XHeader,XInput,Group,XButton} from 'vux'
import './invite.less'
import { getInvite } from '../../actions/invite'
import {inviteCode,inviteStatus} from '../../getters'
import {token} from '../../../common/getters'
import * as _  from '../../../config/whole.js'

export default {
	components: {
		XHeader,
		XInput,
		Group,
		XButton
	},
	vuex:{
		actions:{
			getInvite
		},
		getters:{
			token,inviteCode,inviteStatus
		}
	},
	ready(){
		this.getInvite({token:this.token})
	},
	methods: {
		_friend() {
			this.$router.go('friend');
		},
		_inputCode() {

			this.$router.go('input');
		},
		_shareCode() {


		}
	}
}
</script>
