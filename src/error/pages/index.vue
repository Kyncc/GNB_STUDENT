<template>
<view-box v-ref:view-box class="errorIndex">

  <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
    <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
        错题归纳
        <a slot="right" @click="_changeSub()" class="changeSub">{{errorSubjectId | subName}}<span class="with_arrow"></span></a>
    </x-header>
    <flexbox style="padding:10px 0;background:#edf2f1;" class="vux-center">
        <div style="width:75%">
            <button-tab>
                <button-tab-item v-touch:tap="_time('week')"  v-bind:selected="errorIndexTab == 0">一周内</button-tab-item>
                <button-tab-item v-touch:tap="_time('month')" v-bind:selected="errorIndexTab == 1">一月内</button-tab-item>
                <button-tab-item v-touch:tap="_time('all')" v-bind:selected="errorIndexTab == 2">全部</button-tab-item>
            </button-tab>
        </div>
    </flexbox>
  </div>

  <div style="padding-top:98px;">
    <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in errorIndexList">
      <div class="weui_panel_hd">
        <x-button type='primary' mini>参考例题</x-button>
        {{{item.knowledge}}}
      </div>
      <div class="weui_panel_bd">
        <a class="weui_media_box weui_media_appmsg" href="#!/error/detail/{{item.id}}">
          <div class="weui_media_bd">
            <p class="weui_media_desc">
              {{{item.content}}}
            </p>
          </div>
        </a>
        <div class="weui_panel_ft">
          <flexbox :gutter="0" wrap="wrap">
            <flexbox-item :span="1/2">难度：{{item.difficult}}</flexbox-item>
            <flexbox-item :span="1/4"></flexbox-item>
            <flexbox-item :span="1/4" style="text-align:right"> 错误{{item.errorCount}}次</flexbox-item>
          </flexbox>
        </div>
      </div>
    </div>

    <infinite-loading :on-infinite="_onInfinite" spinner="waveDots">
        <span slot="no-results" style="color:#4bb7aa;">
            <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
            <p style="font-size:1rem;display:inline-block;">还没有归纳错题~</p>
        </span>
        <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已加载全部~</span>
    </infinite-loading>

  </div>

</view-box>

<gnb-change-sub :visible.sync="visible" :subject="userSubjectList" :selected="errorSubjectId" @on-click-back="_changeSubject"></gnb-change-sub>
</template>

<script>
import {XHeader,Panel,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import store from '../../store'
import gnbChangeSub from '../../components/changesub/index'
import {token,userSubjectList} from '../../common/getters'
import {errorIndexIds,errorIndexList,errorIndexTotalPage,errorSubjectId,errorIndexCurrentPage,errorIndexTab} from '../getters'
import {getErrorIds,getErrorList,setSubject,clearError,setTabTime} from '../actions/index'
import moment from 'moment'

export default {
    components: {
        XHeader,XButton,InfiniteLoading,gnbChangeSub,
        Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem
    },
    vuex: {
        getters: {
            errorSubjectId,token,errorIndexIds,errorIndexList,errorIndexTotalPage,userSubjectList,errorIndexCurrentPage,errorIndexTab
        },
        actions: {
            getErrorIds,getErrorList,setSubject,clearError,setTabTime
        }
    },
    filters: {
      subName(id){
          switch(id){
              case '2':return '数学';
              case '7':return '物理';
              case '9':return '化学';
          }
      }    
    },
    methods: {
        _isFirst(){
            /*判断当前页面是否大于总页数 若大于则不在请求数据*/
            if(Number(this.errorIndexTotalPage) < Number(this.errorIndexCurrentPage)){
                 this.$broadcast('$InfiniteLoading:loaded');
                 this.$broadcast('$InfiniteLoading:complete');
                 return true;
            }
            return false;
        },
        _time(value) {
            if (value == 'week') {
                this.endTime= moment().unix();
                this.startTime = moment().add(-7, 'd').unix();
                this.setTabTime(0);
            } else if (value == 'month') {
                this.endTime = moment().unix();
                this.startTime = moment().add(-1, 'M').unix();
                this.setTabTime(1);
            } else {
                this.endTime = moment().unix();
                this.startTime = moment().add(-3, 'M').unix();
                this.setTabTime(2);
            }
            this.clearError();
			this.$nextTick(() => {
				this.$broadcast('$InfiniteLoading:reset');
			});
        },
        _back() {
            this.$router.go('/main');
        },
        _onInfinite(){
            if(this._isFirst()){
                return;
            }
            
            this.getErrorIds({
                currentPage:this.errorIndexCurrentPage,
                between:{
                    start:this.startTime,
                    end:this.endTime
                },
                token: this.token,
                options: {
                    subject_id: this.errorSubjectId
                }
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
            this.$nextTick(() => {
                this.$broadcast('$InfiniteLoading:reset');
            });
        }
    },
    store,
    data(){
        return{
            visible:false,
            endTime:moment().unix(),
            startTime:moment().add(-7, 'd').unix()
        }
    },
    watch:{
        errorIndexIds() {
            let params = {
                options: {
                    ids: this.errorIndexIds,
                    subject_id: this.errorSubjectId
                },
                token: this.token
            };
            this.getErrorList(params,()=>{
                setTimeout(()=>{
                    this.$broadcast('$InfiniteLoading:loaded');
                    if(this.errorIndexTotalPage <= this.errorIndexCurrentPage){
                        this.$broadcast('$InfiniteLoading:complete');
                        return;
                    }
                },500);
            });
        }
    }
}
</script>