import Vue from 'vue'
import Router from 'vue-router'
import App from './App'

//登陆
import Login from './login/container/login'

//首页
import Main from './main/common/main'
import User from './main/container/user'
import Message from './main/container/message'
import Index from './main/container/index'
//个人中心

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
  }
})

router.redirect({
  '/main/': '/main/index'
});

router.start(App,'#app')