import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from './store'
import index from './router/router'
import login from './features/login/router'
import about from './features/about/router'
import collect from './features/collect/router'
import correct from './features/correct/router'
import example from './features/example/router'
import message from './features/message/router'
import myclass from './features/myclass/router'
import induce from './features/induce/router'
import error from './features/error/router'
import settings from './features/settings/router'
import workbook from './features/workbook/router'
import mybook from './features/mybook/router'

Vue.use(Router)
let router = new Router({
  mode: 'hash',
  routes: [
    about,
    collect,
    error,
    correct,
    example,
    login,
    ...index,
    ...induce,
    message,
    myclass,
    // ...report,
    settings,
    ...mybook,
    ...workbook
  ]
})
// 同步store和路由
sync(store, router)

export default router
