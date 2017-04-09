import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from './store'
import login from './featuers/login/router'
import about from './featuers/about/router'
import settings from './featuers/settings/router'
import collect from './featuers/collect/router'
import report from './featuers/report/router'
import myclass from './featuers/myclass/router'
import index from './router/router'

Vue.use(Router)
let router = new Router({
  mode: 'hash',
  routes: [
    login,
    index,
    about,
    collect,
    report,
    myclass,
    settings
  ]
})

// 同步store和路由
sync(store, router)

export default router
