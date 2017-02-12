<template>
  <view-box v-ref:view-box class='textbookAdd'>
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        添加{{textBookSubjectId|subName}}课本
        <a slot="right" @click="_addTextBook()" v-show="selectBookList.length != 0">完成</a>
      </x-header>
    </div>
    <div style="padding-top:46px;">
      <group title="课本列表">
        <template v-if="textbookAll.list">
          <checklist :options="textbookAll.list|covert" :value.sync="selectBookList"></checklist>
        </template>
      </group>

      <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">已无课本可添加~</p>
        </span>
        <span slot="no-more"></span>
      </infinite-loading>
    </div>
  </view-box>
</template>
<script>

import {XHeader,XInput,Group,Selector,Cell,ViewBox,XButton,Checklist} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions,mapGetters  } from 'vuex'

export default {
  components: {
    XHeader,XInput,Group,Selector,Cell,ViewBox,XButton,Checklist,InfiniteLoading
  },
  route:{
      data:function(transition){
        if(this.textbookAll.isReset){
          this.$nextTick(() => {
            this.$broadcast('$InfiniteLoading:reset');
          });
        }
        this.selectBookList = [];
        //根据query切换需要添加科目的课本
        if(this.Query.subjectId.length != 0 ){
          this.setTextbookSubject(this.Query.subjectId);
          this.$nextTick(() => {
            this.$broadcast('$InfiniteLoading:reset');
          });
        }
      }
   },
   filters: {
       covert(obj){
            let newObj = [];
            obj.forEach((item, index)=> {
                newObj.push({
                    key: item.textbookId || '',
                    value: item.textbookName || ''
                });
            });
           return newObj;
       }
   },
   data(){
    return {
      selectBookList:[]
    }
  },
  methods: {
    ...mapActions(['addTextbook','getTextbookAll','setTextbookSubject']),
    _addTextBook(){
      this.addTextbook({
        textbookId:this.selectBookList
      })
      .then(()=>{
        history.back();
      });
    },
    _onInfinite(){
      this.getTextbookAll()
      .then((response)=>{
          if(this.textbookAll.list.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
          this.$broadcast('$InfiniteLoading:complete');
      });
    }
  },
  computed:{
    ...mapGetters(['textBookSubjectId','textbookAll','Query'])
  }
}
</script>
