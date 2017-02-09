import Vue from 'vue'
import Vuex from 'vuex'
import tools from './featrues/common/tools/store'

Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    tools
  }
})
