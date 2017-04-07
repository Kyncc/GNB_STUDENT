import Vue from 'vue'
import * as types from './mutationTypes'
import axios from '@/components/axios/'

/** 提交反馈 */
export const updateAdvice = ({rootState, commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'user/advice',
      data: {
        token: rootState.login.token,
        ...params
      }
    })
    .then((response) => {
      Vue.$vux.toast.show({text: '感谢您的反馈！', type: 'text', time: 1000, position: 'bottom'})
      resolve(response)
    })
  })
}

/** 反馈列表 */
export const adviceHistory = ({rootState, commit}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'user/adviceHistory',
      params: {
        token: rootState.login.token
      }
    })
    .then((response) => {
      commit(types.ADVICE_LIST, response.data.data)
      resolve(response)
    })
  })
}
