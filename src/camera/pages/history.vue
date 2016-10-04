<template>
    <view-box v-ref:view-box class="cameraHistory">
      <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
        <x-header :left-options="{showBack: true}">拍题记录</x-header>
      </div>
      <div style="margin-top:46px;" class="main">
        <flexbox class="list" v-for="item in list">
          <flexbox-item :span="2/5">
            <img class="previewer-demo-img"  v-lazy="item.compressPic" @click="_show($index)">
          </flexbox-item>
          <flexbox-item :span="3/5" style="position:relative">
            <div v-touch:tap="_record(item.importantId,item.id)">
                <div class="title">{{{item.knowledge}}}</div>
                  <div class="difficult">
                    难度：{{item.difficult}}
                  </div>
                  <div class="time">{{{item.cameraTime | ymd}}} </div>
              </div>
              <i class="icon iconfont icon-clear"  v-touch:tap="_remove(item.id,$index)"></i>
            </flexbox-item>
          </flexbox>
      </div>

      <infinite-loading :on-infinite="_onInfinite" spinner="waveDots">
        <span slot="no-results" style="color:#4bb7aa;">
            <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
            <p style="font-size:1rem;display:inline-block;">还没收藏习题~</p>
        </span>
        <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已加载全部记录</span>
      </infinite-loading>

    </view-box>
    <previewer :list="imgList" v-ref:previewer ></previewer>
    <confirm :show.sync="clearShow" confirm-text="是" cancel-text="否" title="确定移除此题么?" @on-confirm="_delelte()"></confirm>

  </div>
</template>

<script>
import {XHeader,Panel,ViewBox,FlexboxItem,Flexbox,Previewer,Confirm} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import store from '../../store'
import { period_id,subject_id,token } from '../../common/getters'
import { cameraHistoryIds,cameraHistoryList,cameraHistoryTotalPage } from '../getters'
import { getCameraHistoryIds,getCameraHistoryList,delCameraHistroy } from '../actions'
import * as _ from '../../config/whole'

export default {
  components: {
    XHeader,Panel,ViewBox,FlexboxItem,Flexbox,Previewer,Confirm,InfiniteLoading
  },
  vuex: {
      getters: {
          period_id,subject_id,token,cameraHistoryIds,cameraHistoryList,cameraHistoryTotalPage
      },
      actions: {
          getCameraHistoryIds,getCameraHistoryList,delCameraHistroy
      }
  },
  store,
  methods: {
    _remove(id,index) {
      this.clearShow = true;
      this.delPic.index = index;
      this.delPic.id = id;
    },
    _record(importantId,id) {
      this.$router.go(`/camera/record/${importantId}/${id}`);
    },
    _show(index) {
      this.imgList[0].src = this.list[index].pic;
      this.imgList[0].w = this.list[index].width;
      this.imgList[0].h = this.list[index].height;
      this.$refs.previewer.show();
    },
    _onInfinite(){
      this.getCameraHistoryIds({
          currentPage:this.currentPage,
          token:this.token,
          options:{
              period_id:this.period_id,
              subject_id:this.subject_id
          }
      },()=>{
          this.$broadcast('$InfiniteLoading:loaded');
          setTimeout(()=>{
              if(this.cameraHistoryTotalPage <= this.currentPage){
                  this.$broadcast('$InfiniteLoading:complete');
                  return;
              }
              this.currentPage ++;
          },500);
      })
    },
    _delelte(){
       this.delCameraHistroy({
          token:this.token,
          options:{
              id:this.delPic.id,
              period_id:this.period_id,
              subject_id:this.subject_id
          }
      },()=>{
          this.list.$remove(this.list[this.delPic.index]);
          _.toast("删除成功");
      });
    }
  },
  data() {
    return {
      currentPage:1,
      clearShow: false,
      //待删除的索引
      delPic:{
        index:'',
        id:''
      },
      list:[],
      imgList: [{
        src: '',
        w: '',
        h: ''
      }]
    }
  },
  watch:{
    cameraHistoryIds(){
        let params = {
            options:{
                ids:this.cameraHistoryIds,
                period_id:this.period_id,
                subject_id:this.subject_id
            },
            token:this.token
        };
        this.getCameraHistoryList(params);
    },
    cameraHistoryList(){
        this.list =  this.list.concat(this.cameraHistoryList);
    }
  }
}
</script>
