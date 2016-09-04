<template>
	<div class='collect  vux-scroller-header-box'>
		<div style="height:46px;">
			<x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">收</x-header>
		</div>
        
	</div>
</template>

<script>
import {XHeader} from 'vux'
// import './collect.less'

export default {
	components: {
		XHeader
	},
	methods: {
		
	}
}
</script>
