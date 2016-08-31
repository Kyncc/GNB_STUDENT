<template>
  <div class='user'>
      <x-header :left-options="{showBack: false}">个人中心<a slot="right" v-touch:tap="_quit">退出</a></x-header>
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
           <cell title="我的会员" link="../user/member/">
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
      <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="确定退出当前登陆账号么" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>
  </div>



</template>

<script>
import {XHeader,Cell,Group,Confirm} from 'vux'
export default {
  components: {
    XHeader,Cell,Group,Confirm
  },
  methods: {
    onAction: function (type) {
      alert(type)
    },
    _quit(){
      this.show = true;
    }
  },
  data(){
    return {
      show: false
    }
  },
}
</script>


<style lang="less">
  .user{
    .vux-header{
      background-color:#4bb7aa;
      a{color:#fff;}
    }
    .info{
      font-size:inherit;
      height:365/40em;
      width:100%;
      text-align:center;
      background:url('../../assets/user/userBg.jpg') repeat;
    }
    .weui_cell{padding:10px 15px;}
    .weui_cells{margin-top:0;}
    .icon{width:30px;height:30px;display: block;background-size: 100%;background-repeat:no-repeat;margin-right:17px;background-position: center}
    .icon-info{background-image:url('../../assets/user/info.png');}
    .icon-textbook{background-image:url('../../assets/user/textbook.png');}
    .icon-class{background-image:url('../../assets/user/class.png');}
    .icon-member{background-image:url('../../assets/user/member.png');}
    .icon-invite{background-image:url('../../assets/user/invite.png');}
    .icon-settings{background-image:url('../../assets/user/settings.png');}
    .icon-resetPwd{background-image:url('../../assets/user/resetPwd.png');}
  }
</style>
