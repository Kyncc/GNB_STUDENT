<template>
  <view-box v-ref:view-box class='textbookIndex'>
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
        我的教材<a slot="right">科目</a>
      </x-header>
    </div>

    <div style="padding-top:46px;">
      <group>
        <cell v-for="item in MyTextbook" :title="item.textbookName"></cell>
      </group>

      <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
				<span slot="no-results" style="color:#4bb7aa;">
					<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
					<p style="font-size:1rem;display:inline-block;">快去添加点教材吧~</p>
				</span>
				<span slot="no-more"></span>
			</infinite-loading>
    </div>

    <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
      <x-button style="width:100%;border-radius:0px;" @click="_addTextBook()">教材添加</x-button>
    </tabbar>
    
  </view-box>
</template>
<script>
import {XHeader,XInput,Group,Selector,Cell,ViewBox,Tabbar,XButton} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {token} from '../../../common/getters'
import store from '../../../store' 
import {getTextbook} from '../../actions/textbook'
import {MyTextbook} from '../../getters'

export default {
  components: {
    XHeader,XInput,Group,Selector,Cell,ViewBox,Tabbar,XButton,InfiniteLoading
  },
  vuex: {
		getters: {
			token,MyTextbook
		},
		actions: {
      getTextbook
		}
	},
	store,
  methods: {
    _back() {
      this.$router.go('/main/user');
    },
    _addTextBook(){
      this.$router.go('add');
    },
    _onInfinite(){
      if(this.MyTextbook.length != 0){
          this.$broadcast('$InfiniteLoading:loaded');
          this.$broadcast('$InfiniteLoading:complete');
        return;
      }
			this.getTextbook({
				token:this.token,   
        subjectId:'2'
			},()=>{
					if(this.MyTextbook.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
          this.$broadcast('$InfiniteLoading:complete');
			});
		}
  }
}
</script>
