<template>
	<view-box v-ref:view-box class="errorMore">
		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
			<x-header :left-options="{showBack: true}">查看错题</x-header>
			<group class="knowledge">
				<p><span>知识点：</span>2.5函数零点的判定定理</p>
				<p>
					<span>难度等级：</span>
					<i class="icon iconfont icon-collect"></i>
					<i class="icon iconfont icon-collect"></i>
					<i class="icon iconfont icon-collect"></i>
				</p>
    		 </group>
		</div>

		<div style="padding-top:115px;">
			<!--内容-->
			<div class="weui_panel weui_panel_access exerciseExampleList">
				<div class="weui_panel_hd">
					<flexbox :gutter="0" wrap="wrap">
						<flexbox-item :span="2/4" style="color:#4bb7aa">2016.8.17</flexbox-item>
                        <flexbox-item :span="1/4" style="text-align:right;">
                            <!--<span><i class="icon iconfont icon-collect"></i>收藏</span>-->
                            <span style="color:orange"><i class="icon iconfont icon-collect"></i>已收藏</span>
                        </flexbox-item>
                        <flexbox-item :span="1/4" style="text-align:right" v-touch:tap="_correct" ><i class="icon iconfont icon-xiaoxi"></i>点评</flexbox-item>
					</flexbox>				
				</div>
				<!--题目整体--> 
				<div class="weui_panel_bd"> 
					<!--题目-->
					<div class="weui_media_bd weui_media_box "> 
						<p class="weui_media_desc">
							<img src="http://placeholder.qiniudn.com/640x300"/>
						</p>
					</div> 
				</div>
			</div>
			<!--内容-->
			<div class="weui_panel weui_panel_access exerciseExampleList">
				<div class="weui_panel_hd">
					<flexbox :gutter="0" wrap="wrap">
						<flexbox-item :span="2/4" style="color:#4bb7aa">2016.8.17</flexbox-item>
                        <flexbox-item :span="1/4" style="text-align:right;">
                            <!--<span><i class="icon iconfont icon-collect"></i>收藏</span>-->
                            <span style="color:orange"><i class="icon iconfont icon-collect"></i>已收藏</span>
                        </flexbox-item>
                        <flexbox-item :span="1/4" style="text-align:right" v-touch:tap="_correct" ><i class="icon iconfont icon-xiaoxi"></i>点评</flexbox-item>
					</flexbox>				
				</div>
				<!--题目整体--> 
				<div class="weui_panel_bd"> 
					<!--题目-->
					<div class="weui_media_bd weui_media_box "> 
						<p class="weui_media_desc">
							<img src="http://placeholder.qiniudn.com/640x300"/>
						</p>
					</div> 
				</div>
			</div>
		</div>

        
	</view-box>
</template>

<script>
import {Tabbar, TabbarItem,XHeader,Flexbox,FlexboxItem,XButton,Confirm,ViewBox,Group} from 'vux'
import './error.less'

export default {
	components: {
		Tabbar, TabbarItem,XHeader,Flexbox,FlexboxItem,XButton,Confirm,ViewBox,Group
	},
	methods: {
		_remove(){
			 this.show = true
		},
		_correct(){
			this.$router.go('/error/correct')
		},
		onAction:(type)=>{
			alert(type);
		}
	},
	data(){
		return{
			 ashow: false
		} 
	}
}
</script>
