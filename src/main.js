import Vue from 'vue'
import Router from 'vue-router'
import App from './App'

//登陆
import Login from './login/pages/login'

//首页
import Main from './main/common/main'
import User from './main/pages/user'
import Message from './main/pages/message'
import Index from './main/pages/index'
//个人中心
import resetPwd from './user/pages/resetPwd'
import settings from './user/pages/settings'

//通知
Vue.use(Router)
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
  'user/resetPwd': {component: resetPwd},
  'user/settings': {component: settings}
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


