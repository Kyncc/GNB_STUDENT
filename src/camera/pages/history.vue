<template>
  <view-box v-ref:view-box class="cameraHistory">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">拍题记录
        <a slot="right" @click="_changeSub()" class="changeSub">{{cameraHistorySubjectId | subName}}<span class="with_arrow"></span></a>
      </x-header>
    </div>

    <div style="margin-top:46px;" class="main">
      <flexbox class="list" v-for="item in cameraHistoryList" track-by="$index">
        <div style="width:40%"><img class="previewer-demo-img" v-lazy="item.compressPic" @click="_show($index)"></div>
        <div style="position:relative;width:60%">
          <div v-touch:tap="_record(item.id,item.importantId)">
            <div class="title ellipsis">{{{item.knowledge}}}</div>
            <div class="difficult">难度：{{item.difficult}}</div>
            <div class="time">{{{item.cameraTime | ymd}}}</div>
          </div>
          <p><i class="icon iconfont icon-clear" v-touch:tap="_remove(item.id,$index)"></i></p>
        </div>
      </flexbox>

        <infinite-loading :on-infinite="_onInfinite" spinner="waveDots">
            <span slot="no-results" style="color:#4bb7aa;">
                <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                <p style="font-size:1rem;display:inline-block;">还没拍题记录~</p>
            </span>
            <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已加载全部记录</span>
        </infinite-loading>


    </div>

    
  </view-box>
  <!--照片墙-->
  <previewer :list="imgList" v-ref:previewer></previewer>
  <!--切换科目-->
  <gnb-change-sub :visible.sync="visible" :subject="userSubjectList" :selected="cameraHistorySubjectId" @on-click-back="_changeSubject"></gnb-change-sub>
  <!--删除确认框-->
  <confirm :show.sync="clearShow" confirm-text="是" cancel-text="否" title="确定移除此题么?" @on-confirm="_delelte()"></confirm>
</template>
<script>
import {XHeader,Panel,ViewBox,FlexboxItem,Flexbox,Previewer,Confirm} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import gnbChangeSub from '../../components/changesub/index.vue'
import store from '../../store'
import { token,userSubjectList } from '../../common/getters'
import { collectRemove,collectAdd} from '../../common/actions'
import { cameraHistoryIds,cameraHistoryList,cameraHistoryTotalPage,cameraHistoryCurrentPage,cameraHistorySubjectId } from '../getters'
import { getCameraHistoryIds,getCameraHistoryList,delCameraHistroy,setSubject } from '../actions/history'
import * as _ from '../../config/whole'

export default {
  components: {
    XHeader,Panel,ViewBox,FlexboxItem,Flexbox,Previewer,Confirm,InfiniteLoading,gnbChangeSub
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
          token,userSubjectList,
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
        this.setSubject(item.id);       //更换科目
        this.$nextTick(() => {
            this.$broadcast('$InfiniteLoading:reset');
        });
    },
    /** 移除显示提示窗口*/
    _remove(id,index) {
      this.clearShow = true;
      this.delPic.index = index;
      this.delPic.id = id;
    },
    /** 参考例题*/
    _record(cameraId,exampleId) {
      this.$router.go(`/camera/example/${cameraId}/${exampleId}`);
    },
    /** 灯箱*/
    _show(index) {
      this.imgList[0].src = this.cameraHistoryList[index].pic;
      this.imgList[0].w = this.cameraHistoryList[index].width;
      this.imgList[0].h = this.cameraHistoryList[index].height;
      this.$refs.previewer.show();
    },
    _onInfinite(){
        if(this._isFirst()){return;}
        this.getCameraHistoryIds({
            currentPage:this.cameraHistoryCurrentPage,
            token:this.token,
            options:{
                subject_id:this.cameraHistorySubjectId
            }
        })
    },
    _isFirst(){
        /*判断当前页面是否大于总页数 若大于则不在请求数据*/
        if(Number(this.cameraHistoryTotalPage) < Number(this.cameraHistoryCurrentPage)){
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
            return true;
        }
        return false;
    },
    /**删除记录 */
    _delelte(){
       this.delCameraHistroy({
          token:this.token,
          options:{
              id:this.delPic.id,
              subject_id:this.cameraHistorySubjectId
          }
      });
    }
  },
  data() {
    return {
      clearShow: false,
      visible:false,
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
  },
  watch: {
    cameraHistoryIds() {
      let params = {
        options: {
          ids: this.cameraHistoryIds,
          subject_id: this.cameraHistorySubjectId
        },
        token: this.token
      };
      this.getCameraHistoryList(params,()=>{
          setTimeout(()=>{
            this.$broadcast('$InfiniteLoading:loaded');
            if(this.cameraHistoryCurrentPage  > this.cameraHistoryTotalPage){
                this.$broadcast('$InfiniteLoading:complete');
                return;
            }
          },300);
      })
    }
  }
}
</script>
