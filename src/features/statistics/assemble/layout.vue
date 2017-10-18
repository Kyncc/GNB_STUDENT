<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="50px">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <tabbar slot="bottom" class="homepage" style="z-index:2;">
        <tabbar-item :selected="router.name === 'statisticsRemember'"
          :link="{name: 'statisticsRemember', params: {chapterId: router.params.chapterId, suject: router.params.suject}}">
          <i slot="icon" :class="'icon iconfont '+(router.name  === 'statisticsRemember' ? 'icon-jinrulianxi' : 'icon-jinrulianxi1')"></i>
          <span slot="label">记错题</span>
        </tabbar-item>
        <tabbar-item :selected="router.name === 'statisticsCamera'"
          :link="{name: 'statisticsCamera', params: {chapterId: router.params.chapterId, suject: router.params.suject}}">
          <i slot="icon" :class="'icon iconfont '+(router.name  === 'statisticsCamera' ? 'icon-camera' : 'icon-camera1')"></i>
          <span slot="label">拍错题</span>
        </tabbar-item>
        <tabbar-item :selected="router.name  === 'statisticsGood'"
          :link="{name: 'statisticsGood', params: {chapterId: router.params.chapterId, suject: router.params.suject}}">
          <i slot="icon" :class="'icon iconfont '+(router.name  === 'statisticsGood' ? 'icon-bag' : 'icon-bag1')"></i>
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
  name: 'router',
  components: {
    Tabbar, TabbarItem, ViewBox
  },
  computed: {
    router () {
      return this.$store.getters.Route
    }
  },
  beforeCreate () {
    store.registerModule(['statistics', 'assemble'], {
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
