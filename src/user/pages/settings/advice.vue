<template>
	<div class="userSettingsAdvice">
		<div>
			<x-header :left-options="{showBack: true}">意见反馈<a slot="right" v-touch:tap="_history">反馈历史</a></x-header>
		</div>
		<group >
			<x-input placeholder="标题" :value.sync="title"></x-input>
			<x-input placeholder="QQ号/微信号" :value.sync="contact"></x-input>
			<x-textarea :max="200" name="description" placeholder="问题或建议描述" :rows="8" :value.sync="content"></x-textarea>
		</group>
		<x-button type="primary" class="btn" v-touch:tap="_submit">提交</x-button>
	</div>
</template>

<script>

import {XHeader,XInput,Group,XTextarea,XButton} from 'vux'
import { advice } from '../../actions/advice'
import {token} from '../../../common/getters'
import * as _  from '../../../config/whole.js'

export default {
	components: {
		XHeader,XInput,XTextarea,Group,XButton
	},
	data(){
		return {
			title:'',
			content:'',
			contact:''
		}
	},
	vuex:{
		actions:{
			advice
		},
		getters:{
			token
		}
	},
	methods: {
		_history(){
			this.$router.go('advice/history')
		},
		_submit(){
			if(this.title && this.content && this.contact){
				this.advice({
					token:this.fetchToken,
					title:this.title,
					content:this.content,
					contact:this.contact
				},()=>{
					this.$router.go('advice/history');
				})
			}else{
				_.toast("请完善内容")
			}
		}
	}
}
</script>
