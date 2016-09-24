<template>
	<div class='codeInput '>
		<x-header :left-options="{showBack: true}">输入邀请码<a slot="right" v-touch:tap="_complete">确定</a></x-header>
		<group>
        	<x-input type="text" name="code" placeholder="请输入4位邀请码" keyboard="number" :value.sync="code"></x-input>
		</group>
	</div>

</template>

<script>
import {XHeader,XInput,Group} from 'vux'
import { bindInviteCode } from '../../actions.js'
import {fetchToken} from '../../getters'
import * as _  from '../../../config/whole.js'


export default {
	components: {
		XHeader,XInput,Group
	},
	data(){
		return {
			code:''
		}
	},
	vuex:{
		actions:{
			bindInviteCode
		},
		getters:{
			fetchToken
		}
	},
	methods: {
		_complete(){
			this.bindInviteCode({token:this.fetchToken,inviteCode:this.code},()=>{
				_.toast("绑定成功")
				this.$router.replace('/user/invite')
			})
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
