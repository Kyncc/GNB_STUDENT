import Vue from 'vue'
import axios from '@/components/axios/'
import * as types from './mutationTypes'

/**  获取用户信息 */
export const getUserInfo = ({ rootState, commit }) => {
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'user/getUserInfo',
      params: {
        token: rootState.common.user.token
      }
    })
    .then((response) => {
      commit(types.USERINFO, response.data)
      resolve(response)
      Vue.$vux.loading.hide()
    })
    .catch(() => {
      Vue.$vux.loading.hide()
    })
  })
}

/** 设置用户信息 */
export const setUserInfo = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'user/updateUserInfo',
      data: {
        ...params,
        token: rootState.common.user.token
      }
    })
    .then((response) => {
      resolve(response)
    })
  })
}

/** 上传头像 */
export const setHeadImg = ({ commit }, data) => {
  commit(types.USERPHOTO_SET, data)
}

/** 上传头像 */
export const uploadHeadImg = ({ rootState, commit }, params) => {
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'user/headImg',
      data: {
        file: params.file,
        token: rootState.common.user.token
      }
    })
    .then((response) => {
      commit(types.USERPHOTO_POST, response.data)
      Vue.$vux.loading.hide()
      resolve(response)
    })
    .catch(() => {
      Vue.$vux.loading.hide()
      reject()
    })
  })
}
