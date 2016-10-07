<template>
<view-box v-ref:view-box class="errorList">
	<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
		<x-header :left-options="{showBack: true}">错题列表</x-header>
		<group class="knowledge">
			<p><span>知识点：</span>{{{knowledge}}}</p>
			<p>
				<span>难度：{{difficult}}</span>
			</p>
		</group>
	</div>
	<div style="padding-top:120px;">
			<div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in list">
			<div class="weui_panel_hd">
				<flexbox :gutter="0" wrap="wrap">
					<flexbox-item :span="2/4" style="color:#4bb7aa">{{item.cameraTime | ymd}}</flexbox-item>
					<flexbox-item :span="1/4" style="text-align:right;">
						<template v-if="item.collectTime == '0' ? true:false">
							<span style="color:#666" @click="_collectAdd($index,item.id)" class="isCollect"><i class="icon iconfont icon-collect"></i>收藏</span>
						</template>
							<template v-if="item.collectTime != '0' ? true:false">
							<span style="color:#666" @click="_removeCollect($index,item.id)"><i class="icon iconfont icon-collect"></i>取消</span>
						</template>
					</flexbox-item>
					<flexbox-item :span="1/4" style="text-align:right;color:#666" v-touch:tap="_comment(item.id)" >
						<i class="icon iconfont icon-comment"></i>点评
					</flexbox-item>
				</flexbox>
			</div>
			<!--题目整体-->
			<div class="weui_panel_bd">
				<!--题目-->
				<div class="weui_media_bd weui_media_box ">
					<p class="weui_media_desc">
						<img class="previewer-demo-img" v-lazy="item.compressPic"  height="200"  @click="_show($index)"/>
					</p>
				</div>
			</div>
				</div>
			</div>
		</div>
		<infinite-loading :on-infinite="_onInfinite" spinner="default">
			<span slot="no-results" style="color:#4bb7aa;">
				<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
				<p style="font-size:1rem;display:inline-block;">服务器出差了~</p>
			</span>
			<span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已经到底啦~</span>
		</infinite-loading>
		<previewer :list="imgList" v-ref:previewer ></previewer>
	</view-box>
</template>

<script>
import {XHeader,Flexbox,FlexboxItem,ViewBox,Group,Previewer} from 'vux'
import './error.less'
import InfiniteLoading from 'vue-infinite-loading'
import {period_id,subject_id,token} from '../../common/getters'
import {errorListIds,errorListList} from '../getters'
import {collectAdd,collectRemove} from '../../common/actions'
import {getErrorListIds,getErrorListList} from '../actions'
import moment from 'moment'

export default {
	components: {
		XHeader,Flexbox,FlexboxItem,ViewBox,Group,Previewer,InfiniteLoading
	},
	vuex: {
		actions: {
			getErrorListIds,getErrorListList,collectAdd,collectRemove
		},
		getters: {
			errorListIds,errorListList,period_id,subject_id,token
		}
	},
	data() {
		return {
			ashow: false,
			list: [],
			imgList: [{
				src: '',
				w: '',
				h: ''
			}],
			currentPage: 1,
			knowledge: '',
			difficult: ''
		}
	},
	methods: {
		_remove() {
			this.show = true
		},
		_collectAdd(index, id) {
			let self = this;
			this.collectAdd({
				options: {
					id: id,
					period_id: self.period_id,
					subject_id: self.subject_id
				},
				token: self.token,
				type: 'camera'
			}, () => {
				self.list[index].collectTime = moment().unix();
			});
		},
		_removeCollect(index, id) {
			let self = this;
			this.collectRemove({
				options: {
					id: id,
					period_id: self.period_id,
					subject_id: self.subject_id
				},
				token: self.token,
				type: 'camera'
			}, () => {
				self.list[index].collectTime = 0;
			});
		},
		_show(index) {
			this.imgList[0].src = this.list[index].pic;
			this.imgList[0].w = this.list[index].width;
			this.imgList[0].h = this.list[index].height;
			this.$refs.previewer.show();
		},
		_comment(id) {
			this.$router.go(`/error/comment/${id}`)
		},
		_onInfinite() {
			let params = {
				options: {
					ids: this.errorListIds,
					period_id: this.period_id,
					subject_id: this.subject_id
				},
				token: this.token
			};
			this.getErrorListList(params, () => {
				setTimeout(() => {
					this.list = this.errorListList;
					if (this.list.length != 0) {
						this.$broadcast('$InfiniteLoading:loaded');
					}
					this.$broadcast('$InfiniteLoading:complete');
				}, 300);

				// this.list = this.errorListList
			});
		}
	},
	watch: {
		list() {
			this.knowledge = this.list[0].knowledge;
			this.difficult = this.list[0].difficult;
		}
	}
}
</script>
