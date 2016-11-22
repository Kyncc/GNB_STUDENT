import {
  GET_LOGIN_SUCCESS,
  GET_LOGIN_ERROR,
  GET_LOGIN_FAILED,
  GET_LOGIN_CLEAR,
  SET_HEAD_IMG
} from '../mutationTypes'

const state = {
    headImg:localStorage.getItem('headImg')?localStorage.getItem('headImg'):' ',
    mobile:localStorage.getItem('mobile')?localStorage.getItem('mobile'):' ',
    name:localStorage.getItem('name')?localStorage.getItem('name'):' ',
    isVip:localStorage.getItem('isVip')?localStorage.getItem('isVip'):' ',
    balance:localStorage.getItem('balance')?localStorage.getItem('balance'):' ',
    numerical:localStorage.getItem('numerical')?localStorage.getItem('numerical'):' ',
    subjectType:localStorage.getItem('subjectType')?localStorage.getItem('subjectType').split(","):' ',
    token: localStorage.getItem('token')
}

const mutations = {
  [GET_LOGIN_SUCCESS](state, data){
    state.headImg =data.data.headImg;
    state.mobile = data.data.mobile;
    state.name = data.data.name;
    state.token = data.data.token;
    state.isVip = data.data.isVip;
    state.balance = data.data.balance;
    state.numerical = data.data.numerical;
    state.subjectType = data.data.subjectType;
    localStorage.setItem('headImg',data.data.headImg);
    localStorage.setItem('mobile',data.data.mobile);
    localStorage.setItem('name',data.data.name);
    localStorage.setItem('token',data.data.token);
    localStorage.setItem('isVip',data.data.isVip);
    localStorage.setItem('balance',data.data.balance);
    localStorage.setItem('numerical',data.data.numerical);
    localStorage.setItem('subjectType',data.data.subjectType);
  },
  [SET_HEAD_IMG](state, data) {
    state.headImg = data;
    localStorage.setItem('headImg',data);
  }
}

export default {
  state,
  mutations
}
