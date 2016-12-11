<template>

  <view-box v-ref:view-box class="brushList">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
        <x-header :left-options="{showBack: true}">
            记录题型
            <a slot="right" @click="_changeType()">
                <i class="icon iconfont icon-suoyoukuanxiaodian1" style="font-size:20px;"></i>
            </a>
        </x-header>
      <header v-if="brushList" class="sectionHeader"><p class="ellipsis">{{brushList.chapterName}}</p><font class="ellipsis">共<b>{{brushList.count}}</b>个题型</font></header>
    </div>

      <!--空白间隔-->
      <div style="padding-top:80px;">
        <template v-if="brushList">
            <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in brushList.list">
                <div class="weui_panel_hd">
                    {{{item.chapter_name}}}
                </div>
                <div class="weui_panel_bd">
                    <a class="weui_media_box weui_media_appmsg" @click="_intoDetail(item.excercise_id)">
                        <div class="weui_media_bd">
                            <p class="example_title">参考例题<b>难度：{{item.degree}}</b></p>
                            <p class="weui_media_desc">
                                {{{item.stem}}}
                            </p>
                        </div>
                    </a>
                </div>
                <div class="abandon">
                    <span  @click="_brushAction(1,item)">斩题</span>
                    <span  @click="_brushAction(2,item)">放弃</span>
                </div>
            </div>
        </template>

        <infinite-loading :on-infinite="_onInfinite" spinner="waveDots" style="height:60px">
            <span slot="no-results" style="color:#4bb7aa;">
                <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                <p style="font-size:1rem;display:inline-block;">您没有错题~</p>
            </span>
            <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">已加载全部</span>
        </infinite-loading>

        <Popup :visible.sync="visible"  popup-transition="popup-fade" class="gnb-changeSub">
            <p @click="_intoTypeList('1')" >斩题列表</p>
            <p @click="_intoTypeList('2')" >放弃列表</p>
        </Popup>
        
    </div>
  </view-box>

</template>

<script>
import {XHeader,Panel,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { Popup } from 'mint-ui'
import store from '../../store'
import { token } from '../../common/getters'
import { brushList,brushSubjectId,brushListScoll,brushListId,brushListOffset} from '../getters'
import { brushListClear,setScoll,getBushList,bushListAction } from '../actions/list'
import { changeType } from '../actions/typeList'

import '../index.less'


export default {
    components: {
        XHeader,XButton,InfiniteLoading,
        Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem,
        Popup
    },
    methods: {
        _changeType(){
            this.visible = true;
        },
        _intoTypeList(type){
            this.changeType(type);
            this.$router.go(`/brush/typeList/${this.brushListId}`);
        },
        _intoDetail(id){
            this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop+100);
            this.$router.go(`/brush/example/${id}`);
        },
        _brushAction(type,item){
             this.bushListAction({
                chapter_id:this.brushListId,
                excercise_id:item.excercise_id,
                token:this.token,
                subject_id:item.subject_id,
                status:type
            },()=>{
                this.$nextTick(() => {
				    this.$broadcast('$InfiniteLoading:reset');
			    });
            })
        },
        _onInfinite(){
            //如果剩余题目数量等于数量 则表示加载完毕
            if(this.brushList.list.length != 0 && (this.brushList.list.length == this.brushList.count)){
                this.$broadcast('$InfiniteLoading:loaded');
                this.$broadcast('$InfiniteLoading:complete');
                return;
            }

            this.getBushList({
                token:this.token,
                chapter_id:this.brushListId,
                subject_id:this.brushSubjectId,
                offset:this.brushListOffset
            },(res)=>{
                this.$broadcast('$InfiniteLoading:loaded');
                let length = Number(res.data.data.detail.length);
                // 
                if(length  < 5){
                    this.$broadcast('$InfiniteLoading:complete');
                    return;
                }
            })
       }
    },
    vuex: {
        getters: {
            token,brushList,brushSubjectId,brushListScoll,brushListId,brushListOffset
        },
        actions: {
            brushListClear,setScoll,getBushList,bushListAction,changeType
        }
    },
    data(){
        return{
            visible:false
        }
    },
    store,
    ready(){
        this.$nextTick(()=>{
            document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.brushListScoll;
        });
    }
}
</script>
