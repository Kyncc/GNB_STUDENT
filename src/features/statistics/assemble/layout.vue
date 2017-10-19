<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="50px">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <tabbar slot="bottom" class="homepage" style="z-index:2;">
        <tabbar-item :selected="$route.name === 'statisticsRemember'"
          @click.native="this.$router.replace({name: 'statisticsRemember', params: {chapterId: $route.params.chapterId, suject: $route.params.suject}})">
          <i slot="icon" :class="'icon iconfont icon-jinrulianxi '+($route.name  === 'statisticsRemember' ? 'icon-active' : '')"></i>
          <span slot="label">记错题</span>
        </tabbar-item>
        <tabbar-item :selected="$route.name === 'statisticsCamera'"
          @click.native="this.$router.replace({name: 'statisticsCamera', params: {chapterId: $route.params.chapterId, suject: $route.params.suject}})">
          <i slot="icon" :class="'icon iconfont icon-camera '+($route.name  === 'statisticsCamera' ? 'icon-active' : '')"></i>
          <span slot="label">拍错题</span>
        </tabbar-item>
        <tabbar-item :selected="$route.name  === 'statisticsGood'"
          @click.native="this.$router.replace({name: 'statisticsGood', params: {chapterId: $route.params.chapterId, suject: $route.params.suject}})">
          <i slot="icon" :class="'icon iconfont icon-bag '+($route.name  === 'statisticsGood' ? 'icon-active' : '')"></i>
          <span slot="label">精选练习</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import {Tabbar, TabbarItem, ViewBox} from 'vux'
import modules from './modules/store'
import store from '@/store'

export default {
  name: 'assemble',
  components: {
    Tabbar, TabbarItem, ViewBox
  },
  beforeCreate () {
    store.registerModule('assemble', {
      ...modules
    })
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
   .icon-active {
     color:#4cc0be;
   }
}
</style>
