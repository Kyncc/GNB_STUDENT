import Vue from 'vue'
import Vuex from 'vuex'
import register from './login/modules/register'
import login from './login/modules/login'
import common from './common/common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    register,
    common
  }
})

