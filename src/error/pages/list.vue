<template>
<view-box v-ref:view-box class="errorList">
	<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
		<x-header :left-options="{showBack: true}">错题列表</x-header>
		<group class="knowledge">
			<p><span>知识点：</span>{{{*list.knowledge}}}</p>
			<p>
				<span>难度等级：</span>
				<template v-for="1 in list.difficult">
						<i class="icon iconfont icon-collect"></i>
				</template>
				</p>
    		 </group>
		</div>

		<div style="padding-top:120px;">
			<!--内容-->
			<div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in list.list">
				<div class="weui_panel_hd">
					<flexbox :gutter="0" wrap="wrap">
						<flexbox-item :span="2/4" style="color:#4bb7aa">{{item.time | ymd}}</flexbox-item>
                        <flexbox-item :span="1/4" style="text-align:right;">
                            <!--<span><i class="icon iconfont icon-collect"></i>收藏</span>-->
							<template v-if="list.isCollect == 1">
							<span style="color:orange"><i class="icon iconfont icon-collect"></i>已收藏</span>
							</template>
							<template v-else>
							<!--<span><i class="icon iconfont icon-collect"></i>收藏</span>-->
							</template>
                        </flexbox-item>
                        <flexbox-item :span="1/4" style="text-align:right" v-touch:tap="_comment(item.id)" >
							<i class="icon iconfont icon-xiaoxi"></i>
							点评
						</flexbox-item>
					</flexbox>
				</div>
				<!--题目整体-->
				<div class="weui_panel_bd">
					<!--题目-->
					<div class="weui_media_bd weui_media_box ">
						<p class="weui_media_desc">
							<img :src="item.src" height="200" class="previewer-demo-img" @click="_show(item.src, $index)"/>
						</p>
					</div>
				</div>
			</div>
		</div>

		<previewer :list="imgList" v-ref:previewer :options="options"></previewer>

	</view-box>
</template>

<script>
import {
	XHeader,
	Flexbox,
	FlexboxItem,
	ViewBox,
	Group,
	Previewer
} from 'vux'
import './error.less'

const DATA = {
	"code": 1,
	"data": {
		"knowledge": "2.5 函数零点判定原理 ",
		"knowledgeId": 12,
		"difficult": 2,
		"list": [{
			"isCollect": 1,
			"id": 83783,
			"src": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3830827124,2277766622&fm=80",
			"time": "1473682257",
			"w": 640,
			"h": 500
		}, {
			"isCollect": 1,
			"id": 83783,
			"src": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3830827124,2277766622&fm=80",
			"time": "1473682257",
			"w": 640,
			"h": 500
		}]
	},
	"msg": 1
}



export default {
	components: {
		XHeader,
		Flexbox,
		FlexboxItem,
		ViewBox,
		Group,
		Previewer
	},
	methods: {
		_remove() {
			this.show = true
		},
		_comment(id) {
			this.$router.go(`/error/comment/${id}`)
		},
		_show(src, index) {
			this.imgList[index].src = src
			this.$refs.previewer.show(index)
		}
	},
	data() {
		return {
			ashow: false,
			list: DATA.data,
			imgList: [],
			options: {
				getThumbBoundsFn(index) {
					let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
					let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
					let rect = thumbnail.getBoundingClientRect()
					return {
						x: rect.left,
						y: rect.top + pageYScroll,
						w: rect.width
					}
				}
			}
		}
	},
	ready() {
		for (let i in this.list.list) {
			this.imgList.push({
				src: this.list.list[i].src,
				w: 600,
				h: 400
			})
		}
	}
}
</script>
