import Vue from 'vue'
import Router from 'vue-router'
import VueTouch from 'vue-touch'
import App from './App'
//登陆
import Login from './login/pages/login'
//首页
import Main from './main/common/main'
import User from './main/pages/user'
import Message from './main/pages/message'
import Index from './main/pages/index'
//个人中心
import userResetPwd from './user/pages/resetPwd'
import userInfo from './user/pages/info'
//个人中心-设置
import userSettingsIndex from './user/pages/settings/index'
import userSettingsAboutUs from './user/pages/settings/aboutUs'
//个人中心-邀请好友
import userInviteIndex from './user/pages/invite/index'
import userInviteFriend from './user/pages/invite/friend'
//通知
Vue.use(Router)
Vue.use(VueTouch)
Vue.config.devtools = true

const router = new Router()

router.map({
  '/': {
    component: Login
  },
  '/main/': {
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
  //邀请好友
  'user/invite': {component: userInviteIndex},
  'user/invite/friend': {component: userInviteFriend}
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

router.start(App,'#app')


