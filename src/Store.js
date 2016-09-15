import Vue from 'vue'
import Vuex from 'vuex'
import Global from './common/global'
import register from './login/modules/register'
import login from './login/modules/login'
import setPassword from './login/modules/setPassword'
import forget from './login/modules/forget'
import resetPassword from './login/modules/resetPassword'
import info from './main/modules/info'


Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Global,
    login,
    register,
    setPassword,
    forget,
    resetPassword,
    info
  }
})
