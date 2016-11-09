<template>
<view-box v-ref:view-box class='workbool'>

   <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
          添加数学习题册
          <a slot="right" @click="_finish()">
              完成
          </a>
      </x-header>
  </div>

  <div style="padding-top:46px;">
      <group title="习题册列表">
         <checklist :options="workboolList" :value.sync="selectBookList" :required=false ></checklist>
      </group>

       <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
				<span slot="no-results" style="color:#4bb7aa;">
					<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
					<p style="font-size:1rem;display:inline-block;">已无练习册可以添加~</p>
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
import {getWorkbookAll,addWorkbook} from '../../actions/workbook'
import {AllWorkbook} from '../../getters'
import './index.less'

export default {
  components: {
   XHeader,XInput,Group,Selector,Cell,ViewBox,XButton,Checklist,InfiniteLoading
  },
  vuex: {
		getters: {
			token,AllWorkbook
		},
		actions: {
      getWorkbookAll,addWorkbook
		}
	},
	store,
   data() {
    return {
      selectBookList:[],
      workboolList:[{key: '1', value: '必修1'}, {key: '2', value: '必修2'}, {key: '3', value: '必修3'}],
    }
  },
  methods: {
    _addTextBook(){
        this.addWorkbook({
          token:this.token,   
          subjectId:'2',
          workbookId:this.selectBookList
			  },()=>{

        });
    },
    _finish(){
      if(this.selectBookList.length == 0){
        alert("还未选择练习册");
      }else{
        // history.back();
      }
    },
    _onInfinite(){
			this.getWorkbookAll({
				token:this.token,   
        subjectId:'2'
			},()=>{
					if(this.AllWorkbook.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
          this.$broadcast('$InfiniteLoading:complete');
			});
		},
  }
}
</script>


