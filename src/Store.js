import Vue from 'vue'
import Vuex from 'vuex'
import Global from './common/global'
import register from './login/modules/register'
import login from './login/modules/login'
import forget from './login/modules/forget'
import interact from './router/interact/store'
import userinfo from './main/store'
import user from './user/modules/index'
// import camera from './camera/modules/index'
// import error from './error/modules/index'
import remember from './featrues/remember/store'
import brush from './featrues/brush/store'
import pass from './featrues/pass/store'
import breakList from './featrues/break/store'
import workbook from './featrues/workbook/store'
import textbook from './featrues/textbook/store'
import report from './featrues/report/store'
import collect from './featrues/collect/store'
import message from './featrues/message/store'
//需要重构
// import member from './user/modules/member.js'


Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Global,
    login,
    register,
    forget,
    interact,//互动
    userinfo,
    // member,
    //收藏本
    collect,
    report,
    remember,
    brush,
    user,
    pass,
    break:breakList,
    textbook,
    workbook,
    message
  }
})
