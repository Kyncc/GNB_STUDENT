import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from './store'
import index from './router/router'
import login from './featuers/login/router'
import about from './featuers/about/router'
import collect from './featuers/collect/router'
import correct from './featuers/correct/router'
import example from './featuers/example/router'
import message from './featuers/message/router'
import myclass from './featuers/myclass/router'
import report from './featuers/report/router'
import settings from './featuers/settings/router'
import workbook from './featuers/workbook/router'

Vue.use(Router)
let router = new Router({
  mode: 'hash',
  routes: [
    login,
    index,
    about,
    example,
    correct,
    ...workbook,
    message,
    collect,
    report,
    myclass,
    settings
  ]
})

// 同步store和路由
sync(store, router)

export default router
