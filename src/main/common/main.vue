<template>
  <div style="height:100%;" class="homepage">
     <view-box v-ref:view-box>
       <div>
          <router-view></router-view>
       </div>
       <tabbar slot="bottom">
          <tabbar-item link="index" :selected="indexState">
            <i slot="icon" class="icon iconfont icon-home"></i>
            <span slot="label">主页</span>
          </tabbar-item>
          <tabbar-item link="message" :selected="messageState">
            <i slot="icon" class="icon iconfont icon-xiaoxi"></i>
            <span slot="label">互动</span>
          </tabbar-item>
          <tabbar-item link="user" :selected="userState">
               <i slot="icon" class="icon iconfont icon-31wode"></i>
            <span slot="label">我的</span>
          </tabbar-item>
        </tabbar>
      </view-box>
  </div>
</template>
<script>
import { Tabbar, TabbarItem,ViewBox } from 'vux'
import store from '../../store' 

export default {
  components: {
    Tabbar,
    TabbarItem,
    ViewBox
  },
  data(){
     return{
          indexState: (store.state.route.path.indexOf('index') != -1 ? true:false),
          messageState: (store.state.route.path.indexOf('message') != -1 ? true:false),
          userState: (store.state.route.path.indexOf('user') != -1 ? true:false)
      }
  }
}

</script>

<style lang="less">
.homepage{
   .weui_bar_item_on{
     .iconfont{color:#4bb7aa}
     .weui_tabbar_label{color:#4bb7aa}
   }
   .weui_tabbar_item {padding:3px 0 0;}
   .iconfont{font-size:28px;color:#999;position:relative;top:-7px;left:-3px;}
   .weui_tabbar_label{font-size:14px;margin-top:2px;}
}
</style>