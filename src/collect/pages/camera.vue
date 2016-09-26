<template>
<view-box v-ref:view-box class="collect">

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
  <div style="padding-top:98px;">
    <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in list">
      <div class="weui_panel_hd">
        <x-button type='primary' mini>收藏题</x-button>
        {{{item.knowledge}}}
      </div>
      <div class="weui_panel_bd">
        <a class="weui_media_box weui_media_appmsg" href="#!/collect/example/detail/{{item.id}}">
          <div class="weui_media_bd">
            <p class="weui_media_desc">
              {{{item.content}}}
            </p>
          </div>
        </a>
        <div class="weui_panel_ft">
          <flexbox :gutter="0" wrap="wrap">
            <flexbox-item :span="1/2">收藏时间：{{item.collectTime | ymd}}</flexbox-item>
            <flexbox-item :span="1/4"></flexbox-item>
            <flexbox-item :span="1/4" style="text-align:right;" v-touch:tap="_remove($key)">
              <span style="color:green"><i class="icon iconfont icon-clear"></i>移除</span>
            </flexbox-item>
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
<confirm :show.sync="show" confirm-text="是" cancel-text="否" title="确定将此题移除收藏么?" @on-confirm="_onAction().bind(this)"></confirm>
</template>

<script>
import {
  XHeader,
  Panel,
  Flexbox,
  FlexboxItem,
  XButton,
  ViewBox,
  ButtonTab,
  ButtonTabItem,
  Confirm
} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import store from '../../store'
import {
  period_id,
  subject_id,
  token
} from '../../common/getters'
import {
  CollectCameraIds,
  CollectCameraList,
  CollectCameraTotalPage
} from '../getters'
import {
  getCollectCameraIds,
  getCollectCameraList
} from '../actions'

export default {
  components: {
    XHeader,
    XButton,
    Panel,
    Flexbox,
    FlexboxItem,
    ViewBox,
    ButtonTab,
    ButtonTabItem,
    Confirm,
    InfiniteLoading
  },
  methods: {
    _example() {
      this.$router.go(`/collect/example`);
    },
    _remove(key) {
      this.removeId = key;
      this.show = true
    },
    _onAction() {
      alert(this.removeId);
    },
    _back() {
      this.$router.go('/main');
    },
    onInfinite() {
      let that = this;
      //根据索引获取题目
      if (this.totalPage < this.currentPage) {
        this.$broadcast('$InfiniteLoading:complete');
        return;
      }

      this.getCollectCameraIds({
        currentPage: that.currentPage,
        token: that.token,
        options: {
          period_id: that.period_id,
          subject_id: that.subject_id
        }
      }, () => {
        setTimeout(() => {
          that.$broadcast('$InfiniteLoading:loaded');
        }, 1000);
      })
      this.currentPage++;

    }
  },
  vuex: {
    getters: {
      period_id,
      subject_id,
      token,
      CollectCameraIds,
      CollectCameraList,
      CollectCameraTotalPage
    },
    actions: {
      getCollectCameraIds,
      getCollectCameraList
    }
  },
  store,
  data() {
    return {
      show: false,
      currentPage: 1,
      list: [],
      removeId: ''
    }
  },
  computed: {
    totalPage() {
      return this.CollectCameraTotalPage;
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
  },
  ready() {
    let params = {
      currentPage: 1,
      token: this.token,
      options: {
        period_id: this.period_id,
        subject_id: this.subject_id
      }
    };
    let that = this;

    //根据索引获取题目
    this.getCollectCameraIds(
      params, (ret) => {
        let params = {
          options: {
            ids: ret.ids,
            period_id: that.period_id,
            subject_id: that.subject_id
          }
        };
        that.getCollectCameraList(params);
      }
    );
  }
}
</script>
