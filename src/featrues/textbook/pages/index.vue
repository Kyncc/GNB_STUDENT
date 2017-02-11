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
        <cell v-for="item in textbookMy.list" :title="item.textbookName"></cell>
      </group>

      <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont" style="font-size:1.5rem;margin-right:.2rem"></i>
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
  <gnb-change-sub :visible.sync="visible" :subject="User.subjectType" :selected="textBookSubjectId" @on-click-back="_changeSubject"><gnb-change-sub>

</template>
<script>
import {XHeader,XInput,Group,Selector,Cell,ViewBox,Tabbar,XButton} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {gnbChangeSub} from 'components'
import { mapActions,mapGetters  } from 'vuex'


export default {
  components: {
    XHeader,XInput,Group,Selector,Cell,ViewBox,Tabbar,XButton,InfiniteLoading,gnbChangeSub
  },
   route:{
    data:function(transition){
      if(this.textbookMy.isReset && this.textbookMy.list.length == 0){
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        });
      }
    }
  },
  data(){
    return {
        visible:false
    }
  },
  methods: {
    ...mapActions(['getTextbook','setTextbookSubject']),
    _addTextBook(){
         this.$router.go(`add?subjectId=${this.textBookSubjectId}`);
    },
    _changeSub(){
        this.visible = true;
    },
    /** 切换科目*/
    _changeSubject(item){
        this.subjectName = item.value;
        this.setTextbookSubject(item.id);       //更换科目
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        });
        this.visible = false;
    },
    _onInfinite(){
      this.getTextbook()
      .then(()=>{
        if(this.textbookMy.list.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
        this.$broadcast('$InfiniteLoading:complete');
      });
    }
  },
  computed:{
    ...mapGetters(['User','textBookSubjectId','textbookMy'])
  }
}
</script>
