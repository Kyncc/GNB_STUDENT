<template>
	<view-box v-ref:view-box class="cameraExample">
		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
			<x-header :left-options="{showBack:true}">例题详情</x-header>
		</div>

		<div style="padding-top:46px;">
			<!--内容-->
			<div v-for="detail in cameraExample">
				<div class="weui_panel weui_panel_access exerciseDetail" >
					<div class="weui_panel_hd">
                        <p style="width:25%;color:#4bb7aa">题干</p>
                        <p style="width:50%;text-align:right;" v-touch:tap="_collect(detail.collectTime)">
                            <span style="color:#666"><i class="icon iconfont icon-collect"></i>{{detail.collectTime | collect}}</span>
                        </p>
                        <p style="width:25%;text-align:right" v-touch:tap="_correct"> 
                            <span style="color:#666"><i class="icon iconfont icon-comment"></i>纠错</span>
                        </p>
					</div>
					<!--题目整体-->
					<div class="weui_panel_bd">
						<!--题目-->
						<div class="weui_media_bd weui_media_box">
							<p class="weui_media_desc">
								{{{ detail.content }}}
							</p>
						</div>
						<!--选项-->
						<template v-if=" detail.type == 1 ? true:false">
							<div class="weui_media_bd weui_media_box options">
								<p class="weui_media_desc" v-for="value in detail.tabs">
									{{ $key }} : {{{ value }}}
								</p>
							</div>
						</template> 

					</div>
				</div>
				<!--解析-->
				<div class="weui_panel weui_panel_access exerciseDetail">
					<div class="weui_panel_hd">
                        <div style="color:#4bb7aa;width:25%">解析</div>
					</div>
					<!--解析主体-->
					<div class="weui_panel_bd">
						<div class="weui_media_bd weui_media_box">
							<p class="weui_media_desc">
								{{{ detail.answer }}}
							</p>
						</div>
					</div>
				</div>
			</div>
			
			<infinite-loading :on-infinite="_onInfinite" spinner="default">
				<span slot="no-results" style="color:#4bb7aa;">
					<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
					<p style="font-size:1rem;display:inline-block;">服务器发生一点小问题~</p>
				</span>
				<span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
			</infinite-loading>

		</div>
	</view-box>

</template>

<script>
import {XHeader,Flexbox,FlexboxItem,XButton,Confirm,ViewBox} from 'vux'
import {getCameraExample,cameraExampleClear,collectAdd,collectRemove} from '../actions/example'
import {cameraHistorySubjectId,cameraExample,exampleId,cameraId} from '../getters'
import {token} from '../../common/getters'
import store from '../../store'
import InfiniteLoading from 'vue-infinite-loading'

export default {
	components: {
        XHeader,Flexbox,FlexboxItem,XButton,Confirm,ViewBox,InfiniteLoading
	},
    created(){
        this.cameraExampleClear();
    },
    filters: {
        collect(state){
           return (state == 0 ? '收藏':'取消');
        }    
    },
	vuex: {
        getters: {
            token,cameraHistorySubjectId,cameraExample,exampleId,cameraId
        },
        actions: {
          	getCameraExample,cameraExampleClear,collectAdd,collectRemove
        }
    },
	methods: {
		_onInfinite(){
			this.getCameraExample({
				options:{
					ids:[this.exampleId],
					subject_id:this.cameraHistorySubjectId
				},
				token:this.token
			},()=>{
                    if(this.cameraExample.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
                    this.$broadcast('$InfiniteLoading:complete');
				}
			)
		},
		_correct(){
			this.$router.go(`/camera/correct/${this.cameraHistorySubjectId}/${this.cameraId}`);
		},
		_collect(state){
            var parma = {
                options:{
                    id:this.exampleId,
                    subject_id:this.cameraHistorySubjectId
                },
                token:this.token,
                type:'example'
            }
			if(state == 0){
				this.collectAdd(parma);
			}else{
				this.collectRemove(parma);
			}
		}
	},
    store,
	watch:{
		exampleId(){
			this.$nextTick(() => {
				this.$broadcast('$InfiniteLoading:reset');
			});
		}
	}
}
</script>
