<template>
	<view-box v-ref:view-box class="errorDetail">

		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
			<x-header :left-options="{showBack: true}">例题</x-header>
		</div>

		<div style="padding-top:46px;">
			<!--内容-->
			<div class="weui_panel weui_panel_access exerciseDetail">
				<div class="weui_panel_hd">
					<flexbox :gutter="0" wrap="wrap">
						<flexbox-item :span="2/4" style="color:#4bb7aa">例题内容</flexbox-item>
                        <flexbox-item :span="1/4" style="text-align:right;">
                            <!--<span><i class="icon iconfont icon-collect"></i>收藏</span>-->
                            <span style="color:orange"><i class="icon iconfont icon-collect"></i>已收藏</span>
                        </flexbox-item>
                        <flexbox-item :span="1/4" style="text-align:right" v-touch:tap="_correct" ><i class="icon iconfont icon-error-login"></i>纠错</flexbox-item>
					</flexbox>				
				</div>
				<!--题目整体--> 
				<div class="weui_panel_bd"> 
					<!--题目-->
					<div class="weui_media_bd weui_media_box "> 
						<p class="weui_media_desc">
							小敏家、学校、邮局、图书馆坐落在一条东西走向的大街上，依次记为A，B，C，D，学校位于小敏家西150米，邮局位于小敏家东100米，图书馆位于小敏家西400米．<br/> 
							（1）用数轴表示A，B，C，D的位置；<br/>
							（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？<br/>
						</p>
					</div> 
					<!--选项-->
					<div class="weui_media_bd weui_media_box options">
						<p class="weui_media_desc"> 
								A.(-4.2)
						</p>
						<p class="weui_media_desc"> 
								B.(-4.2)
						</p>
						<p class="weui_media_desc"> 
								C.(-4.2)
						</p>
						<p class="weui_media_desc"> 
								D.(-4.2)
						</p>
					</div>  
				</div>
			</div>
			<!--解析--> 
			<div class="weui_panel weui_panel_access exerciseDetail">
				<div class="weui_panel_hd">
					<flexbox :gutter="0" wrap="wrap">
						<flexbox-item :span="2/5" style="color:#4bb7aa">本题解析：</flexbox-item>
						<flexbox-item :span="1/5"></flexbox-item>
					</flexbox>				
				</div> 
				<!--解析主体--> 
				<div class="weui_panel_bd"> 
					<div class="weui_media_bd weui_media_box "> 
						<p class="weui_media_desc">
							小敏家、学校、邮局、图书馆坐落在一条东西走向的大街上，依次记为A，B，C，D，学校位于小敏家西150米，邮局位于小敏家东100米，图书馆位于小敏家西400米．<br/> 
							（1）用数轴表示A，B，C，D的位置；<br/>
							（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？<br/>
							（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？<br/>
							（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？<br/>
							（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？<br/>
							（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？<br/>
							（2）一天小敏从家里先去邮局寄信后，再以每分钟50米的速度往图书馆方向走了约8分钟．试问这时小敏约在什么位置？距图书馆和学校各约多少米？<br/>
						</p>
					</div> 
				</div>
			</div>
		</div>

        <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
            <flexbox :gutter="0" wrap="wrap">
                <flexbox-item :span="1/3">
                    <x-button mini type="primary"  @click="_typeList">查看错题</x-button>
                </flexbox-item>
                <flexbox-item :span="1/3">
                    <x-button mini type="primary"  @click="_more">更多例题</x-button>
                </flexbox-item>
                <flexbox-item :span="1/3">
                    <x-button mini type="primary"  @click="_recommend">推荐练习</x-button>
                </flexbox-item>
            </flexbox>		
        </tabbar>

	</view-box>
</template>

<script>
import {Tabbar, TabbarItem,XHeader,Flexbox,FlexboxItem,XButton,Confirm,ViewBox} from 'vux'
import './error.less'

export default {
	components: {
		Tabbar, TabbarItem,XHeader,Flexbox,FlexboxItem,XButton,Confirm,ViewBox
	},
	methods: {
		_typeList(){
			 this.$router.go('/error/list')
		},
		_more(){
			this.$router.go('/error/more')
		},
		_recommend(){
			this.$router.go('/error/recommend')
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
