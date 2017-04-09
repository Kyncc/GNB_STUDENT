<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="50px">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <tabbar slot="bottom" class="homepage" v-model="select">
        <tabbar-item link="/" >
          <i slot="icon" class="icon iconfont icon-home"></i>
          <span slot="label">主页</span>
        </tabbar-item>
        <tabbar-item link="bag">
          <i slot="icon" class="icon iconfont icon-bag"></i>
          <span slot="label">书包</span>
        </tabbar-item>
        <tabbar-item link="user">
          <i slot="icon" class="icon iconfont icon-user"></i>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import {Tabbar, TabbarItem, ViewBox} from 'vux'
import {mapActions, mapGetters} from 'vuex'
import './index.less'

export default {
  name: 'router',
  components: {
    Tabbar, TabbarItem, ViewBox
  },
  methods: {
    ...mapActions([''])
  },
  // created () {
  //   this.getUserInfo()
  //   .then(() => {
      // this.User.textbook.physics.length == 0
      // if(this.User.textbook.math[0].id == '0' ){
      //   this.$router.go('/main/bag/textbook/add?type=new');
      // }
  //   })
    // .catch((error) => {
    //   if (window.plus) {
    //     setTimeout(() => {
    //       plus.navigator.closeSplashscreen() // 关闭等待
    //     }, 500)
    //   }
    // })
  // },
  computed: {
    ...mapGetters(['Path']),
    select () {
      if (this.Path === '/') {
        return 0
      } else if (this.Path === '/bag') {
        return 1
      } else if (this.Path === '/user') {
        return 2
      }
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
}
</style>
