<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="50px">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <tabbar slot="bottom" class="homepage" v-model="select" style="z-index:2;">
        <tabbar-item link="index" >
          <i slot="icon" class="icon iconfont icon-home"></i>
          <span slot="label">主页</span>
        </tabbar-item>
        <tabbar-item link="bag" :show-dot="News.classes">
          <i slot="icon" class="icon iconfont icon-bag"></i>
          <span slot="label">书包</span>
        </tabbar-item>
        <tabbar-item link="user" :show-dot="News.correct || News.system">
          <i slot="icon" class="icon iconfont icon-user"></i>
          <span slot="label">我的</span>
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
    ...mapGetters(['Path', 'News']),
    select () {
      switch (this.Path) {
        case '/index' : return 0
        case '/bag' : return 1
        case '/user' : return 2
      }
    }
  },
  activated () {
    if (this.Path === '/index') this.select = 0
    else if (this.Path === '/bag') this.select = 1
    else this.select = 2
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
}
</style>
