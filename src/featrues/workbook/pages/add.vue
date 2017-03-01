<template>
  <view-box class='rememberAdd'>
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        <change-text-book :value.sync="textbookId" :user-textbook="User.textbook" :subject-id="workbookSubjectId"></change-text-book>
        <a slot="right" @click="_changeSub" class="changeSub">{{workbookSubjectId | subName}}<span class="with_arrow"></span></a>
      </x-header>
      <search @on-submit="_onSearch" @on-change="_onSearch" :value.sync="searchName" :auto-fixed="false" placeholder="请输入习题册名"></search>
    </div>

    <div style="padding-top:90px;">
      <template v-for="item in workbookAll.list">
        <workbook-list :item="item"></workbook-list>
      </template>
      <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
        <span slot="no-results" style="color:#4bb7aa;">
            <i class="icon iconfont" style="font-size:1.5rem;margin-right:.2rem"></i>
            <p style="font-size:1rem;display:inline-block;"  @click="_addTextBook()">{{(searchName.length == 0 ? '暂无更多习题册':'查询无结果')}}</p>
        </span>
        <span slot="no-more"></span>
      </infinite-loading>
    </div>
  </view-box>
   <gnb-change-sub :visible.sync="visible" :selected="workbookSubjectId" :subject="User.subjectType" @on-click-back="_changeSubject"></gnb-change-sub>
</template>
<script>


import {XHeader,XInput,Group,Selector,Cell,ViewBox,XButton,Checklist,Search} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {workbookList,gnbChangeSub,changeTextBook} from 'components'
import { mapActions,mapGetters  } from 'vuex'
import * as _ from 'config/whole'

export default {
  components: {
    XHeader,XInput,Group,Selector,Cell,ViewBox,XButton,Checklist,InfiniteLoading,Search,workbookList,gnbChangeSub,changeTextBook
  },
  created () {
    this.textbookId = this.User.textbook['math'][0].id;
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
    }
   },
   data() {
    return {
      selectBookList:[],
      searchName:'',
      visible:false,
      textbookId:''
    }
  },
  route:{
    data:function(transition){
      if(this.workbookAll.isReset){
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        });
      }
      this.selectBookList = [];
      this.searchName = '';
      //根据query切换需要添加科目的课本
      if(this.Query.subjectId.length != 0 ){
        this.setWorkBookSubject(this.Query.subjectId);
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        });
      }

    }
  },
  methods: {
    ...mapActions(['addWorkbook','workbookAllClear','getWorkbookAll','setWorkBookSubject']),
    /** 切换科目*/
    _changeSubject(item){
      this.subjectName = item.value;
      this.visible = false;
      this.setWorkBookSubject(item.id);       //更换科目
      this.$broadcast('$InfiniteLoading:reset');
    },
    _changeSub(){
      this.visible = true;
    },
    _addTextBook(){
      if(this.searchName.length == 0){
        this.$router.go(`add`);
      }
    },
    _onSearch(str){
      this.searchName = str;
      this.workbookAllClear();      //搜索需要清除数据
      this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
      });
    },
    _addWorkbook(){
      this.addWorkbook({
        id:this.selectBookList
      })
      .then(()=>{
          _.toast('添加成功');
          history.back();
      })
    },
    _onInfinite(){
      this.getWorkbookAll({
        "workbookName":this.searchName,
        "textbookId":this.textbookId
      })
      .then(()=>{
          if(this.workbookAll.list.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
          this.$broadcast('$InfiniteLoading:complete');
      });
    }
  },
  computed:{
    ...mapGetters(['workbookSubjectId','workbookAll','Query','User'])
  },
  watch: {
    textbookId(){
      this.workbookAllClear();
      this.$broadcast('$InfiniteLoading:reset');
    }
  }
}
</script>
