<template>
	<view-box v-ref:view-box class="messageCorrect">
		 <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">纠错消息</x-header>
        </div>
		<div style="padding-top:46px;" class="messageSection">
			<section v-for="item in messageCorrectList">
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
import { getMessageCorrect } from '../actions'
import { messageCorrectList } from '../getters'


export default {
	components: {
		XHeader,ViewBox
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
	ready(){
		let parme = {
			"token":this.token
		}
		this.getMessageCorrect(parme);
  	}
}
</script>



