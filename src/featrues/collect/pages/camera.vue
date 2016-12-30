<template>
  <view-box v-ref:view-box class="camera">

    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">收藏本
          <a slot="right" @click="_changeSub()" class="changeSub">{{CollectSubjectId | subName}}<span class="with_arrow"></span></a>
      </x-header>
      <flexbox style="padding:10px 0;background:#edf2f1;" class="vux-center">
        <div style="width:75%">
          <button-tab>
            <button-tab-item v-touch:tap="_example">习题收藏</button-tab-item>
            <button-tab-item selected>错题收藏</button-tab-item>
          </button-tab>
        </div>
      </flexbox>
    </div>

    <div style="padding-top:98px;" class="main">
        <div class="list" v-for="item in CollectCameraList">
          <div style="width:40%;display:inline-block;float:left;">
            <img class="previewer-demo-img" v-lazy="item.compressPic" @click="_show($index)">
          </div>

          <div style="width:60%;display:inline-block;float:left;position:relative;top:20%;" >
              <div v-touch:tap="_record(item.importantId,item.id)">
                  <div class="title ellipsis">{{{item.knowledge}}}</div>
                  <div class="difficult">难度：{{item.difficult}}</div>
                  <div class="time">{{{item.cameraTime | ymd}}} </div>
              </div>
              <i class="icon iconfont icon-clear"  v-touch:tap="_remove(item.id,$index)"></i>
              <!--<i class="icon iconfont icon-clear"  v-touch:tap="_remove(item.id,$index)"></i>-->
          </div>
        </div>

        <infinite-loading :on-infinite="_onInfinite" spinner="waveDots">
          <span slot="no-results" style="color:#4bb7aa;">
              <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
              <p style="font-size:1rem;display:inline-block;">还没收藏习题~</p>
          </span>
          <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已加载全部收藏</span>
        </infinite-loading>

    </div>

    
  </view-box>

  <previewer :list="imgList" v-ref:previewer ></previewer>
  <!--切换课程-->
  <gnb-change-sub :visible.sync="visible" :subject="userSubjectList" :selected="CollectSubjectId" @on-click-back="_changeSubject"><gnb-change-sub>
  <confirm :show.sync="show" confirm-text="是" cancel-text="否" title="确定将此题移除收藏么?" @on-confirm="_delelte()"></confirm>
</template>

<script>
import {XHeader,Panel,ViewBox,FlexboxItem,Flexbox,Previewer,Confirm,ButtonTab,ButtonTabItem,XButton} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import gnbChangeSub from '../../components/changesub/index.vue'
import {userSubjectList,token} from '../../common/getters'
import {CollectCameraIds,CollectCameraList,CollectSubjectId,CollectCameraTotalPage,CollectCameraCurrentPage,CollectScoll} from '../getters'
import { getCollectCameraIds, getCollectCameraList,setSubject,clearCollect,setScoll} from '../actions'
import { collectRemove } from '../../common/actions'
import * as _ from '../../config/whole'
import './collect.less'

export default {
  components: {
    XHeader,Panel,ViewBox,FlexboxItem,Flexbox,Previewer,Confirm,ButtonTab,ButtonTabItem,InfiniteLoading,XButton,
    gnbChangeSub
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
      userSubjectList,token,
      CollectCameraIds,CollectCameraList,CollectSubjectId,CollectCameraTotalPage,CollectCameraCurrentPage,CollectScoll
    },
    actions: {
      getCollectCameraIds, getCollectCameraList,collectRemove,setSubject,clearCollect,setScoll
    }
  },
  methods: {
    _record(importantId,id){
      this.setScoll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop);
      this.$router.go(`/collect/camera/detail/${importantId}/${id}`);
    },
    _example() {
      this.clearCollect();
      this.$router.replace(`/collect/example`);
    },
    _show(index) {
      this.imgList[0].src = this.CollectCameraList[index].pic;
      this.imgList[0].w = this.CollectCameraList[index].width;
      this.imgList[0].h = this.CollectCameraList[index].height;
      this.$refs.previewer.show();
    },
    _remove(id,index) {
      this.show = true;
      this.delPic.index = index;
      this.delPic.id = id;
      this._delete();
    },
    _back() {
      this.$router.go('/main');
    },
    _delete(){
       this.collectRemove({
        options:{
          id:this.delPic.id,
          subject_id:this.CollectSubjectId
        },
				token:this.token,
				type:'camera'
      },()=>{
          // this.list.$remove(this.list[this.delPic.index]);
          _.toast("取消成功");
      });
    },
    _onInfinite() {
      this.getCollectCameraIds({
          currentPage:this.CollectCameraCurrentPage || [],
          token:this.token,
          options:{
              subject_id:this.CollectSubjectId
          }
      })
    },
    _changeSub(){
        this.visible = true;
    },
    /** 切换科目*/
    _changeSubject(item){
        this.subjectName = item.value;
        this.setSubject(item.id);       //更换科目
        this.visible = false;
    }
  },
  data() {
    return {
      visible:false,
      show: false,
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
  },
  watch: {
    CollectCameraIds() {
      if(this.CollectCameraIds.length == 0)  {
          this.$broadcast('$InfiniteLoading:loaded');
          this.$broadcast('$InfiniteLoading:complete');
          return;
      };

      let params = {
        options: {
          ids: this.CollectCameraIds,
          subject_id: this.CollectSubjectId
        },
        token: this.token
      };
      this.getCollectCameraList(params,()=>{
          this.$broadcast('$InfiniteLoading:loaded');
          if(this.CollectCameraCurrentPage  > this.CollectCameraTotalPage){
              this.$broadcast('$InfiniteLoading:complete');
              return;
          }
      })
    },
    /** 切换学科*/
    CollectSubjectId(){
        this.$nextTick(() => {
            this.$broadcast('$InfiniteLoading:reset');
        });
    }
  },
  ready(){
      this.$nextTick(()=>{
          document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.CollectScoll;
      });
  }
}
</script>
