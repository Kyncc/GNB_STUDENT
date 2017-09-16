import Vue from 'vue'
import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 拍错题获取章节 */
export const getCamera = ({ rootState, commit, state }, params) => {
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'textbook/chapter',
      params: {
        token: rootState.common.user.token,
        type: params.type,
        subject: subject,
        editionId: params.editionId,
        textbookId: params.textbookId
      }
    }).then((response) => {
      commit(types.CAMERA, { 'subject': subject, 'data': response.data.data })
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 清除章节数据 */
export const clearCamera = ({ rootState, commit }) => {
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  commit(types.CAMERA_CLEAR, { 'subject': subject })
}

/** 拍错题高度保存 */
export const setCameraScroll = ({ rootState, commit }, height) => {
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  commit(types.CAMERA_SCROLL, { 'subject': subject, 'height': height })
}

/** 照片删除 */
export const cameraErrorDel = ({ commit }, index) => {
  commit(types.CAMERA_DEL, index)
}

/** 照片增加 */
export const cameraErrorAdd = ({ commit }, data) => {
  commit(types.CAMERA_ADD, data)
}

/** 照片拍照 */
export const cameraErrorCamera = ({ commit }, data) => {
  commit(types.CAMERA_PHOTO, data)
}

/** 上传照片 */
export const cameraErrorUpload = ({ state, rootState, commit }) => {
  Vue.$vux.loading.show({ text: '请稍候' })
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'workbook/uploader',
      data: {
        'token': rootState.common.user.token,
        'comment': state.uploader.list,
        'photo': rootState.route.params.id,
        'type': ''
      }
    })
      .then((response) => {
        commit(types.CAMERA_UPLOAD, response.data.data)
        resolve(response)
        Vue.$vux.loading.hide()
      })
      .catch(() => {
        Vue.$vux.loading.hide()
      })
  })
}
