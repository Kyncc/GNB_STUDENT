import Vue from 'vue'
import Vuex from 'vuex'
import Global from './common/global'
import register from './login/modules/register'
import login from './login/modules/login'
import setPassword from './login/modules/setPassword'
import forget from './login/modules/forget'
import resetPassword from './login/modules/resetPassword'
import comment from './common/modules/comment'
import correct from './common/modules/correct'
import info from './user/modules/info'
import collect from './collect/modules/index'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Global,
    login,
    register,
    setPassword,
    forget,
    resetPassword,
    //评注
    comment,
    //纠错
    correct,
    info,
    //收藏本
    collect

  }
})
