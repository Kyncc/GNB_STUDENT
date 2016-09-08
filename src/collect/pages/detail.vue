<template>
	<div class='collectDetail  vux-scroller-header-box'>
		<div style="height:46px;">
			<x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">我的收藏</x-header>
		</div>
        <div class="weui_panel weui_panel_access exerciseDetail">
			<div class="weui_panel_hd">2.5 函数零点判定原理</div> 
			<div class="weui_panel_bd"> 
				<div class="weui_media_bd weui_media_box "> 
					<p class="weui_media_desc">
						小敏家、学校、邮局、图书馆坐落在一条东西走向的大街上，依次记为A，B，C，D，学校位于小敏家西150米，邮局位于小敏家东100米，图书馆位于小敏家西400米．<br/> 
						（1）用数轴表示A，B，C，D的位置；<br/>
						（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？<br/>
					</p> 
				</div> 
			</div>  
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
