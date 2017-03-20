import Vue from 'vue'
import Router from 'vue-router'
// import 'babel-polyfill'
import { sync } from 'vuex-router-sync'
import App from './app'
import store from './store'
import * as _ from 'config/whole.js'

import Login from './router/login/router'
import Correct from './featrues/correct/router'
import Example from './featrues/example/router'
import Layout from './router/layout'
import User from './router/user/router'
import Index from './router/index/router'
import Bag from './router/bag/router'
import Interact from './router/interact/router'
//插件
import moment from 'moment'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.use(Router)
Vue.config.devtools = true
FastClick.attach(document.body)
//图片异步加载
Vue.use(VueLazyload)
// //格式化时间
Vue.filter('ymd',(value)=>{
  return moment.unix(value).format('YYYY-MM-DD')
})

//课程ID的转换
Vue.filter('subName', (id) => {
  switch(id){
    case '2':return '数学';
    case '7':return '物理';
    case '8':return '化学';
  }
})

//年级的转换
Vue.filter('gradeName',(id) => {
  switch(id){
    case '10':return '高中';
    case '9':return '九年级';
    case '8':return '八年级';
    case '7':return '七年级';
  }
})

const router = new Router()
router.map({
  ...Login,
  ...Correct,
  ...Example,
  'main': {
    component: Layout,
    subRoutes: {
      ...Index,
      ...User,
      ...Bag,
      ...Interact
    }
  }
})

//将路由和store同步
sync(store, router)

router.beforeEach(function(transition) {
  if (transition.to.path == '/') {
    if(localStorage.token){
        router.replace('/main/index');
    }else{
        router.replace('/login');
    }
  }
  transition.next();
})


/*在首页 或者loading启动的时候,返回键失效
* 其他页面则直接返回上一页
*/
document.addEventListener('plusready', function(){
    let first = null;
    plus.key.addEventListener('backbutton',function(){
    if(
      store.state.route.path == '/login' || 
      store.state.route.path == '/main/index' || 
      store.state.route.path == '/main/bag' || 
      store.state.route.path =='/main/interact' || 
      store.state.route.path =='/main/user'
    ){
      if(!first){
      first = new Date().getTime();
        _.toast('再按一次退出')
        setTimeout(function() {
            first = null;
        }, 1000);
      }else{
          if(new Date().getTime() - first < 1000) {
              plus.runtime.quit();
          }
      }
      return;
    }else if(store.state.tools.isLoading){
      return;
    }else{
      history.back();
    }
  },false)
})

router.start(App, '#App')