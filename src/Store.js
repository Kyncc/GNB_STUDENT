import Vue from 'vue'
import Vuex from 'vuex'
import Global from './common/global'
import register from './login/modules/register'
import userInfo from './login/modules/login'
import forget from './login/modules/forget'
import index from './main/modules/index'
import interact from './interact/store'
import camera from './camera/modules/index'
import error from './error/modules/index'

import brush from './brush/modules/index'

import remember from './remember/modules/index'

import workbook from './bag/workbook/store'
import textbook from './bag/textbook/store'
import report from './bag/report/store'
import collect from './bag/collect/store'

import user from './user/modules/index'
//需要重构
import member from './user/modules/member.js'


Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Global,
    userInfo,
    register,
    forget,
    index,
    interact,//互动
    member,
    //收藏本
    collect,
    //归纳本
    error,
    //拍错题
    camera,
    report,
    remember,
    brush,
    user,


    textbook,
    workbook
  }
})
