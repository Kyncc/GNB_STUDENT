<template>
  <view-box class="workbookStuIndex">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}" >
        记错题
        <a slot="right" @click="_changeSub()" class="changeSub">{{workbookStuSubject | subName}}<span class="with_arrow"></span></a>
      </x-header>
    </div>

    <div style="padding-top:46px;">
      <template v-for="item in stuWorkBook">
         <template v-if="item">
          <group :title="item.textbookName">
            <cell v-for="workbook in item.list" :title="workbook.workbookName" link="javascript:;" @click="_toChapter(workbook.workbookId)"></cell>
          </group>
        </template>
      </template>
      
      <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;" @click="_add">快去添加习题册吧~</p>
        </span>
        <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
      </infinite-loading>
    </div>

    <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
      <x-button style="width:100%;border-radius:0px;background:#fff;color:#000;border-top:1px solid #d9d9d9" type="primary" @click="_add">我的习题册</x-button>
    </tabbar>

  </view-box>

  <!--切换课程-->
  <gnb-change-sub :visible.sync="visible" :subject="User.subjectType" :selected="workbookStuSubject" @on-click-back="_changeSubject"><gnb-change-sub>
</template>

<script>
import {XHeader,Panel,ViewBox,Group,Cell,XButton,Tabbar} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {gnbChangeSub} from 'components'
import { mapActions,mapGetters} from 'vuex'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,gnbChangeSub,InfiniteLoading,XButton,Tabbar
  },
  route: {
    data:function(transition){
      if(this.workbookStu.isReset){
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        })
      }
    }
  },
  methods: {
    ...mapActions(['workbookStuClear','getWorkbookStu','workbookStuChapterClear','workbookStuPageClear','workbookStuSetSubject']),
    _toChapter(id){
      this.workbookStuChapterClear();      //进去前清除章节数据
      this.workbookStuPageClear();      //进去前清除页码数据
      this.$router.go(`page/${id}`);
    }, 
    _changeSub(){
      this.visible = true;
    },
    //进入练习册管理
    _add(){
      this.workbookStuClear();
      this.$router.go(`/main/bag/workbook/add?subjectId=${this.workbookStuSubject}`);
    },
    /** 切换科目*/
    _changeSubject(item){
      this.subjectName = item.value;
      this.workbookStuSetSubject(item.id);       //更换科目
      this.visible = false;
      this.$nextTick(() => {
        this.$broadcast('$InfiniteLoading:reset');
      });
    },
    _onInfinite(){
      this.getWorkbookStu()
      .then(()=>{
        if(this.stuWorkBook.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
        this.$broadcast('$InfiniteLoading:complete');
      });
    }
  },
  data(){
    return {
      visible:false,
    }
  },
  computed:{
    ...mapGetters(['workbookStu','workbookStuSubject','Params','User']),
    stuWorkBook(){
      return this.workbookStu.list;
    },
    notice(){
      if(this.User.textbook['math'].id === '0'){
        return '点我添加课本';
      }else{
        return '点我添加练习册';
      }


    }
	}
}
</script>


