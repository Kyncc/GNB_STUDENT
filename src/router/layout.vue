<template>
  <router-view keep-alive></router-view>
  <tabbar slot="bottom" class="homepage" v-show="isRoot">
    <tabbar-item link="index" :selected="indexState">
      <i slot="icon" class="icon iconfont icon-home"></i>
      <span slot="label">主页</span>
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
import { mapActions,mapGetters} from 'vuex'

export default {
  components: {
    Tabbar,TabbarItem, ViewBox
  },
  methods: {
    ...mapActions(['getUserInfo'])
  },
  created(){
    this.getUserInfo();
  },
  computed:{
     ...mapGetters(['path']),
     isRoot(){
       return (this.indexState || this.bagState || this.userState || this.interactState? true : false);
     },
     indexState(){
       return (this.path == '/main/index' ? true : false);
     },
     bagState(){
       return (this.path == '/main/bag' ? true : false);
     },
     userState(){
       return (this.path == '/main/user' ? true : false);
     },
     interactState(){
       return (this.path == '/main/interact' ? true : false);
     }
  }
}

</script>

<style lang="less" scoped>
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