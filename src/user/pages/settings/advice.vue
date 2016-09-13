<template>
	<div class="userSettingsAdvice">
		<div>
			<x-header :left-options="{showBack: true}">意见反馈<a slot="right" v-touch:tap="_history">反馈历史</a></x-header>
		</div>
		<group >
			<x-input placeholder="标题"></x-input>
			<x-textarea :max="200" name="description" placeholder="问题或建议描述" :rows="8"></x-textarea>
		</group>
		<x-button type="primary" class="btn">提交</x-button>
	</div>
</template>

<script>
	
import {XHeader,XInput,Group,XTextarea,XButton} from 'vux'

export default {
	components: {
		XHeader,XInput,XTextarea,Group,XButton
	},
	methods: {
		_history(){
			this.$router.go('advice/history');
		}
	}
}
</script>
