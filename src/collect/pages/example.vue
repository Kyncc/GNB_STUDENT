<template>
    <view-box v-ref:view-box class="collect">

        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()" >收藏本</x-header>
            <flexbox style="padding:10px 0;background:#edf2f1;" class="vux-center">
                <flexbox-item :span="3/4">
                    <button-tab >
                        <button-tab-item selected>习题收藏</button-tab-item>
                        <button-tab-item v-touch:tap="_camera">错题收藏</button-tab-item>
                    </button-tab >
                </flexbox-item>
            </flexbox>
        </div>

        <div style="padding-top:98px;">
            <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in list">
                <div class="weui_panel_hd">
                    <x-button type='primary' mini>收藏题</x-button>
                    {{{item.knowledge}}}
                </div>
                <div class="weui_panel_bd">
                    <a class="weui_media_box weui_media_appmsg" href="#!/collect/example/detail/{{item.id}}">
                        <div class="weui_media_bd">
                            <p class="weui_media_desc">
                            {{{item.content}}}
                            </p>
                        </div>
                    </a>
                    <div class="weui_panel_ft">
                        <flexbox :gutter="0" wrap="wrap">
                            <flexbox-item :span="1/2">收藏时间：{{item.collectTime | ymd}}</flexbox-item>
                            <flexbox-item :span="1/4"></flexbox-item>
                            <flexbox-item :span="1/4" style="text-align:right"> 难度：{{item.difficult}}</flexbox-item>
                        </flexbox>
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

	</view-box>
</template>

<script>
import {XHeader,Panel,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import store from '../../store'
import { period_id,subject_id,token } from '../../common/getters'
import { CollectExampleIds,CollectExampleList,CollectExampleTotalPage } from '../getters'
import { getCollectExampleIds,getCollectExampleList } from '../actions'

export default {
    components: {
        XHeader,XButton,InfiniteLoading,
        Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem
    },
    methods: {
        _camera(){
            this.$router.replace(`/collect/camera`);
        },
        _back(){
			this.$router.go('/main/');
		},
        onInfinite(){
            let that = this;
            //根据索引获取题目
            if(this.totalPage < this.currentPage) {
                this.$broadcast('$InfiniteLoading:complete');
                return;
            }

            this.getCollectExampleIds({
                currentPage:that.currentPage,
                token:that.token,
                options:{
                    period_id:that.period_id,
                    subject_id:that.subject_id
                }
            },()=>{
                setTimeout(()=>{
                    that.$broadcast('$InfiniteLoading:loaded');
                },1000);
            })
            this.currentPage ++;

       }
    },
    vuex: {
        getters: {
            period_id,subject_id,token,
            CollectExampleIds,CollectExampleList,CollectExampleTotalPage
        },
        actions: {
            getCollectExampleIds,
            getCollectExampleList
        }
    },
    store,
    data(){
        return{
            currentPage:1,
            list:[]
        }
    },
    computed:{
        totalPage(){
            return this.CollectExampleTotalPage;
        }
    },
    watch:{
        CollectExampleIds(){
            let params = {
                options:{
                    ids:this.CollectExampleIds,
                    period_id:this.period_id,
                    subject_id:this.subject_id
                },
                token:this.token
            };
            this.getCollectExampleList(params)
        },
        CollectExampleList(){
            this.list =  this.list.concat(this.CollectExampleList);
        }
    }
}
</script>
