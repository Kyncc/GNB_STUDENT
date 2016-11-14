<template>
    <view-box v-ref:view-box class="rememberIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
                记错题
                <a slot="right" @click="_changeSub()" class="changeSub">{{subjectName}}<span class="with_arrow"></span></a>
            </x-header>
        </div>
						
        <div style="padding-top:46px;">
            <template v-for="item in rememberWorkbook">
                 <template v-if="item.textbook">
                    <group :title="item.textbook.textbookName">
                        <cell v-for="workbook in item.textbook.list" :title="workbook.workbookName" :link="'/remember/select/'+workbook.workbookId"></cell>
                    </group>
                </template>
            </template>
            
            <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
                <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">你还未添加习题册呢~</p>
                </span>
                <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
            </infinite-loading>
           
        </div>
    </view-box>
    <!--切换课程-->
    <gnb-change-sub :visible.sync="visible" :subject="subjectList" :selected="2" @on-click-back="_changeSubject"><gnb-change-sub>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import {XHeader,Panel,ViewBox,Group,Cell,Search} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {token} from '../../common/getters'
import {rememberWorkbook,rememberSubjectId} from '../getters'
import {getWorkbook,setSubject} from '../actions/remember'

import gnbChangeSub from '../../components/changesub/index.vue'
import '../index.less'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,Search,gnbChangeSub,InfiniteLoading
  },
  methods: {
	_back() {
        this.$router.go('/main');
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
    _onInfinite(){
        if(this.rememberWorkbook.length != 0){
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
            return;
        }
        this.getWorkbook({
            token:this.token,   
            subjectId:this.rememberSubjectId
        },()=>{
            if(this.rememberWorkbook[0].textbook) {this.$broadcast('$InfiniteLoading:loaded');}
            this.$broadcast('$InfiniteLoading:complete');
        });
    }   
  },
  vuex: {
    getters:{
        token,rememberWorkbook,rememberSubjectId
    },
    actions:{
        getWorkbook,setSubject 
    }
  },
  store,
  data(){
    return {
        visible:false,
        subjectList:['math','physics'],
        subjectName:'数学',
    }
  },
  watch:{
    /** 切换学科*/
    rememberSubjectId(){
        this.$nextTick(() => {
            this.$broadcast('$InfiniteLoading:reset');
        });
    }
  }
}
</script>


