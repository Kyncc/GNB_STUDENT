<template>
  <view-box v-ref:view-box class='textbookAdd'>
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        添加{{textBookSubjectId|subName}}教材
        <a slot="right" @click="_addTextBook()" v-show="selectBookList.length != 0">
             完成
        </a>
      </x-header>
    </div>
    <div style="padding-top:46px;">

      <group title="教材列表">
        <checklist :options="AllTextbook | covert" :value.sync="selectBookList" ></checklist>
      </group>

      <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
				<span slot="no-results" style="color:#4bb7aa;">
					<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
					<p style="font-size:1rem;display:inline-block;">已无教材可以添加~</p>
				</span>
				<span slot="no-more"></span>
			</infinite-loading>

    </div>
  </view-box>
</template>
<script>


import {XHeader,XInput,Group,Selector,Cell,ViewBox,XButton,Checklist} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {token} from '../../../common/getters'
import store from '../../../store' 
import * as _ from '../../../config/whole.js'
import {getTextbookAll,addTextbook} from '../../actions/textbook'
import {AllTextbook,textBookSubjectId} from '../../getters'
import './index.less'

export default {
  components: {
    XHeader,XInput,Group,Selector,Cell,ViewBox,XButton,Checklist,InfiniteLoading
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
       },
       subName(id){
            switch(id){
                case '2':return '数学';
                case '7':return '物理';
            }
       }    
   },
   data() {
    return {
      selectBookList:[]
    }
  },
  vuex: {
		getters: {
			token,AllTextbook,textBookSubjectId
		},
		actions: {
      getTextbookAll,addTextbook
		}
	},
	store,
  methods: {
    _addTextBook(){
        _.busy();
        this.addTextbook({
          token:this.token,   
          subjectId:this.textBookSubjectId,
          textbookId:this.selectBookList
			  },()=>{
          _.leave();
          _.toast('添加成功');
          history.back();
        });
    },
    _onInfinite(){
			this.getTextbookAll({
				token:this.token,   
        subjectId:this.textBookSubjectId
			},()=>{
					if(this.AllTextbook.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
          this.$broadcast('$InfiniteLoading:complete');
			});
		}
  }
}
</script>
