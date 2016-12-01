<template>
    <view-box v-ref:view-box class="workbookIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}" @on-click-back="_back()">
                我的习题册
                <a slot="right" @click="_changeSub()" class="changeSub">{{workbookSubjectId | subName}}<span class="with_arrow"></span></a>
            </x-header>
        </div>
						
        <div style="padding-top:46px;">
            <template v-for="item in MyWorkbook">
                 <template v-if="item">
                    <group :title="item.textbookName">
                        <cell v-for="workbook in item.list" :title="workbook.workbookName"></cell>
                    </group>
                </template>
            </template>
            
            <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
                <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">您还未添加该科目习题册~</p>
                </span>
                <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
            </infinite-loading>
        </div>

        <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
           <x-button style="width:100%;border-radius:0px;background:#fff;color:#000;border-top:1px solid #ddd" type="primary" @click="_add">添加习题册</x-button>
        </tabbar>

    </view-box>
    <!--切换课程-->
    <gnb-change-sub :visible.sync="visible" :subject="userSubjectList" :selected="workbookSubjectId" @on-click-back="_changeSubject"><gnb-change-sub>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../../store'
import {XHeader,Panel,ViewBox,Group,Cell,Tabbar,XButton} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {token,userSubjectList} from '../../../common/getters'
import {MyWorkbook,workbookSubjectId} from '../../getters'
import {getWorkbook,setSubject} from '../../actions/workbook'
import gnbChangeSub from '../../../components/changesub/index.vue'
import './index.less'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,gnbChangeSub,InfiniteLoading,Tabbar,XButton
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
    _add(){
        this.$router.go('add');
    },
    _back() {
        this.$router.go('/main/user');
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
        //若没有数据则重新提交
        if(this.MyWorkbook.length != 0 ){
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
            return;
        }

        this.getWorkbook({
            token:this.token,   
            subjectId:this.workbookSubjectId
        },()=>{
            if(this.MyWorkbook.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
            this.$broadcast('$InfiniteLoading:complete');
        });
    }   
  },
  vuex: {
    getters:{
        token,userSubjectList,MyWorkbook,workbookSubjectId
    },
    actions:{
        getWorkbook,setSubject
    }
  },
  store,
  data(){
    return {
        searchName:'',
        visible:false
    }
  },
  watch:{
    /** 切换学科*/
    workbookSubjectId(){
        this.$nextTick(() => {
            this.$broadcast('$InfiniteLoading:reset');
        });
    }
  }
}
</script>


