<template>
  <view-box v-ref:view-box class="workbookIndex">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        我的习题册
        <a slot="right" @click="_changeSub()" class="changeSub">{{workbookSubjectId | subName}}<span class="with_arrow"></span></a>
      </x-header>
    </div>

    <div style="padding-top:46px;">
      <template v-for="item in workbookMy.list">
        <template v-if="item">
          <group :title="item.textbookName">
            <cell v-for="workbook in item.list" :title="workbook.workbookName"></cell>
          </group>
        </template>
      </template>

      <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">您还未添加该科目习题册~</p>
        </span>
        <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
      </infinite-loading>
    </div>

    <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
      <x-button style="width:100%;border-radius:0px;background:#fff;color:#000;border-top:1px solid #d9d9d9" type="primary" @click="_add">添加习题册</x-button>
    </tabbar>

  </view-box>
  <!--切换课程-->
  <gnb-change-sub :visible.sync="visible" :subject="User.subjectType" :selected="workbookSubjectId" @on-click-back="_changeSubject"><gnb-change-sub>
</template>

<script>
import {XHeader,Panel,ViewBox,Group,Cell,Tabbar,XButton} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {gnbChangeSub} from 'components'
import { mapActions,mapGetters  } from 'vuex'

export default {
  components:{
  XHeader,ViewBox,Panel,Group,Cell,gnbChangeSub,InfiniteLoading,Tabbar,XButton
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
  route:{
    data:function(transition){
      if(this.workbookMy.isReset && this.workbookMy.list.length == 0){
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        });
      }
    }
  },
  methods: {
  ...mapActions(['getWorkbook','setWorkBookSubject']),
    _add(){
      this.$router.go('add');
    },
    _changeSub(){
      this.visible = true;
    },
    /** 切换科目*/
    _changeSubject(item){
      this.subjectName = item.value;
      this.setWorkBookSubject(item.id);       //更换科目
      this.$broadcast('$InfiniteLoading:reset');
      this.visible = false;
    },
    _onInfinite(){
      this.getWorkbook({
        token:this.token
      })
      .then((response)=>{
        if(this.workbookMy.list.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
        this.$broadcast('$InfiniteLoading:complete');
      });
    }
  },
  data(){
    return {
      searchName:'',
      visible:false
    }
  },
  computed:{
  ...mapGetters(['User','workbookSubjectId','workbookMy'])
  }
}
</script>


