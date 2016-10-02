<template>
<view-box v-ref:view-box class="camera">

  <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
    <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">收藏本</x-header>
    <flexbox style="padding:10px 0;background:#edf2f1;" class="vux-center">
      <flexbox-item :span="3/4">
        <button-tab>
          <button-tab-item v-touch:tap="_example">习题收藏</button-tab-item>
          <button-tab-item selected>错题收藏</button-tab-item>
        </button-tab>
      </flexbox-item>
    </flexbox>
  </div>

  <div style="padding-top:98px;" class="main">
      <flexbox class="list" v-for="item in list">
      <flexbox-item :span="2/5">
        <img class="previewer-demo-img" :src="item.compressPic" @click="_show(item.pic,$index)">
      </flexbox-item>
      <flexbox-item :span="3/5" style="position:relative">
        <div v-touch:tap="_record(item.importantId,item.id)">
            <div class="title">{{{item.knowledge}}}</div>
              <div class="difficult">
                难度：
                <!--<template v-for="1 in item.difficult">
                    <i class="icon iconfont icon-collect"></i>
                </template>-->
              </div>
              <div class="time">{{{item.cameraTime | ymd}}} </div>
          </div>
          <i class="icon iconfont icon-clear"  v-touch:tap="_remove(item.id,$index)"></i>
        </flexbox-item>
      <flexbox>
  </div>

  <infinite-loading :on-infinite="_onInfinite" spinner="waveDots">
     <span slot="no-results" style="color:#4bb7aa;">
					<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
					<p style="font-size:1rem;display:inline-block;">还没收藏习题~</p>
      </span>
      <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已加载全部收藏</span>
  </infinite-loading>
</view-box>

<!--<previewer :list="imgList" v-ref:previewer :options="options"></previewer>-->
<confirm :show.sync="show" confirm-text="是" cancel-text="否" title="确定将此题移除收藏么?" @on-confirm="_delelte()"></confirm>
</template>

<script>
import {XHeader,Panel,ViewBox,FlexboxItem,Flexbox,Previewer,Confirm,ButtonTab,ButtonTabItem,XButton} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import store from '../../store'
import {period_id,subject_id,token} from '../../common/getters'
import {CollectCameraIds,CollectCameraList,CollectCameraTotalPage} from '../getters'
import { getCollectCameraIds, getCollectCameraList} from '../actions'
import { collectRemove } from '../../common/actions'
import * as _ from '../../config/whole'
import './collect.less'

export default {
  components: {
    XHeader,Panel,ViewBox,FlexboxItem,Flexbox,Previewer,Confirm,ButtonTab,ButtonTabItem,InfiniteLoading,XButton
  },
  vuex: {
    getters: {
      period_id,subject_id,token,
      CollectCameraIds, CollectCameraList,CollectCameraTotalPage
    },
    actions: {
      getCollectCameraIds, getCollectCameraList,collectRemove
    }
  },
  store,
  methods: {
    _record(importantId,id){
      this.$router.go(`/collect/camera/detail/${importantId}/${id}`);
    },
    _example() {
      this.$router.replace(`/collect/example`);
    },
    _remove(id,index) {
      this.show = true;
      this.delPic.index = index;
      this.delPic.id = id;
    },
    _back() {
      this.$router.go('/main');
    },
    _delelte(){
       this.collectRemove({
        options:{
          id:this.delPic.id,
          period_id:this.period_id,
          subject_id:this.subject_id
        },
				token:this.token,
				type:'camera'
      },()=>{
          this.list.$remove(this.list[this.delPic.index]);
          _.toast("已取消");
      });
    },
    _onInfinite() {
        this.getCollectCameraIds({
          currentPage:this.currentPage,
          token:this.token,
          options:{
              period_id:this.period_id,
              subject_id:this.subject_id
          }
      },()=>{
          this.$broadcast('$InfiniteLoading:loaded');
          setTimeout(()=>{
              if(this.CollectCameraTotalPage <= this.currentPage){
                  this.$broadcast('$InfiniteLoading:complete');
                  return;
              }
              this.currentPage ++;
          },500);
      })
    }
  },
  data() {
    return {
      show: false,
      currentPage: 1,
      delPic:{
        index:'',
        id:''
      },
      list: []
    }
  },
  watch: {
    CollectCameraIds() {
      let params = {
        options: {
          ids: this.CollectCameraIds,
          period_id: this.period_id,
          subject_id: this.subject_id
        },
        token: this.token
      };
      this.getCollectCameraList(params)
    },
    CollectCameraList() {
      this.list = this.list.concat(this.CollectCameraList);
    }
  }
}
</script>
