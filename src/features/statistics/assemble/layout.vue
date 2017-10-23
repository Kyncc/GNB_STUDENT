<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="50px">
      <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
        <x-header :left-options="{backText: this.$route.params.name}">
          <div slot="right" v-if="$route.name  === 'statisticsGood'">
            <i class="icon iconfont icon-filter" style="padding:10px;margin:0 -10px 0 0" @click="$router.push({name:'statisticsGood_options'})">
            </i>
          </div>
        </x-header>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <tabbar slot="bottom" class="homepage" style="z-index:2;">
        <tabbar-item :selected="$route.name === 'statisticsRemember'" @click.native="_toPage('statisticsRemember')">
          <i slot="icon" :class="'icon iconfont icon-jinrulianxi '+($route.name  === 'statisticsRemember' ? 'icon-active' : '')"></i>
          <span slot="label">记错题</span>
        </tabbar-item>
        <tabbar-item :selected="$route.name === 'statisticsCamera'" @click.native="_toPage('statisticsCamera')">
          <i slot="icon" :class="'icon iconfont icon-camera '+($route.name  === 'statisticsCamera' ? 'icon-active' : '')"></i>
          <span slot="label">拍错题</span>
        </tabbar-item>
        <tabbar-item :selected="$route.name  === 'statisticsGood'" @click.native="_toPage('statisticsGood')">
          <i slot="icon" :class="'icon iconfont icon-bag1 '+($route.name  === 'statisticsGood' ? 'icon-active' : '')"></i>
          <span slot="label">精选练习</span>
        </tabbar-item>
      </tabbar>
    </view-box>
    <!--组卷个数 -->
    <template v-if="$route.name  === 'statisticsRemember'">
      <div class='assembleCount'
        @click="$router.push({name: 'statisticsRemember_assemble', params: {subject: $route.params.subject}})">
        已选<br/>{{AssembleRemember.count}}
      </div>
    </template>
     <template v-else-if="$route.name  === 'statisticsCamera'">
      <div class='assembleCount'
        @click="$router.push({name: 'statisticsCamera_assemble', params: {subject: $route.params.subject}})">
        已选<br/>{{AssembleCamera.count}}
      </div>
    </template>
    <template v-else-if="$route.name  === 'statisticsGood'">
      <div class='assembleCount'
        @click="$router.push({name: 'statisticsGood_assemble', params: {subject: $route.params.subject}})">
        已选<br/>{{AssembleGood.count}}
      </div>
    </template>

  </div>
</template>

<script>
import {XHeader, Tabbar, TabbarItem, ViewBox} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'assemble',
  components: {
    XHeader, Tabbar, TabbarItem, ViewBox
  },
  computed: {
    ...mapGetters(['Route', 'AssembleCamera', 'AssembleGood', 'AssembleRemember'])
  },
  methods: {
    _toPage (name) {
      this.$router.replace({name: name, params: {name: this.Route.params.name, chapterId: this.Route.params.chapterId, subject: this.Route.params.subject}})
    }
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
.assembleCount{
  position: fixed;
  background:#4cc0be;
  color:#fff;
  font-size: .9rem;
  height: 3.5rem;
  width: 3.5rem;
  box-sizing: border-box;
  padding:.5rem .75rem;
  border-radius: 50%;
  bottom: 10%;
  right: 5%;
  box-shadow: 2px 2px 7px #4cc0be;
  text-align: center;
}
</style>
