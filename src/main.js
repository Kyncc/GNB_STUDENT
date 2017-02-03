import Vue from 'vue'
import Router from 'vue-router'
import VueTouch from 'vue-touch'
import {sync} from 'vuex-router-sync'
import App from './app'
import store from './store'
import * as _ from './config/whole.js'
//登陆、注册
import Login from './login/pages/login'
import register from './login/pages/register'
import setPassword from './login/pages/setPassword'
import setInfo from './login/pages/setInfo'
import forget from './login/pages/forget'
import resetPassword from './login/pages/resetPassword'
//题目评注、纠错
import correct from './common/pages/correct'
import comment from './common/pages/comment'
//首页
import Layout from './main/pages/layout'
//首页模块
import index from './router/index/router'
//书包模块
import bag from './router/bag/router'
//互动
import interact from './router/interact/router'
//个人中心
import user from './router/user/router'
//个人中心-邀请好友
import userInviteIndex from './user/pages/invite/index'
import userInviteFriend from './user/pages/invite/friend'
import userCodeInput from './user/pages/invite/input'
//插件
import moment from 'moment'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import '../node_modules/cropperjs/dist/cropper.min.css'

Vue.use(Router)
Vue.use(VueTouch)

Vue.config.devtools = true
FastClick.attach(document.body)

//图片异步加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://www.chinasanbao.com/new/upload/headimg/headimg.png',
  loading: 'http://hilongjw.github.io/vue-lazyload/dist/loading-spin.svg'
})

//格式化时间
Vue.filter('ymd', function (value) {
  return moment.unix(value).format('YYYY-MM-DD');
});

//请求超时
Vue.http.interceptors.push((request, next) => {
  var timeout;
  if (request._timeout) {
    timeout = setTimeout(() => {
      if (request.onTimeout) request.onTimeout(request)
      request.abort()
    }, request._timeout);
  }
  next((response) => {
    clearTimeout(timeout);
  });
})

//判断系统
var ua = navigator.userAgent.toLowerCase();
const commit = store.commit || store.dispatch
if (/iphone|ipad|ipod/.test(ua)) {
  commit('SET_SYSTEM', 'IOS')
} else if (/android/.test(ua)) {
  commit('SET_SYSTEM', 'Android')
}

const router = new Router()
router.map({
  'login': {
    component: Login
  },
  //注册账户
  'register': {
    component: register
  },
  'register/password': {
    component: setPassword
  },
  'register/info': {
    component: setInfo
  },
  //忘记密码
  'forget': {
    component: forget
  },
  'forget/password': {
    component: resetPassword
  },
  //主页
  '/': {
    component: Layout,
    subRoutes: {
      //纠错
      'correct/:subjectId/:id': {
        component: correct
      },
      //评注
      'comment/:subjectId/:id': {
        component: comment
      },
      ...user,
      ...interact,
      ...index,
      ...bag,
    }
  }
})

sync(store, router)

router.beforeEach(function (transition) {
  if (transition.to.path == '/') {
    if (localStorage.token) {
      router.replace('/index');
    } else {
      router.replace('/login');
    }
  }
  transition.next();
})

function plusReady() {
  let first = null;
  plus.key.addEventListener("backbutton", function () {
    if (store.state.route.path == '/interact' || store.state.route.path == '/index' || store.state.route.path == '/user' || store.state.route.path == '/bag') {
      if (!first) {
        first = new Date().getTime();
        _.toast('再按一次退出')
        setTimeout(function () {
          first = null;
        }, 1000);
      } else {
        if (new Date().getTime() - first < 1000) {
          plus.runtime.quit();
        }
      }
    } else {
      window.history.back();
    }
  });
}

if (window.plus) {
  plusReady();
} else {

  document.addEventListener("plusready", plusReady, false);

  
}

router.start(App, '#App')
