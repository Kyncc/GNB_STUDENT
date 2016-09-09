import Vue from 'vue'
import Router from 'vue-router'
import VueTouch from 'vue-touch'
import { sync } from 'vuex-router-sync'
import App from './app'
import store from './store'
//登陆、注册
import Login from './login/pages/login'
import agreement from './login/pages/agreement'
import register from './login/pages/register'
import setPassword from './login/pages/setPassword'
import forget from './login/pages/forget'
import resetPassword from './login/pages/resetPassword'
//首页
import Main from './main/common/main'
import User from './main/pages/user'
import Message from './main/pages/message'
import Index from './main/pages/index'
//收藏本
import collect from './collect/pages/index'
import collectDetail from './collect/pages/detail'
//通知
import messageClass from './message/pages/class'
import messageCorrect from './message/pages/correct'
import messageHomework from './message/pages/homework'
import messageSystem from './message/pages/system'
import messageAdvice from './message/pages/advice'
//个人中心
import userResetPwd from './user/pages/resetPwd'
import userInfo from './user/pages/info'
//个人中心-设置
import userSettingsIndex from './user/pages/settings/index'
import userSettingsAboutUs from './user/pages/settings/aboutUs'
import userSettingsAdvice from './user/pages/settings/advice'
import userSettingsAdviceHistory from './user/pages/settings/adviceHistory'
//个人中心-邀请好友
import userInviteIndex from './user/pages/invite/index'
import userInviteFriend from './user/pages/invite/friend'
import userCodeInput from './user/pages/invite/input'
//我的会员
import userMemberIndex from './user/pages/member/index'
import userMemberVip from './user/pages/member/vip'
import userMemberPoints from './user/pages/member/points'
import userMemberRecharge from './user/pages/member/recharge'
//我的班级
import userClassIndex from './user/pages/class/index'
import userClassDetail from './user/pages/class/classDetail'
import userClassAdd from './user/pages/class/addClass'

Vue.use(Router)
Vue.use(VueTouch)
Vue.config.devtools = true

const router = new Router()
router.map({
  '/': { component: Login},
  'agreement':{component: agreement},
  //注册账户
  'register':{component: register},
  'register/password':{component: setPassword},
  //忘记密码
  'forget':{component: forget},
  'forget/password':{component: resetPassword},
  //主页
  'main/': {
    component: Main,
    subRoutes: {
      'user/': {
        component: User
      },
      'message/': {
        component: Message
      },
      'index/': {
        component: Index
      }
    }
  },
  //拍错题
  //归纳本
  //收藏本
  'collect':{component: collect},
  'collect/detail':{component: collectDetail},
  //消息
  'message/class':{component: messageClass},
  'message/homework':{component: messageHomework},
  'message/advice':{component: messageAdvice},
  'message/system':{component: messageSystem},
  'message/correct':{component: messageCorrect},
  //个人中心
  'user/resetPwd': {component: userResetPwd},
  'user/info': {component: userInfo},
  //设置
  'user/settings': {component: userSettingsIndex},
  'user/settings/aboutUs': {component: userSettingsAboutUs},
  'user/settings/advice': {component: userSettingsAdvice},
  'user/settings/advice/history': {component: userSettingsAdviceHistory},
  //邀请好友
  'user/invite': {component: userInviteIndex},
  'user/invite/friend': {component: userInviteFriend},
  'user/invite/input': {component: userCodeInput},
  //我的会员
  'user/member':{component: userMemberIndex},
  'user/vip':{component: userMemberVip},//我的会员 VIP
  'user/member/points':{component: userMemberPoints},//我的积分
  'user/member/recharge':{component: userMemberRecharge},//充值
  //我的班级
  'user/class':{component: userClassIndex},
  'user/class/detail':{component: userClassDetail},
  'user/class/addClass':{component: userClassAdd},
})

router.redirect({
  '/main/': '/main/index'
});

sync(store, router)

router.beforeEach(function(transition) {
    if (transition.to.path == '/register/password') {
      if(store.state.register.mobile == ''){
          console.log("禁止访问!");
          router.replace('/register');
      }
    }
    if (transition.to.path == '/forget/password') {
      if(store.state.forget.mobile == ''){
          console.log("禁止访问!");
          router.replace('/forget');
      }
    }
    transition.next();
})



// (function(){
//   function plusReady(){
//     plus.key.addEventListener("backbutton",function(){
// 		  window.history.back();
// 	  });
//   }
//   if(window.plus){
//     plusReady();
//   }else{
//     document.addEventListener("plusready",plusReady,false);
//   }
// }())

router.start(App,'#App')