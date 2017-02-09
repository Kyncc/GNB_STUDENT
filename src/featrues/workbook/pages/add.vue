<template>
  <view-box v-ref:view-box class='rememberAdd'>
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        添加{{workbookSubjectId|subName}}习题册
        <a slot="right" @click="_addWorkbook()" v-show="selectBookList.length != 0">完成</a>
      </x-header>
      <search @on-submit="_onSearch"  @on-change="_onSearch" :value.sync="searchName" :auto-fixed="false" placeholder="请输入习题册名"></search>
    </div>

    <div style="padding-top:86px;">
        <template v-for="item in workbookAll.list">
            <group :title="item.textbookName">
                <checklist :options="item.list|covert" :value.sync="selectBookList" ></checklist>
            </group>
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
</template>
<script>


import {XHeader,XInput,Group,Selector,Cell,ViewBox,XButton,Checklist,Search} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {gnbChangeSub} from 'components'
import { mapActions,mapGetters  } from 'vuex'
import * as _ from 'config/whole'

export default {
  components: {
    XHeader,XInput,Group,Selector,Cell,ViewBox,XButton,Checklist,InfiniteLoading,Search
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
   data() {
    return {
      selectBookList:[],
      searchName:''
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
    }
  },
  methods: {
    ...mapActions(['addWorkbook','workbookAllClear','getWorkbookAll']),
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
          "workbookName":this.searchName
      })
      .then(()=>{
          if(this.workbookAll.list.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
          this.$broadcast('$InfiniteLoading:complete');
      });
    }
  },
  computed:{
    ...mapGetters(['workbookSubjectId','workbookAll'])
  }
}
</script>
