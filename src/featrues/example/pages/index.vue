<template>
  <view-box v-ref:view-box class="breakExample">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
      <x-header :left-options="{showBack:true}">例题详情</x-header>
    </div>

    <div style="padding-top:46px;" >
      <!--内容-->
      <div v-for="detail in Example">
        <div class="weui_panel weui_panel_access exerciseDetail" >
          <div class="weui_panel_hd">
            <p style="width:25%;color:#4bb7aa">题干</p>
            <p style="width:75%;text-align:right" @click="_correct"> 
              <span style="color:#666"><i class="icon iconfont icon-error-login"></i>纠错</span>
            </p>
          </div>
          <!--题目整体-->
          <div class="weui_panel_bd">
            <!--题目-->
            <div class="weui_media_bd weui_media_box">
              <p class="weui_media_desc">
                {{{ detail.content }}}
              </p>
            </div>
            <!--选项-->
            <template v-if=" detail.type == 1 ? true:false">
              <div class="weui_media_bd weui_media_box options">
                <p class="weui_media_desc" v-for="value in detail.tabs">
                  {{ $key }} : {{{ value }}}
                </p>
              </div>
            </template> 
          </div>
        </div>
        <!--解析-->
        <div class="weui_panel weui_panel_access exerciseDetail">
          <div class="weui_panel_hd">
            <div style="color:#4bb7aa;width:25%">解析</div>
          </div>
          <!--解析主体-->
          <div class="weui_panel_bd">
            <div class="weui_media_bd weui_media_box">
              <p class="weui_media_desc">
                {{{ detail.answer }}}
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

</template>

<script>
import {XHeader,Flexbox,FlexboxItem,XButton,Confirm,ViewBox} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions,mapGetters  } from 'vuex'

export default {
  components: {
    XHeader,Flexbox,FlexboxItem,XButton,Confirm,ViewBox,InfiniteLoading
  },
  route: {
    data:function(transition){
      this.exampleClear();
      this.$nextTick(() => {
        this.$broadcast('$InfiniteLoading:reset');
      });
    }
  },
  methods: {
    ...mapActions(['getExample','exampleClear']),
    _onInfinite(){
      this.getExample()
      .then(()=>{
          this.$broadcast('$InfiniteLoading:loaded');
          this.$broadcast('$InfiniteLoading:complete');
        }
      )
      .catch((error)=>{
         this.$broadcast('$InfiniteLoading:complete');
      })
    },
    _correct(){
      this.$router.go(`/correct/${this.Params.subjectId}/${this.Params.id}`);
    }
  },
	computed:{
    ...mapGetters(['Example','Params'])
	}
}
</script>
