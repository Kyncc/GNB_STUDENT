<template>
  <view-box v-ref:view-box class="collectDetail">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
      <x-header :left-options="{showBack:true}">我的收藏</x-header>
    </div>

    <div style="padding-top:46px;">
      <!--内容-->
      <div v-for="detail in list">
        <div class="weui_panel weui_panel_access exerciseDetail" >
          <div class="weui_panel_hd">
            <flexbox :gutter="0" wrap="wrap">
              <p style="width:25%;color:#4bb7aa">题干</p>
              <p style="width:50%;text-align:right;" v-touch:tap="_remove">
                <span style="color:#666"><i class="icon iconfont icon-clear"></i>取消</span>
              </p>
              <p style="width:25%;text-align:right" v-touch:tap="_correct"> 
                <span style="color:#666"><i class="icon iconfont icon-error-login"></i>纠错</span>
              </p>
            </flexbox>
          </div>
          <!--题目整体-->
          <div class="weui_panel_bd">
            <!--题目-->
            <div class="weui_media_bd weui_media_box">
              <p class="weui_media_desc">
                {{{* detail.content }}}
              </p>
            </div>
            <!--选项-->
            <template v-if=" detail.type == 1 ? true:false">
              <div class="weui_media_bd weui_media_box options">
                <p class="weui_media_desc" v-for="value in detail.tabs">
                  {{ $key }} : {{{* value }}}
                </p>
              </div>
            </template> 

          </div>
        </div>
        <!--解析-->
        <div class="weui_panel weui_panel_access exerciseDetail">
          <div class="weui_panel_hd">
            <flexbox :gutter="0" wrap="wrap">
              <flexbox-item :span="2/5" style="color:#4bb7aa">解析</flexbox-item>
            </flexbox>
          </div>
          <!--解析主体-->
          <div class="weui_panel_bd">
            <div class="weui_media_bd weui_media_box ">
              <p class="weui_media_desc">
                {{{* detail.answer }}}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <infinite-loading :on-infinite="_onInfinite" spinner="default">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">服务器发生一点小问题~</p>
        </span>
        <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
      </infinite-loading>

    </div>
  </view-box>
  <confirm :show.sync="show" confirm-text="是" cancel-text="否" title="确定将此题移除收藏么?" @on-confirm="_onAction()"></confirm>
</template>

<script>
import {XHeader,Flexbox,FlexboxItem,XButton,Confirm,ViewBox} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { collectRemove } from '../../../common/actions'
import { token,id } from '../../../common/getters'
import { getCollectExampleDetail,clearCollect } from '../actions'
import { CollectExampleDetail,CollectSubjectId } from '../getters'

export default {
  components: {
    XHeader,Flexbox,FlexboxItem,XButton,Confirm,ViewBox,InfiniteLoading
  },
  vuex: {
        getters: {
            CollectExampleDetail,CollectSubjectId,token,id
        },
        actions: {
            collectRemove,getCollectExampleDetail,clearCollect
        }
    },
  methods: {
    _onInfinite(){
      let self = this;
      this.getCollectExampleDetail({
        options:{
          ids:[this.id],
          subject_id:this.CollectSubjectId
        },
        token:this.token
      },()=>{
          this.list = this.CollectExampleDetail;
          if(this.list.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
          this.$broadcast('$InfiniteLoading:complete');
        }
      )
    },
    _remove(){
      this.show = true
    },
    _correct(){
      this.$router.go(`/correct/${this.CollectSubjectId}/${this.id}`);
    },
    _removeCollect(){
      this.collectRemove({
        options:{
          id:this.id,
          subject_id:this.CollectSubjectId
        },
        token:this.token,
        type:'example'
      },()=>{
        setTimeout(()=>{
          this.clearCollect();
          history.back();
        },1000);
      });
    },
    _onAction(){
      this._removeCollect();
    }
  },
  data(){
    return{
      show: false,
      list:[],
    }
  },
  watch:{
    id(){
      this.list = [];
      this.$nextTick(() => {
        this.$broadcast('$InfiniteLoading:reset');
      });
    }
  }
}
</script>
