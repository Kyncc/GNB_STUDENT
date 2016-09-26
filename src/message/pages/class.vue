<template>
	<view-box v-ref:view-box class="messageClass">
		 <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">班级消息</x-header>
        </div>
		<div style="padding-top:46px;" class="messageSection">
			<section v-for="item in messageClassList">
				<h3>{{item.time | ymd}}</h3>
				<article>
					{{item.content}}
				</article>
			</section>
		</div>
	</view-box>
</template>
<script>
import Vue from 'vue'
import Router from 'vue-router'
import {XHeader,ViewBox} from 'vux'
import store from '../../store' 
import { token } from '../../common/getters'
import { getMessageClass } from '../actions'
import { messageClassList } from '../getters'

export default {
	components: {
		XHeader,ViewBox
	},
	vuex: {
		getters: {
			token,messageClassList
		},
		actions: {
			getMessageClass
		}
	},
	store,
	ready(){
		let parme = {
			"token":this.token
		}
		this.getMessageClass(parme);
  	}
}
</script>



