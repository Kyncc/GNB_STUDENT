<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="50px">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <tabbar slot="bottom" class="homepage" style="z-index:2;">
        <tabbar-item link="index" :selected="Path === '/index'">
          <i slot="icon" :class="'icon iconfont '+(Path === '/index' ? 'icon-home1' : 'icon-home2')"></i>
          <span slot="label">主页</span>
        </tabbar-item>
        <!-- <tabbar-item link="bag" :show-dot="News.classes">
          <i slot="icon" :class="'icon iconfont '+(select === 1 ? 'icon-bag1' : 'icon-bag2')"></i>
          <span slot="label">书包</span>
        </tabbar-item> -->
        <tabbar-item link="user" :show-dot="News.correct || News.system" :selected="Path === '/user'">
          <i slot="icon" :class="'icon iconfont '+(Path === '/user' ? 'icon-user1' : 'icon-user2')"></i>
          <span slot="label" style=''>我的</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import {Tabbar, TabbarItem, ViewBox} from 'vux'
import {mapGetters} from 'vuex'
import './index.less'

export default {
  name: 'router',
  components: {
    Tabbar, TabbarItem, ViewBox
  },
  computed: {
    ...mapGetters(['Path', 'News'])
  }
}
</script>

<style lang="less" scoped>
.homepage{
   .weui_tabbar_label{font-size:14px;margin-top:2px;}
   .weui-tabbar__icon .iconfont{
    position: relative;
    left: 1px;
    top: -2px;
   }
   .icon-bag1 {
     color:#4cc0be;
   }
   .icon-user1 {
     color:#4cc0be;
   }
  .icon-home1 {
     color:#4cc0be;
   }
}
</style>
