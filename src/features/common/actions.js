import Vue from 'vue'
import axios from '@/components/axios/'
import * as types from './mutationTypes'

/**  获取用户信息 */
export const getUserInfo = ({ rootState, commit }) => {
  Vue.$vux.loading.show({ text: '请稍候' })
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'user',
      params: {
        token: rootState.common.user.token
      }
    })
      .then((response) => {
        commit(types.USERINFO, response.data.data)
        resolve(response)
        Vue.$vux.loading.hide()
      })
      .catch(() => {
        Vue.$vux.loading.hide()
      })
  })
}

/** 设置用户信息 */
export const setUserInfo = ({ rootState, commit, dispatch }, params) => {
  Vue.$vux.loading.show({ text: '请稍候' })
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'user/update',
      data: {
        ...params,
        token: rootState.common.user.token
      }
    })
      .then((response) => {
        Vue.$vux.loading.hide()
        resolve(response)
      })
      .catch(() => {
        Vue.$vux.loading.hide()
      })
  })
}

/** 获取用户token */
export const getToken = ({ commit }, params) => {
  Vue.$vux.loading.show({ text: '请稍候' })
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'user/token',
      params: {
        ...params
      }
    })
      .then((response) => {
        commit('USER_TOKEN', response.data.token)
        Vue.$vux.loading.hide()
        resolve(response)
      })
      .catch((error) => {
        Vue.$vux.loading.hide()
        reject(error)
      })
  })
}

/** *获得课本版本信息 */
export const getTextbookVersion = ({ commit }, params) => {
  Vue.$vux.loading.show({ text: '请稍候' })
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'textbookVersion',
      params: {
        grade: params.grade
      }
    })
      .then((response) => {
        Vue.$vux.loading.hide()
        commit(types.TEXTBOOK_VERSION, response.data.data)
        resolve(response)
      })
      .catch((error) => {
        Vue.$vux.loading.hide()
        reject(error)
      })
  })
}

/** 获取用户通知状态 */
export const getUserNews = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'message/new',
      params: {
        token: rootState.common.user.token
      }
    })
      .then((response) => {
        commit(types.USER_NEW_MESSAGE, response.data.data)
        resolve(response)
      })
  })
}

/** 上传头像 */
export const setHeadImg = ({ commit }, data) => {
  commit(types.USERPHOTO_SET, data)
}

/** 上传头像 */
export const uploadHeadImg = ({ rootState, commit, dispatch }, params) => {
  Vue.$vux.loading.show({ text: '请稍候' })
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'user/headImg',
      data: {
        img: params.img,
        token: rootState.common.user.token
      }
    })
      .then((response) => {
        commit(types.USERPHOTO_POST, response.data.data)
        dispatch('getUserInfo')
        Vue.$vux.loading.hide()
        resolve(response)
      })
      .catch((error) => {
        Vue.$vux.loading.hide()
        reject(error)
      })
  })
}

/** 获取轮播文案 */
export const getSwiperInfo = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'swiper',
      params: {
        id: rootState.route.params.id
      }
    })
      .then((response) => {
        commit(types.SWIPER_INFO, response.data.data)
        resolve(response)
      })
  })
}

/** 清空轮播文案 */
export const swiperInfoClear = ({ commit }) => {
  commit(types.SWIPER_INFO, { title: '', article: '' })
}
