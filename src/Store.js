import Vue from 'vue'
import Vuex from 'vuex'
import tools from './featrues/common/tools/store'
import user from './router/user/modules/store'


Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    tools,
    user
  }
})
