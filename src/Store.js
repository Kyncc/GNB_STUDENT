import Vue from 'vue'
import Vuex from 'vuex'
import common from './common/common'
import register from './login/modules/register'
import login from './login/modules/login'
import setPassword from './login/modules/setPassword'
import forget from './login/modules/forget'
import resetPassword from './login/modules/resetPassword'


Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    common,
    login,
    register,
    setPassword,
    forget,
    resetPassword
  }
})

