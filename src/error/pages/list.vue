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

			<div style="padding-top:98px;">
					<div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in list">
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
					<infinite-loading :on-infinite="onInfinite" spinner="waveDots">
						<span slot="no-more" style="color:#4bb7aa;">
								<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
								<p style="font-size:1rem;display:inline-block;">没有更多数据了</p>
						</span>
					</infinite-loading>
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
import InfiniteLoading from 'vue-infinite-loading'
import {
  period_id,
  subject_id,
  token
} from '../../common/getters'
import {
  errorListIds,
  errorListList,
  errorListTotalPage
} from '../getters'
import {
  getErrorListIds,
  getErrorListList
} from '../actions'
import moment from 'moment'


export default {
	components: {
		XHeader,
		Flexbox,
		FlexboxItem,
		ViewBox,
		Group,
		Previewer
	},
	vuex:{
		actions:{
			getErrorListIds,
		    getErrorListList
		},
		getters:{
			errorListIds,
		    errorListList,
		    errorListTotalPage,
			period_id,
		    subject_id,
		    token
		}
	},
	data() {
		return {
			ashow: false,
			list: [],
			currentPage: 1,
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
		},
	    onInfinite() {
	      let that = this;
	      //根据索引获取题目
	      if (this.totalPage < this.currentPage) {
	        this.$broadcast('$InfiniteLoading:complete');
	        return;
	      }
	      this.getErrorListIds({
	        currentPage: that.currentPage,
	        token: that.token,
	        options: {
	          period_id: that.period_id,
	          subject_id: that.subject_id
	        }
	      }, () => {
	        setTimeout(() => {
	          that.$broadcast('$InfiniteLoading:loaded');
	        }, 1000);
	      })
	      this.currentPage++;
	    }
	},
    computed: {
      totalPage() {
        return this.errorListTotalPage;
      }
    },
    watch: {
      errorListIds() {
        let params = {
          options: {
            ids: this.errorListIds,
            period_id: this.period_id,
            subject_id: this.subject_id
          },
          token: this.token
        };
        this.getErrorListList(params)
      },
      errorListList() {
        this.list = this.list.concat(this.errorListList);
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
