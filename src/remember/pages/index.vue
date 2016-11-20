<template>
    <view-box v-ref:view-box class="rememberIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
                记错题
                <a slot="right" @click="_changeSub()" class="changeSub">{{rememberSubjectId | subName}}<span class="with_arrow"></span></a>
            </x-header>
        </div>
						
        <div style="padding-top:46px;">
            <template v-for="item in rememberWorkbook">
                 <template v-if="item">
                    <group :title="item.textbookName">
                        <cell v-for="workbook in item.list" :title="workbook.workbookName" @click="_toChapter(workbook.workbookId)"></cell>
                    </group>
                </template>
            </template>
            
            <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
                <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">你还未添加习题册呢~</p>
                </span>
                <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
            </infinite-loading>
        </div>

        <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
           <x-button style="width:100%;border-radius:0px;background:#fff;color:#000;border-top:1px solid #ccc" type="primary" @click="_add">添加习题册</x-button>
        </tabbar>

    </view-box>
    <!--切换课程-->
    <gnb-change-sub :visible.sync="visible" :subject="userSubjectList" :selected="rememberSubjectId" @on-click-back="_changeSubject"><gnb-change-sub>
</template>

<script>
import store from '../../store'
import {XHeader,Panel,ViewBox,Group,Cell,Search,Tabbar,XButton} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {token,userSubjectList} from '../../common/getters'
import {rememberWorkbook,rememberSubjectId} from '../getters'
import {getWorkbook,setSubject} from '../actions/remember'
import {delChapter} from '../actions/workbook'
import {WorkbookAllDel} from '../actions/add'
import gnbChangeSub from '../../components/changesub/index'
import '../index.less'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,Search,gnbChangeSub,InfiniteLoading,Tabbar,XButton
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
  methods: {
    _toChapter(str){
        this.delChapter();      //进去前清除章节数据
        this.$router.go('/remember/workbook/'+str);
    }, 
	_back(){
        this.$router.go('/main');
    },
    _add(){
        this.WorkbookAllDel();  //进去前清除所有练习册数据
        this.$router.go('/remember/add');
    },
    _changeSub(){
        this.visible = true;
    },
    /** 切换科目*/
    _changeSubject(item){
        this.subjectName = item.value;
        this.setSubject(item.id);       //更换科目
        this.visible = false;
        this.$nextTick(() => {
            this.$broadcast('$InfiniteLoading:reset');
        });
    },
    _onInfinite(){
        //若没有数据则重新提交
        if(this.rememberWorkbook.length != 0 ){
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
            return;
        }

        this.getWorkbook({
            token:this.token,   
            subjectId:this.rememberSubjectId
        },()=>{
            if(this.rememberWorkbook.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
            this.$broadcast('$InfiniteLoading:complete');
        });
    }   
  },
  vuex: {
    getters:{
        token,userSubjectList,
        rememberWorkbook,rememberSubjectId
    },
    actions:{
        getWorkbook,setSubject,delChapter,WorkbookAllDel
    }
  },
  store,
  data(){
    return {
        visible:false
    }
  }
}
</script>


