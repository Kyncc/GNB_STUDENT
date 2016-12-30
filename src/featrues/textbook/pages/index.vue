<template>
  <view-box v-ref:view-box class='textbookIndex'>
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        我的教材
        <a slot="right" @click="_changeSub()" class="changeSub">{{textBookSubjectId | subName}}<span class="with_arrow"></span></a>
      </x-header>
    </div>

    <div style="padding-top:46px;">

      <group title="教材列表">
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
      <x-button style="width:100%;border-radius:0px;background:#fff;color:#000;border-top:1px solid #d9d9d9" type="primary" @click="_addTextBook()">添加教材</x-button>
    </tabbar>
    
  </view-box>

  <!--切换课程-->
  <gnb-change-sub :visible.sync="visible" :subject="userSubjectList" :selected="textBookSubjectId" @on-click-back="_changeSubject"><gnb-change-sub>

</template>
<script>
import {XHeader,XInput,Group,Selector,Cell,ViewBox,Tabbar,XButton} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {token,userSubjectList} from '../../../common/getters'
import {getTextbook,setSubject} from '../actions'
import {MyTextbook,textBookSubjectId} from '../getters'
import gnbChangeSub from '../../../components/changesub/index.vue'

export default {
  components: {
    XHeader,XInput,Group,Selector,Cell,ViewBox,Tabbar,XButton,InfiniteLoading,gnbChangeSub
  },
  filters: {
    subName(id){
        switch(id){
            case '2':return '数学';
            case '7':return '物理';
            case '8':return '化学';
        }
    }    
  },
  vuex: {
		getters: {
			token,MyTextbook,textBookSubjectId,userSubjectList
		},
		actions: {
      getTextbook,setSubject
		}
	},
  data(){
    return {
        visible:false
    }
  },
  methods: {
    /** 是否第一次*/
     _isFirst(){
        if(this.MyTextbook.length != 0){
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
            return;
        }
     }, 
    _addTextBook(){
        this.$router.go('add');
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
      if(this.MyTextbook.length != 0 ){
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
            return;
      }

			this.getTextbook({
				token:this.token,   
        subjectId:this.textBookSubjectId
			},()=>{
					if(this.MyTextbook.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
          this.$broadcast('$InfiniteLoading:complete');
			});
		}
  },
  watch:{
    /** 切换学科*/
    textBookSubjectId(){
        this.$nextTick(() => {
            this.$broadcast('$InfiniteLoading:reset');
        });
    }
  }
}
</script>
