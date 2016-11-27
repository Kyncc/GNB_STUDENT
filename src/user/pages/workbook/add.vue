<template>
  <view-box v-ref:view-box class='rememberAdd'>

    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        添加{{workbookSubjectId|subName}}习题册
        <a slot="right" @click="_addTextBook()" v-show="selectBookList.length != 0">
             完成
         </a>
      </x-header>
      <search @on-submit="_onSearch"  @on-change="_onSearch" :value.sync="searchName" :auto-fixed="false" placeholder="请输入习题册名"></search>
    </div>

    <div style="padding-top:86px;">

        <template v-for="item in AllWorkbook">
            <group :title="item.textbookName">
                <checklist :options="item.list|covert" :value.sync="selectBookList" ></checklist>
            </group>
        </template>  

        <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
            <span slot="no-results" style="color:#4bb7aa;">
                <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                <p style="font-size:1rem;display:inline-block;">请先添加教材~</p>
            </span>
            <span slot="no-more"></span>
        </infinite-loading>
        
    </div>

  </view-box>
</template>
<script>


import Vue from 'vue'
import Router from 'vue-router'
import store from '../../../store'
import {XHeader,XInput,Group,Selector,Cell,ViewBox,XButton,Checklist,Search} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {token} from '../../../common/getters'
import {AllWorkbook,workbookSubjectId} from '../../getters'
import {getWorkbookAll,setSubject,workbookAllDel,addWorkbook} from '../../actions/workbook'
import gnbChangeSub from '../../../components/changesub/index.vue'
import * as _ from '../../../config/whole.js'
import './index.less'


export default {
  components: {
    XHeader,XInput,Group,Selector,Cell,ViewBox,XButton,Checklist,InfiniteLoading,Search
  },
  vuex: {
    getters: {
        token,AllWorkbook,workbookSubjectId
    },
    actions: {
        getWorkbookAll,addWorkbook,workbookAllDel
    }
  },
   filters: {
       covert(obj){
            let newObj = [];
            obj.forEach((item, index)=> {
                newObj.push({
                    key: item.workbookId || '',
                    value: item.workbookName || ''
                });
            });
           return newObj;
       },
       subName(id){
            switch(id){
                case '2':return '数学';
                case '7':return '物理';
                case '8':return '化学';
            }
       }    
   },
   store,
   data() {
        return {
            selectBookList:[],
            searchName:''
        }
  },
  methods: {
        _onSearch(str){
            this.searchName = str;
            this.workbookAllDel();      //搜索需要清除数据
            this.$nextTick(() => {
                this.$broadcast('$InfiniteLoading:reset');
            });
        },
        _addTextBook(){
            this.addWorkbook({
                token:this.token,   
                workbookId:this.selectBookList
            },()=>{
                _.toast('添加成功');
                history.back();
            })
        },
        _isFirst(){
            if(this.AllWorkbook.length != 0 ){
                this.$broadcast('$InfiniteLoading:loaded');
                this.$broadcast('$InfiniteLoading:complete');
                return;
            }
        },
        _onInfinite(){
            this._isFirst();
            this.getWorkbookAll({
                token:this.token,   
                subjectId:this.workbookSubjectId,
                 workbookName:this.searchName
            },()=>{
                if(this.AllWorkbook.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
                this.$broadcast('$InfiniteLoading:complete');
            });
        }
    }
}
</script>
