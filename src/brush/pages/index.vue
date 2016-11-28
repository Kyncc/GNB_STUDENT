<template >
    <view-box v-ref:view-box class="brushIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
                题型汇总
                <a slot="right" @click="_changeSub()" class="changeSub">{{brushSubjectId | subName}}<span class="with_arrow"></span></a>
            </x-header>
        </div>

        <div style="padding-top:46px;height:100%">
            <accordion :list="brushAll" link="brush/list/" @on-click-back="_openChapter" ></accordion>
            <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
                <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">您还未添加该科目教材~</p>
                </span>
                <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
            </infinite-loading>
        </div>
    </view-box>
    <gnb-change-sub :visible.sync="visible" :subject="userSubjectList" :selected="brushSubjectId" @on-click-back="_changeSubject"></gnb-change-sub>
</template>

<script>
import store from '../../store'
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader,Panel,ViewBox,Flexbox,FlexboxItem,XButton,Group,Cell} from 'vux'
import {token,userSubjectList } from '../../common/getters'
import {brushSubjectId,brushAll,brushScoll} from '../getters'
import {getBrush,changeChapter,setScoll,clearBrush,setSubject} from '../actions'
import gnbChangeSub from '../../components/changesub/index'
import accordion from '../../components/accordion'
import '../index.less'

export default {
  components: {
        XHeader,ViewBox,Panel,Flexbox,FlexboxItem,XButton,Group,Cell,accordion,gnbChangeSub,InfiniteLoading
  },
  vuex: {
    getters: {
        token,userSubjectList,
        brushSubjectId,brushAll,brushScoll
    },
    actions: {
        getBrush,changeChapter,setScoll,clearBrush,setSubject
    }
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
  store,
  methods: {
	_back() {
        this.$router.go('/main');
    },
    _changeSub(){
        this.visible = true;
    },
    /** 切换科目*/
    _changeSubject(item){
        this.subjectName = item.value;
        this.visible = false;
        this.setSubject(item.id);       //更换科目
        this.$nextTick(() => {
            this.$broadcast('$InfiniteLoading:reset');
        });
    },
    _openChapter(index){
        this.changeChapter(index);
    },
    _onInfinite(){
        if(this.brushAll.length != 0 ){
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
            return;
        }

        this.getBrush({
            token:this.token,   
            subject_id:this.brushSubjectId
        },()=>{
            if(this.brushAll.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
            this.$broadcast('$InfiniteLoading:complete');
        });
    }   
  },
   data(){
        return {
			visible:false
        }
  }
}
</script>
