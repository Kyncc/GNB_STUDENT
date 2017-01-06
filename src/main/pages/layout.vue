<template>
  <router-view keep-alive></router-view>
  <tabbar slot="bottom" class="homepage" v-show="isRoot">
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
</template>
<script>
import { Tabbar, TabbarItem,ViewBox } from 'vux'
import { path,token,userMobile } from '../../common/getters'
import { getUserInfo } from '../actions'

export default {
  components: {
    Tabbar,TabbarItem, ViewBox
  },
  vuex: {
    getters:{path,token,userMobile},
    actions:{getUserInfo}
  },
  data(){
     return{
          isRoot:true,
          indexState:(this.path.indexOf('index') >= 0 ? true : false),
          interactState:(this.path.indexOf('interact') >= 0 ? true : false),
          userState:(this.path.indexOf('user') >= 0 ? true : false),
          bagState:(this.path.indexOf('bag') >= 0 ? true : false)
      }
  },
  created(){
      ( this.userMobile.length ==0 ? this.getUserInfo({token: this.token}) : '' )
  },
  watch:{
    path(){
      //判断是否在首页显示下面标签
      this.indexState = this.interactState = this.userState = this.bagState = this.isRoot = false;

      if(this.path == '/index'){
          this.isRoot = this.indexState = true;
      }else if(this.path == '/interact'){
          this.isRoot = this.interactState = true;
      }else if(this.path == '/user'){
          this.isRoot = this.userState = true;
      }else if(this.path == '/bag'){
          this.isRoot = this.bagState = true;
      }
    }
  }
}

</script>

<style lang="less" >
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