<template>
  <view-box v-ref:view-box class='textbook'>
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        添加数学教材
        <a slot="right" @click="_finish()">
              完成
          </a>
      </x-header>
    </div>
    <div style="padding-top:46px;">

      <group title="教材列表">
        <checklist :options="textBookList" :value.sync="selectBookList" :required=false></checklist>
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
import {getTextbookAll,addTextbook,getTextbook} from '../../actions/textbook'
import {AllTextbook} from '../../getters'

import './index.less'

export default {
  components: {
    XHeader,XInput,Group,Selector,Cell,ViewBox,XButton,Checklist,InfiniteLoading
  },
   data() {
    return {
      selectBookList:[],
      textBookList:[{key: '1', value: '必修1'}, {key: '2', value: '必修2'}, {key: '3', value: '必修3'}],
    }
  },
  vuex: {
		getters: {
			token,AllTextbook
		},
		actions: {
      getTextbookAll,addTextbook
		}
	},
	store,
  methods: {
    _back() {
      this.$router.go('/main/user');
    },
    _addTextBook(){
        this.addTextbook({
          token:this.token,   
          subjectId:'2',
          textbookId:this.selectBookList
			  },()=>{

        });
    },
    _onInfinite(){
			this.getTextbookAll({
				token:this.token,   
        subjectId:'2'
			},()=>{
					if(this.AllTextbook.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
          this.$broadcast('$InfiniteLoading:complete');
			});
		},
    _finish(){
      if(this.selectBookList.length == 0){
        alert("还未选择教材");
      }else{
        this._addTextBook();
      }
    }
  }
}
</script>
