<template>
	<view-box v-ref:view-box class="cameraSuccess">
		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
			<x-header :left-options="{showBack: true,preventGoBack:true}"  @on-click-back="_back()">
				搜题结果
				<a slot="right" @click="_back()">再拍一题</a>
			</x-header>
		</div>

		<div style="padding-top:46px;">
			<!--内容-->
			<img src="../../assets/camera/upload.png" />
		</div>
        
	</view-box>
</template>

<script>
import {XHeader,Flexbox,FlexboxItem,XButton,ViewBox,Group} from 'vux'
import './camera.less'


export default {
	components: {
		XHeader,Flexbox,FlexboxItem,XButton,ViewBox,Group
	},
	methods: {
		_back(){
			this.$router.go('/camera');
		}
	}
}
</script>

