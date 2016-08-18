<template>
  <div class='user'>
      <x-header :left-options="{showBack: false}">个人中心<a slot="right">退出</a></x-header>
      <div class="info">

      </div>
      <group>
          <cell title="个人资料" link="user/info">
              <span class="demo-icon" slot="icon"></span>
          </cell>
          <cell title="我的教材" link="user/textBook">
              <span class="demo-icon" slot="icon"></span>
          </cell>
           <cell title="我的班级" link="user/class">
              <span class="demo-icon" slot="icon"></span>
          </cell>
           <cell title="我的会员" link="user/calendar">
              <span class="demo-icon" slot="icon"></span>
          </cell>
           <cell title="邀请好友" link="user/invite">
              <span class="demo-icon" slot="icon"></span>
          </cell>
           <cell title="设置" link="user/settings">
              <span class="demo-icon" slot="icon"></span>
          </cell>
           <cell title="修改密码" link="user/resetPwd">
              <span class="demo-icon" slot="icon"></span>
          </cell>
      </group>
  </div>
  


</template>

<script>
import {XHeader,Cell,Group} from 'vux'
export default {
  components: {
    XHeader,Cell,Group
  }
}
</script>


<style lang="less">
  @import '~vux/dist/vux.css';
  .user{
    .vux-header{
      background-color:#4bb7aa;
      a{color:#fff;}
    }
    .vux-header .vux-header-left, .vux-header .vux-header-right{font-size:16px;}
    .info{
      font-size:inherit;
      height:365/40em;
      width:100%;
      text-align:center;
    }
  }
</style>