import Vue from 'vue'
import Router from 'vue-router'
import VueTouch from 'vue-touch'
import App from './app'
//登陆、注册
import Login from './login/pages/login'
import agreement from './login/pages/agreement'
import register from './login/pages/register'
import password from './login/pages/password'
import forget from './login/pages/forget'
//首页
import Main from './main/common/main'
import User from './main/pages/user'
import Message from './main/pages/message'
import Index from './main/pages/index'
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
import userMemberPoints from './user/pages/member/points'
import userMemberRecharge from './user/pages/member/recharge'

Vue.use(Router)
Vue.use(VueTouch)
Vue.config.devtools = true

const router = new Router()
router.map({
  '/': { component: Login},
  'agreement':{component: agreement},
  //注册账户
  'register':{component: register},
  'register/password':{component: password},
  //消息
  'message/class':{component: messageClass},
  'message/homework':{component: messageHomework},
  'message/advice':{component: messageAdvice},
  'message/system':{component: messageSystem},
  'message/correct':{component: messageCorrect},
  //忘记密码
  'forget':{component: forget},
  'forget/password':{component: password},
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
  'user/member':{component: userMemberIndex},//我的会员
  'user/member/points':{component: userMemberPoints},//我的积分
  'user/member/recharge':{component: userMemberRecharge}
})

router.redirect({
  '/main/': '/main/index'
});

(function(){
  function plusReady(){
    plus.key.addEventListener("backbutton",function(){
		  window.history.back();
	  });
  }
  if(window.plus){
    plusReady();
  }else{
    document.addEventListener("plusready",plusReady,false);
  }
}())

router.start(App,'#App')
