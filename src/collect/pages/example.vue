<template>
    <view-box v-ref:view-box class="collect">

        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
             <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()" >
                 收藏本
                <a slot="right" @click="_changeSub()" class="changeSub">{{CollectSubjectId | subName}}<span class="with_arrow"></span></a>
            </x-header>

            <flexbox style="padding:10px 0;background:#edf2f1;" class="vux-center">
                <div style="width:75%">
                    <button-tab>
                        <button-tab-item selected>习题收藏</button-tab-item>
                        <button-tab-item v-touch:tap="_camera">错题收藏</button-tab-item>
                    </button-tab>
                </div>
            </flexbox>
        </div>

        <div style="padding-top:98px;">
            <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in CollectExampleList">
                <div class="weui_panel_hd">
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
            
            <infinite-loading :on-infinite="_onInfinite" spinner="waveDots">
               <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">还没收藏习题~</p>
				</span>
                <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已加载全部收藏</span>
            </infinite-loading>
        </div>
        
	</view-box>
    <!--切换课程-->
    <gnb-change-sub :visible.sync="visible" :subject="userSubjectList" :selected="CollectSubjectId" @on-click-back="_changeSubject"><gnb-change-sub>
</template>

<script>
import {XHeader,Panel,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import store from '../../store'
import gnbChangeSub from '../../components/changesub/index.vue'
import { token,userSubjectList } from '../../common/getters'
import { CollectExampleIds,CollectExampleList,CollectExampleTotalPage,CollectSubjectId } from '../getters'
import { getCollectExampleIds,getCollectExampleList,setSubject,clearCollect } from '../actions'

export default {
    components: {
        XHeader,XButton,InfiniteLoading,gnbChangeSub,
        Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem
    },
    filters: {
        subName(id){
            switch(id){
                case '2':return '数学';
                case '7':return '物理';
            }
        }    
    },
    methods: {
        _camera(){
            this.clearCollect();
            this.$router.replace(`/collect/camera`);
        },
        _back(){
            this.$router.go('/main/');
        },
        _onInfinite(){
            this.getCollectExampleIds({
                currentPage:this.currentPage,
                token:this.token,
                options:{
                    subject_id:this.CollectSubjectId
                }
            },()=>{
                this.$broadcast('$InfiniteLoading:loaded');
                setTimeout(()=>{
                    if(this.totalPage <= this.currentPage){
                        this.$broadcast('$InfiniteLoading:complete');
                        return;
                    }
                    this.currentPage ++;
                 },300);
            })
       },
       _changeSub(){
            this.visible = true;
       },
        /** 切换科目*/
        _changeSubject(item){
            this.subjectName = item.value;
            this.setSubject(item.id);       //更换科目
            this.visible = false;
        },
    },
    vuex: {
        getters: {
            userSubjectList,token,
            CollectExampleIds,CollectExampleList,CollectExampleTotalPage,CollectSubjectId
        },
        actions: {
            getCollectExampleIds,getCollectExampleList,clearCollect,
            setSubject 
        }
    },
    store,
    data(){
        return{
            currentPage:1,
            visible:false
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
                    subject_id:this.CollectSubjectId
                },
                token:this.token
            };
            this.getCollectExampleList(params)
        },
        /** 切换学科*/
        CollectSubjectId(){
            this.$nextTick(() => {
                this.$broadcast('$InfiniteLoading:reset');
            });
        }
    }
}
</script>
