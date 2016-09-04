<template>
  <div style="height:100%;">
     <view-box v-ref:view-box>
       <div>
          <router-view></router-view>
       </div>
        <tabbar slot="bottom">
          <tabbar-item link="index">
            <img slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_button.png"/>
            <span slot="label">主页</span>
          </tabbar-item>
          <tabbar-item link="message" >
            <img slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_msg.png"/>
            <span slot="label">消息</span>
          </tabbar-item>
          <tabbar-item link="user" >
              <img slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_article.png"/>
            <span slot="label">个人中心</span>
          </tabbar-item>
        </tabbar>
      </view-box>
  </div>
</template>
<script>
import { Tabbar, TabbarItem,ViewBox } from 'vux'
export default {
  components: {
    Tabbar,
    TabbarItem,
    ViewBox
  }
}
</script>
<style>
.weui_tabbar_icon+.weui_tabbar_label{margin-top:0;}
.weui_tabbar_label{color:#8a8a8a;}
.weui_tabbar_item.weui_bar_item_on .weui_tabbar_label{color:#4bb7aa}
.weui_tabbar{position:fixed;}
</style>