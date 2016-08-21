<template>
  <div class='user'>
      <x-header :left-options="{showBack: false}">个人中心<a slot="right">退出</a></x-header>
      <div class="info">

      </div>
      <group>
          <cell title="个人资料" link="../user/info/">
              <span class="icon icon-info" slot="icon"></span>
          </cell>
          <cell title="我的教材" link="../user/textBook/">
              <span class="icon icon-textbook" slot="icon"></span>
          </cell>
           <cell title="我的班级" link="../user/class/">
              <span class="icon icon-class" slot="icon"></span>
          </cell>
           <cell title="我的会员" link="../user/calendar/">
              <span class="icon icon-member" slot="icon"></span>
          </cell>
           <cell title="邀请好友" link="../user/invite/">
              <span class="icon icon-invite" slot="icon"></span>
          </cell>
           <cell title="设置" link="../user/settings/">
              <span class="icon icon-settings" slot="icon"></span>
          </cell>
           <cell title="修改密码" link="../user/resetPwd/">
              <span class="icon icon-resetPwd" slot="icon"></span>
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
    .icon{width:26px;height:24px;display: block;background-size: 100%;background-repeat:no-repeat;margin-right:17px;}
    .icon-info{background-image:url('../../assets/user/info.png');}
    .icon-textbook{background-image:url('../../assets/user/textbook.png');}
    .icon-class{background-image:url('../../assets/user/class.png');}
    .icon-member{background-image:url('../../assets/user/member.png');}
    .icon-invite{background-image:url('../../assets/user/invite.png');}
    .icon-settings{background-image:url('../../assets/user/settings.png');}
    .icon-resetPwd{background-image:url('../../assets/user/resetPwd.png');}
  }
</style>