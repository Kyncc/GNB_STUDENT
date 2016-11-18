<template>
	<div class='codeInput '>
		<x-header :left-options="{showBack: true}">输入邀请码<a slot="right" v-touch:tap="_complete">确定</a></x-header>
		<group>
        	<x-input type="text" :max="6" name="code" placeholder="请输入6位邀请码" keyboard="number" :value.sync="code"  ></x-input>
		</group>
	</div>

</template>

<script>
import {XHeader,XInput,Group} from 'vux'
import { bindInviteCode } from '../../actions.js'
import {fetchToken} from '../../getters'
import * as _  from '../../../config/whole.js'
import './invite.less'

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
			if(this.code){
				this.bindInviteCode({token:this.fetchToken,inviteCode:this.code},()=>{
					_.toast("绑定成功")
					this.$router.replace('/user/invite')
				})
			}else{
				_.toast("请输入邀请码")
			}

		}
	}
}
</script>