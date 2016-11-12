<template >
    <view-box v-ref:view-box class="reportIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
                成绩报告单
                <a slot="right" @click="_change()" class="changeSub">
                    {{subjectName}}
                    <span class="with_arrow"></span>
                </a>
            </x-header>
        </div>

        <div style="padding-top:46px;height:100%">
            <div id='wrapper' style="height:100%" >
                <accordion :list="reportChapter" link="report/detail/" @on-click-back="_openChapter" ></accordion>
            </div>
             <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
                <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">你还未做题呢~</p>
                </span>
                <span slot="no-more"></span>
            </infinite-loading>
        </div>
        
        <gnb-change-sub :visible.sync="visible" :subject="subjectList" :selected="2" @on-click-back="_click"><gnb-change-sub>
    </view-box>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader,Panel,ViewBox,Flexbox,FlexboxItem,XButton,Group,Cell} from 'vux'
import JRoll from 'jroll'
import '../../common/pulldown.js'
import {subject_id,token } from '../../common/getters'
import {reportChapter,reportScoll} from '../getters'
import {getReport,changeChapter,setScoll} from '../actions'
import gnbChangeSub from '../../components/changesub/index.vue'
import accordion from '../../components/accordion'
import '../index.less'

export default {
  components: {
    XHeader,ViewBox,Panel,Flexbox,FlexboxItem,XButton,Group,Cell,accordion,gnbChangeSub,InfiniteLoading
  },
  vuex: { 
    getters: {
        subject_id,token,reportChapter,reportScoll
    },
    actions: {
        changeChapter,getReport,setScoll
    }
  },
  store,
  methods: {
	_back() {
      this.$router.go('/main');
    },
    _change(){
        this.visible = true;
    },
    _click(item){
        this.subjectName = item.value;
        this.visible = false;
    },
    _openChapter(index){
        this.changeChapter(index);
        this.jroll.refresh();
        let self = this;
        this.jroll.on("scrollEnd", function() {
            self.setScoll(this.y);
        });
    },
    _onInfinite(){
        if(this.reportChapter.length != 0){
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
            return;
        }
        this.getReport({
            token:this.token,   
            subject_id:'2'
        },()=>{
            if(this.reportChapter.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
            this.$broadcast('$InfiniteLoading:complete');
        });
    }   
  },
   data(){
        return {
			visible:false,
            subjectList:['math','physics'],
            subjectName:'数学',
            jroll:{}
        }
    },
  ready(){
        let self = this;
        this.jroll = new JRoll("#wrapper");
        // if(this.reportScoll){
        //     this.jroll.scrollTo(0, -110, 0);
        // }
        // console.log(this.reportScoll);
        this.jroll.scrollTo(0,this.reportScoll,0);
        this.jroll.pulldown({
            refresh: function(complete) {
                self.getReport({token:this.token,subject_id:'2'},()=>{
                    complete();
                    self.setScoll(0);
                })
            }
        });
  }
}
</script>
