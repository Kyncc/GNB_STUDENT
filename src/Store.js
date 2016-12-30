import Vue from 'vue'
import Vuex from 'vuex'
import Global from './common/global'
import register from './login/modules/register'
import userInfo from './login/modules/login'
import forget from './login/modules/forget'
import index from './main/modules/index'
import interact from './router/interact/store'
// import camera from './camera/modules/index'
// import error from './error/modules/index'
import user from './user/modules/index'
import remember from './featrues/remember/store'
import brush from './featrues/brush/store'
import pass from './featrues/pass/store'
import breakList from './featrues/break/store'
import workbook from './featrues/workbook/store'
import textbook from './featrues/textbook/store'
import report from './featrues/report/store'
import collect from './featrues/collect/store'

//需要重构
// import member from './user/modules/member.js'


Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Global,
    userInfo,
    register,
    forget,
    index,
    interact,//互动
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
    workbook
  }
})
