import {
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_ERROR
} from '../mutationTypes'

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router();
const state = {
  msg:''
}

const mutations = {
  [SET_PASSWORD_SUCCESS](state , data){
    state.msg = data.msg;
    router.replace('/');
  },
  [SET_PASSWORD_ERROR](state, data){
     state.msg = data.msg;
  }
}

export default {
  state,
  mutations
}