<template>
  <div style="height:100%;" >
       <router-view keep-alive></router-view>
       <tabbar slot="bottom" class="homepage">
          <tabbar-item link="index" :selected="indexState">
            <i slot="icon" class="icon iconfont icon-brush"></i>
            <span slot="label">刷题</span>
          </tabbar-item>
          <tabbar-item link="bag" :selected="bagState">
            <i slot="icon" class="icon iconfont icon-bag"></i>
            <span slot="label">书包</span>
          </tabbar-item>
          <tabbar-item link="interact" :selected="interactState">
            <i slot="icon" class="icon iconfont icon-comment2"></i>
            <span slot="label">互动</span>
          </tabbar-item>
          <tabbar-item link="user" :selected="userState">
            <i slot="icon" class="icon iconfont icon-user"></i>
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
          interactState: (store.state.route.path.indexOf('interact') != -1 ? true:false),
          userState: (store.state.route.path.indexOf('user') != -1 ? true:false),
          bagState: (store.state.route.path.indexOf('bag') != -1 ? true:false)
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
   .iconfont{font-size:23px;color:#999;}
   .weui_tabbar_label{font-size:14px;margin-top:2px;}
}
</style>