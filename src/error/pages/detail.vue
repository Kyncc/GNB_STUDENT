<template>
	<view-box v-ref:view-box class="errorDetail">

		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
			<x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">例题</x-header>
		</div>

		<div style="padding-top:46px;">
			<!--内容-->
			<div v-for="detail in list">
				<div class="weui_panel weui_panel_access exerciseDetail">
					<div class="weui_panel_hd">
						<flexbox :gutter="0" wrap="wrap">
							<flexbox-item :span="2/4" style="color:#4bb7aa">例题内容</flexbox-item>
							<flexbox-item :span="1/4" style="text-align:right;">
								<template v-if="detail.collectTime == '0' ? true:false">
									<span @click="_collectAdd(detail.id)"><i class="icon iconfont icon-collect"></i>收藏</span>
								</template>
								<template v-if="detail.collectTime != '0' ? true:false">
									<span class="isCollect"><i class="icon iconfont icon-collect"></i>已收藏</span>
								</template>
							</flexbox-item>
							<flexbox-item :span="1/4" style="text-align:right" v-touch:tap="_correct"><i class="icon iconfont icon-error-login"></i>纠错</flexbox-item>
						</flexbox>				
					</div>
					<!--题目整体--> 
					<div class="weui_panel_bd"> 
						<!--题目-->
						<div class="weui_media_bd weui_media_box"> 
							<p class="weui_media_desc">
								{{{* detail.content }}}
							</p>
						</div> 
						<template v-if=" detail.type == '1' ? true:false">
							<div class="weui_media_bd weui_media_box options">
								<p class="weui_media_desc" v-for="value in detail.tabs"> 
									{{ $key }} : {{{* value }}}
								</p>
							</div>  
						</template>
					</div>
				</div>
				<!--解析--> 
				<div class="weui_panel weui_panel_access exerciseDetail">
					<div class="weui_panel_hd">
						<flexbox :gutter="0" wrap="wrap">
							<flexbox-item :span="2/5" style="color:#4bb7aa">本题解析：</flexbox-item>
						</flexbox>				
					</div> 
					<!--解析主体--> 
					<div class="weui_panel_bd"> 
						<div class="weui_media_bd weui_media_box "> 
							<p class="weui_media_desc">
								{{{* detail.answer }}}
							</p>
						</div> 
					</div>
				</div>
			</div>
		</div>

        <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
            <flexbox :gutter="0" wrap="wrap">
                <flexbox-item :span="1/3">
                    <x-button mini type="primary"  @click="_errorList">错题列表</x-button>
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
import { collectRemove,collectAdd } from '../../common/actions'
import { period_id,subject_id,token,id } from '../../common/getters'
import { errorIndexList } from '../getters'
import { getErrorList } from '../actions'
import store from '../../store'
import moment from 'moment'
import './error.less'


export default {
	components: {
		Tabbar, TabbarItem,XHeader,Flexbox,FlexboxItem,XButton,Confirm,ViewBox
	},
	store,
	vuex: {
        getters: {
            period_id,subject_id,token,id,errorIndexList
        },
        actions: {
            collectRemove,collectAdd,getErrorList
        }
    },
	methods: {
		_errorList(){
			this.$router.go('/error/list/'+this.list[0].knowledgeId)
		},
		_more(){
			this.$router.go('/error/more/'+this.list[0].knowledgeId)
		},
		_recommend(){
			this.$router.go('/error/recommend/'+this.list[0].knowledgeId);
		},
		_correct(){
			this.$router.go('/error/correct/'+this.list[0].id);
		},
		_back() {
			this.$router.go('/error');
		},
		_collectAdd(id){
			let self =  this;
			this.collectAdd({
				options:{
					id:self.id,
					period_id:self.period_id,
					subject_id:self.subject_id
				},
				token:self.token,
				type:'example'
			},()=>{
				self.list[0].collectTime = moment().unix();
			});
		},
		_getData(){
			let params = {
				options:{
					ids:[this.id],
					period_id:this.period_id,
					subject_id:this.subject_id
				},
				token:this.token
			};
			this.getErrorList(params);
		}
	},
	data(){
		return{
			 list:[]
		} 
	},
	ready(){
		this._getData()
	},
	watch:{
		id(){
			this._getData();
		},
		errorIndexList(){
			this.list = this.errorIndexList;
		}
	}
}
</script>
