<template>
    <view-box v-ref:view-box class="cameraHistory">

      <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
        <x-header :left-options="{showBack: true}">拍题记录
            <a slot="right" @click="_changeSub()" class="changeSub">{{subjectName}}<span class="with_arrow"></span></a>
        </x-header>
      </div>

      <div style="margin-top:46px;" class="main">
        <flexbox class="list" v-for="item in cameraHistoryList" track-by="$index">
            <div style="width:40%"><img class="previewer-demo-img"  v-lazy="item.compressPic" @click="_show($index)"></div>
            <div style="position:relative;width:60%">
                <div v-touch:tap="_record(item.importantId,item.id)">
                    <div class="title ellipsis">{{{item.knowledge}}}</div>
                    <div class="difficult">难度：{{item.difficult}}</div>
                    <div class="time">{{{item.cameraTime | ymd}}}</div>
                </div>
                <p><i class="icon iconfont icon-clear"  v-touch:tap="_remove(item.id,$index)"></i></p>
            </div>
        </flexbox>
      </div>

      <infinite-loading :on-infinite="_onInfinite" spinner="waveDots">
        <span slot="no-results" style="color:#4bb7aa;">
            <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
            <p style="font-size:1rem;display:inline-block;">还没拍题记录~</p>
        </span>
        <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已加载全部记录</span>
      </infinite-loading>

    </view-box>
    <!--照片墙-->
    <previewer :list="imgList" v-ref:previewer ></previewer>
    <!--切换科目-->
    <gnb-change-sub :visible.sync="visible" :subject="subjectList" :selected="2" @on-click-back="_changeSubject"><gnb-change-sub>
    <!--确认框-->
    <confirm :show.sync="clearShow" confirm-text="是" cancel-text="否" title="确定移除此题么?" @on-confirm="_delelte()"></confirm>

  </div>
</template>

<script>
import {XHeader,Panel,ViewBox,FlexboxItem,Flexbox,Previewer,Confirm} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import gnbChangeSub from '../../components/changesub/index.vue'
import store from '../../store'
import moment from 'moment'
import { period_id,subject_id,token } from '../../common/getters'
import { collectRemove,collectAdd,setSubject } from '../../common/actions'
import { cameraHistoryIds,cameraHistoryList,cameraHistoryTotalPage,cameraHistoryCurrentPage,cameraHistorySubjectId } from '../getters'
import { getCameraHistoryIds,getCameraHistoryList,delCameraHistroy } from '../actions'
import * as _ from '../../config/whole'

export default {
  components: {
    XHeader,Panel,ViewBox,FlexboxItem,Flexbox,Previewer,Confirm,InfiniteLoading,moment,gnbChangeSub
  },
  vuex: {
      getters: {
          period_id,subject_id,token,
          cameraHistoryIds,cameraHistoryList,cameraHistoryTotalPage,cameraHistoryCurrentPage,cameraHistorySubjectId
      },
      actions: {
          getCameraHistoryIds,getCameraHistoryList,delCameraHistroy,collectRemove,setSubject
      }
  },
  store,
  methods: {
    _changeSub(){
        this.visible = true;
    },
    /** 切换科目*/
    _changeSubject(item){
        this.subjectName = item.value;
        this.visible = false;
        console.log(item.id);
        this.setSubject(item.id);       //更换科目
        // this._onInfinite();
    },
    /** 移除记录*/
    _remove(id,index) {
      this.clearShow = true;
      this.delPic.index = index;
      this.delPic.id = id;
    },
     /** 移除记录*/
    _removeCollect(id,index){
        let self =  this;
        this.collectRemove({
            options:{
                id:id,
                period_id:self.period_id,
                subject_id:self.cameraHistorySubjectId
            },
            token:self.token,
            type:'camera'
        },()=>{
            self.cameraHistoryList[index].collectTime = 0;
        });
    },
    _record(importantId,id) {
      this.$router.go(`/camera/record/${importantId}/${id}`);
    },
    _show(index) {
      this.imgList[0].src = this.cameraHistoryList[index].pic;
      this.imgList[0].w = this.cameraHistoryList[index].width;
      this.imgList[0].h = this.cameraHistoryList[index].height;
      this.$refs.previewer.show();
    },
    _onInfinite(){
        if(this.cameraHistoryTotalPage != 0 && this.cameraHistoryTotalPage <= this.cameraHistoryCurrentPage){
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
            return;
        }
        setTimeout(()=>{
            this.getCameraHistoryIds({
                currentPage:this.cameraHistoryCurrentPage,
                token:this.token,
                options:{
                    subject_id:this.cameraHistorySubjectId
                }
            },(ids)=>{
                this.$broadcast('$InfiniteLoading:loaded');
                if(this.cameraHistoryTotalPage <= this.cameraHistoryCurrentPage-1){
                    this.$broadcast('$InfiniteLoading:complete');
                    return;
                }
                let params = {
                    options:{
                        ids:ids,
                        period_id:this.period_id,
                        subject_id:this.cameraHistorySubjectId
                    },
                    token:this.token
                };
                this.getCameraHistoryList(params);
            })
        },500);
    },
    _delelte(){
       this.delCameraHistroy({
          token:this.token,
          options:{
              id:this.delPic.id,
              period_id:this.period_id,
              subject_id:this.cameraHistorySubjectId
          }
      },this.delPic.index,()=>{
          _.toast("删除成功");
      });
    }
  },
  data() {
    return {
      clearShow: false,
      visible:false,
      subjectName:'数学',
      subjectList:['math','physics'],
      //待删除的索引
      delPic:{
        index:'',
        id:''
      },
      imgList: [{
        src: '',
        w: '',
        h: ''
      }]
    }
  }
}
</script>
