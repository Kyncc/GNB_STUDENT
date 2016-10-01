<template>
    <view-box v-ref:view-box class="cameraHistory">
      <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
        <x-header :left-options="{showBack: true}">拍题记录</x-header>
      </div>
      <div style="margin-top:46px;" class="main">
        <flexbox class="list" v-for="item in list">
          <flexbox-item :span="2/5">
            <img class="previewer-demo-img" :src="item.src" @click="_show(item.src,$index)">
          </flexbox-item>
          <flexbox-item :span="3/5" style="position:relative">
            <div v-touch:tap="_record(item.knowledgeId)">
                <div class="title">{{{item.knowledge}}}</div>
                  <div class="difficult">
                    难度：
                    <template v-for="1 in item.difficult">
                          <i class="icon iconfont icon-collect"></i>
                    </template>
                  </div>
                  <div class="time">{{{item.cameraTime | ymd}}} </div>
              </div>
              <i class="icon iconfont icon-clear"  v-touch:tap="_remove(item.id)"></i>
            </flexbox-item>
          <flexbox>
      </div>
      
      <infinite-loading :on-infinite="_onInfinite" spinner="default">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">服务器出差了~</p>
        </span>
        <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已经到底拉~</span>
      </infinite-loading>

    </view-box>
    <!--<previewer :list="imgList" v-ref:previewer :options="options"></previewer>-->
    <confirm :show.sync="clearShow" confirm-text="是" cancel-text="否" title="确定移除此题么?" @on-confirm="_onAction('是')" @on-cancel="_onAction('否')"></confirm>
   
  </div>
</template>

<script>
import {XHeader,Panel,ViewBox,FlexboxItem,Flexbox,Previewer,Confirm} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import store from '../../store'
import { period_id,subject_id,token } from '../../common/getters'
import { cameraHistoryIds,cameraHistoryList,cameraHistoryTotalPage } from '../getters'
import { getCameraHistoryIds,getCameraHistoryList } from '../actions'

const DATA = {
  "code": 1,
  "data": [{
    "collectTime": "1473682257",
    "difficult": 3,
    "knowledge": "2.5 函数零点判定原理 ",
    "knowledgeId": 31,
    "cameraTime": "1473682257",
    "id": 1,
    "src": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3830827124,2277766622&fm=80",
    "width": 1400,
    "height": 1200
  }, {
    "collectTime": "1473682257",
    "difficult": 3,
    "knowledge": "2.5 函数零点判定原理 ",
    "knowledgeId": 12,
    "cameraTime": "1473682257",
    "id": 1,
    "src": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2116654715,901919733&fm=80",
    "width": 1400,
    "height": 1200
  }, {
    "collectTime": "1473682257",
    "difficult": 2,
    "knowledge": "2.5 函数零点判定原理 ",
    "knowledgeId": 12,
    "cameraTime": "1473682257",
    "id": 1,
    "src": "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2713790248,650364002&fm=80",
    "width": 1400,
    "height": 1200
  }],
  "msg": 1
}


export default {
  components: {
    XHeader,Panel,ViewBox,FlexboxItem,Flexbox,Previewer,Confirm,InfiniteLoading
  },
  vuex: {
      getters: {
          period_id,subject_id,token,cameraHistoryIds,cameraHistoryList,cameraHistoryTotalPage
      },
      actions: {
          getCameraHistoryIds,getCameraHistoryList
      }
  },
  store,
  methods: {
    _remove(id) {
      this.clearShow = true;
    },
    _record(id) {
      this.$router.go(`/camera/record/${id}`);
    },
    _show(src, index) {
      this.imgList[index].src = src
      this.$refs.previewer.show(index)
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
          setTimeout(()=>{
              this.$broadcast('$InfiniteLoading:loaded');
              if(this.cameraHistoryTotalPage <= this.currentPage){
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
      currentPage:1,
      list:[],
      clearShow: false,
      list: DATA.data,
      imgList: [],
      options: {
        getThumbBoundsFn(index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          }
        }
      }
    }
  },
  watch(){



  },
  ready() {
    // for (let i in this.list) {
    //   this.imgList.push({
    //     src: this.list[i].src,
    //     w: 600,
    //     h: 400
    //   })
    // }
  }
}
</script>
