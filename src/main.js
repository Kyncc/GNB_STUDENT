import Vue from 'vue'
import Router from 'vue-router'
import VueTouch from 'vue-touch'
import { sync } from 'vuex-router-sync'
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
//首页
import Main from './main/common/main'
import User from './main/pages/user'
import Message from './main/pages/message'
import Index from './main/pages/index'
import Photo from './main/pages/photo.vue'
//题目评注、纠错
import correct from './common/pages/correct'
import comment from './common/pages/comment'
//拍错题
import camera from './camera/pages/index'
import cameraHistory from './camera/pages/history'
import cameraRecord from './camera/pages/record'
import cameraResult from './camera/pages/result'
import cameraPhoto from './camera/pages/photo'
import cameraSuccess from './camera/pages/success'
//归纳本
import error from './error/pages/index'
import errorList from './error/pages/list'
import errorDetail from './error/pages/detail'
import errorMore from './error/pages/more'
import errorRecommend from './error/pages/recommend'
//收藏本
import collectExample from './collect/pages/example'
import collectCamera from './collect/pages/camera'
import collectCameraDetail from './collect/pages/cameraRecord'
import collectExampleDetail from './collect/pages/exampleDetail'
//通知
import messageClass from './message/pages/class'
import messageCorrect from './message/pages/correct'
import messageSystem from './message/pages/system'
//刷题型
import brush from './brush/pages/index'
//知识图谱
import report from './report/pages/index'
import reportDetail from './report/pages/detail'
//记错题
import remember from './remember/pages/index'
import rememberWorkbook from './remember/pages/workbook'
import rememberExercise from './remember/pages/exercise'
import rememberExample from './remember/pages/example'
import rememberAdd from './remember/pages/add'
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
import userMemberRule from './user/pages/member/rule'
import userMemberRecharge from './user/pages/member/recharge'
import userMemberMyBill from './user/pages/member/myBill'
//我的班级
import userClassIndex from './user/pages/class/index'
import userClassDetail from './user/pages/class/classDetail'
import userClassAdd from './user/pages/class/addClass'
//我的教材
import userTextbook from './user/pages/textbook/index'
import userTextbookAdd from './user/pages/textbook/add'
//我的习题册
import userWorkbook from './user/pages/workbook/index'
import userWorkbookAdd from './user/pages/workbook/add'
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
Vue.use(VueLazyload,{
  preLoad: 1.3,
  error: 'http://www.atool.org/placeholder.png?size=300x200&text=%E5%8A%A0%E8%BD%BD%E5%9B%BE%E7%89%87%E5%A4%B1%E8%B4%A5&&bg=ccc&fg=fff',
  loading: 'http://hilongjw.github.io/vue-lazyload/dist/loading-spin.svg'
})

//格式化时间
Vue.filter('ymd', function(value) {
  return moment.unix(value).format('YYYY-MM-DD');
});

//请求超时
Vue.http.interceptors.push((request, next) => {
    var timeout;
    if (request._timeout) {
        timeout = setTimeout(() => {
            if(request.onTimeout) request.onTimeout(request)
			      request.abort()
        }, request._timeout);
    }
    next((response) => {
        clearTimeout(timeout);
    });
})

const router = new Router()
router.map({
  '/': { component: Login },
  //注册账户
  'register': { component: register },
  'register/password': { component: setPassword },
  'register/info': { component: setInfo },
  //忘记密码
  'forget': { component: forget },
  'forget/password': { component: resetPassword },
  //纠错
  'correct/:id':{component: correct},
  //评注
  'comment/:id':{component: comment},
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
  'main/user/photo':{
      component: Photo
  },
  //拍错题
 'camera':{component: camera},
 'camera/history':{component: cameraHistory},
 'camera/photo':{component: cameraPhoto},
 'camera/record/:id/:cameraId':{component: cameraRecord},
 'camera/result/:id':{component: cameraResult},
 'camera/success':{component: cameraSuccess},
  //归纳本
  'error': { component: error },
  'error/detail/:id': { component: errorDetail },
  'error/list/:knowledgeId': { component: errorList },
  'error/more/:knowledgeId/:id': { component: errorMore },
  'error/recommend/:knowledgeId': { component: errorRecommend },
  //收藏本
  'collect/example': {component: collectExample},
  'collect/camera': {component: collectCamera},
  'collect/camera/detail/:id/:cameraId': {component: collectCameraDetail},
  'collect/example/detail/:id': {component: collectExampleDetail},
  //消息
  'message/class': { component: messageClass },
  'message/system': { component: messageSystem },
  'message/correct': { component: messageCorrect },
  //知识图谱
  'report': {component: report},
  'report/detail/:chapterId': {component: reportDetail},
  //记错题
  'remember':{component: remember},
  'remember/add':{component: rememberAdd},
  'remember/example/:id': { component:  rememberExample},
  'remember/workbook/:bookId':{component: rememberWorkbook},
  'remember/workbook/exercise/:chapterId':{component: rememberExercise},
  //刷题型
  'brush':{component: brush},
  //个人中心
  'user/resetPwd': { component: userResetPwd },
  'user/info': { component: userInfo },
  //设置
  'user/settings': { component: userSettingsIndex },
  'user/settings/aboutUs': { component: userSettingsAboutUs },
  'user/settings/advice': { component: userSettingsAdvice },
  'user/settings/advice/history': { component: userSettingsAdviceHistory },
  //邀请好友
  'user/invite': { component: userInviteIndex },
  'user/invite/friend': { component: userInviteFriend },
  'user/invite/input': { component: userCodeInput },
  //我的会员
  'user/member': { component: userMemberIndex },
  'user/member/points': { component: userMemberPoints }, //我的积分
  'user/member/recharge': { component: userMemberRecharge }, //充值
  'user/member/myBill': { component: userMemberMyBill }, //我的账单
  'user/member/rule':{ component: userMemberRule}, //积分规则
  //我的班级
  'user/class': { component: userClassIndex },
  'user/class/detail/:id': { component: userClassDetail },
  'user/class/addClass': { component: userClassAdd },
  //我的教材
  'user/textbook': { component: userTextbook },
  'user/textbook/add':{component:userTextbookAdd},
  //我的习题册
  'user/workbook': { component: userWorkbook },
  'user/workbook/add':{component:userWorkbookAdd}
})

router.redirect({
  // '/':'/main',
  '/main/': '/main/index',
  '/collect/': '/collect/example',
  'camera/correct/:id':'/correct/:id',
  'collect/correct/:id':'/correct/:id',
  'error/correct/:id':'/correct/:id',
  'camera/comment/:id':'/comment/:id',
  'collect/comment/:id':'/comment/:id',
  'error/comment/:id':'/comment/:id'
});

sync(store, router)

// router.beforeEach(function(transition) {
//     if (transition.to.path == '/') {
//       router.replace('/login');
//       // if(localStorage.token){
//       //     router.replace('/main/index');
//       // }else{
//       //     router.replace('/login');
//       // }
//     }
//   // if (transition.to.path == '/register/password') {
//   //   if (store.state.register.mobile == '') {
//   //     console.log("禁止访问!");
//   //     router.replace('/register');
//   //   }
//   // }
//   // if (transition.to.path == '/forget/password') {
//   //   if (store.state.forget.mobile == '') {
//   //     console.log("禁止访问!");
//   //     router.replace('/forget');
//   //   }
//   // }
//   transition.next();
// })



function plusReady(){
  let first = null;
  plus.key.addEventListener("backbutton",function(){
      if(store.state.route.path == '/main/index' || store.state.route.path =='/main/message' || store.state.route.path =='/main/user'){
          if (!first) {
              first = new Date().getTime();
              _.toast('再按一次退出')
              setTimeout(function() {
                  first = null;
              }, 1000);
          } else {
              if (new Date().getTime() - first < 1000) {
                  plus.runtime.quit();
              }
          }
      }else{
          window.history.back();
      }
  });
}

if(window.plus){
  plusReady();
}else{
  document.addEventListener("plusready",plusReady,false);
}

router.start(App, '#App')
