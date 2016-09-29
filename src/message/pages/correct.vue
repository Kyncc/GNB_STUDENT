<template>
	<view-box v-ref:view-box class="messageCorrect">
		 <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">纠错消息</x-header>
        </div>
		<div style="padding-top:46px;" class="messageSection">
			<section v-for="item in list">
				<h3>{{item.time | ymd}}</h3>
				<article>
					{{item.content}}
				</article>
			</section>

			<infinite-loading :on-infinite="onInfinite" spinner="spiral">
				<span slot="no-results" style="color:#4bb7aa;">
					<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
					<p style="font-size:1rem;display:inline-block;">暂无消息~</p>
				</span>
				<span slot="no-more" ></span>
			</infinite-loading>
		</div>
	</view-box>
</template>
<script>
import {XHeader,ViewBox} from 'vux'
import store from '../../store' 
import { token } from '../../common/getters'
import { getMessageCorrect } from '../actions'
import { messageCorrectList } from '../getters'
import InfiniteLoading from 'vue-infinite-loading'

export default {
	components: {
		XHeader,ViewBox,InfiniteLoading
	},
	vuex: {
		getters: {
			token,messageCorrectList
		},
		actions: {
			getMessageCorrect
		}
	},
	store,
	data(){
		return {
			list: []
		}
	},
	methods: {
		onInfinite(){
			let self = this;
			this.getMessageCorrect({
				"token":this.token
			},()=>{
				setTimeout(()=>{
					self.list = self.messageCorrectList;
					if(self.list.length != 0) {self.$broadcast('$InfiniteLoading:loaded');}
					self.$broadcast('$InfiniteLoading:complete');
				},300);
			});
		}
	}
}
</script>



