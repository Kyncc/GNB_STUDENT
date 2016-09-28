<template>
<view-box v-ref:view-box class="collect">

  <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
    <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">错题归纳</x-header>
    <flexbox style="padding:10px 0;background:#edf2f1;" class="vux-center">
      <flexbox-item :span="3/4">
        <button-tab>
          <button-tab-item v-touch:tap="_time('week')" selected>一周内</button-tab-item>
          <button-tab-item v-touch:tap="_time('month')">一月内</button-tab-item>
          <button-tab-item v-touch:tap="_time('all')">全部</button-tab-item>
        </button-tab>
      </flexbox-item>
    </flexbox>
  </div>
  <div style="padding-top:98px;">
    <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in list">
      <div class="weui_panel_hd">
        <x-button type='primary' mini>参考例题</x-button>
        {{{item.knowledge}}}
      </div>
      <div class="weui_panel_bd">
        <a class="weui_media_box weui_media_appmsg" href="#!/error/detail/{{item.id}}">
          <div class="weui_media_bd">
            <p class="weui_media_desc">
              {{{item.content}}}
            </p>
          </div>
        </a>
        <div class="weui_panel_ft">
          <flexbox :gutter="0" wrap="wrap">
            <flexbox-item :span="1/2">难度：{{item.difficult}}</flexbox-item>
            <flexbox-item :span="1/4"></flexbox-item>
            <flexbox-item :span="1/4" style="text-align:right"> 错误{{item.errorCount}}次</flexbox-item>
          </flexbox>
        </div>
      </div>
    </div>
    <infinite-loading :on-infinite="onInfinite" spinner="waveDots">
      <span slot="no-more" style="color:#4bb7aa;">
            <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
            <p style="font-size:1rem;display:inline-block;">没有更多数据了</p>
        </span>
    </infinite-loading>
  </div>

</view-box>
</template>

<script>
import {XHeader, Panel,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem,Scroller,Spinner} from 'vux'
import InfiniteLoading from 'vue-infinite-loading';
import store from '../../store'
import {period_id,subject_id,token} from '../../common/getters'
import {
  errorIndexIds,
  errorIndexList,
  errorIndexTotalPage
} from '../getters'
import {
  getErrorIds,
  getErrorList
} from '../actions'
import moment from 'moment'

export default {
  components: {
    XHeader, Panel,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem,Scroller,Spinner,InfiniteLoading
  },
  data() {
    return {
      currentPage: 1,
      list: [],
      startTime: moment().unix(),
      endTime: moment().add(-7, 'd').unix(),
    }
  },
  methods: {
    _time(value) {
      if (value == 'week') {
        this.startTime = moment().unix();
        this.endTime = moment().add(-7, 'd').unix();
      } else if (value == 'month') {
        this.startTime = moment().unix();
        this.endTime = moment().add(-1, 'M').unix();
      } else {
        this.startTime = moment().unix();
        this.endTime = moment().add(-3, 'M').unix();
      }
    },
    _back() {
      this.$router.go('/main');
    },
    onInfinite() {
      let that = this;
      //根据索引获取题目
      this.getErrorIds({
        currentPage:that.currentPage,
        between:{
            start:'',
            end:''
        },
        token: that.token,
        options: {
          period_id: that.period_id,
          subject_id: that.subject_id
        }
      },() => {
          setTimeout(()=>{
              that.$broadcast('$InfiniteLoading:loaded');
              if(that.totalPage <= that.currentPage){
                  this.$broadcast('$InfiniteLoading:complete');
                  return;
              }
              this.currentPage ++;
          },2000);
      })
    }
  },
  computed: {
    totalPage() {
      return this.errorIndexTotalPage;
    }
  },
  watch: {
    errorIndexIds() {
      let params = {
        options: {
          ids: this.errorIndexIds,
          period_id: this.period_id,
          subject_id: this.subject_id
        },
        token: this.token
      };
      this.getErrorList(params)
    },
    errorIndexList() {
      this.list = this.list.concat(this.errorIndexList);
    }
  },
  vuex: {
    getters: {
      period_id,subject_id,token,errorIndexIds,errorIndexList,errorIndexTotalPage
    },
    actions: {getErrorIds,getErrorList}
  },
  store
}
</script>