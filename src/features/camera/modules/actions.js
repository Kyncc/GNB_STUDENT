import Vue from 'vue'
import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 拍错题获取章节 */
export const getCameraChapter = ({ rootState, commit, state }, params) => {
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'textbook/chapter',
      params: {
        token: rootState.common.user.token,
        type: 'chapter',
        subject: subject,
        editionId: params.editionId,
        textbookId: params.textbookId
      }
    }).then((response) => {
      commit(types.CAMERA_CHAPTER, { 'subject': subject, 'data': response.data.data })
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 清除章节数据 */
export const clearCameraChapter = ({ rootState, commit }) => {
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  commit(types.CAMERA_CHAPTER_CLEAR, { 'subject': subject })
}

/** 拍错题高度保存 */
export const setCameraChapterScroll = ({ rootState, commit }, height) => {
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  commit(types.CAMERA_CHAPTER_SCROLL, { 'subject': subject, 'height': height })
}

/** 拍错题获取考点 */
export const getCameraPoints = ({ rootState, commit, state }, params) => {
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'textbook/chapter',
      params: {
        token: rootState.common.user.token,
        type: 'testpoint',
        subject: subject,
        editionId: params.editionId
      }
    }).then((response) => {
      commit(types.CAMERA_POINTS, { 'subject': subject, 'data': response.data.data })
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 清除考点数据 */
export const clearCameraPoints = ({ rootState, commit }) => {
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  commit(types.CAMERA_POINTS_CLEAR, { 'subject': subject })
}

/** 拍错题考点高度保存 */
export const setCameraPointsScroll = ({ rootState, commit }, height) => {
  let subject = (rootState.route.name.indexOf('math') !== -1 ? 'math' : 'physics')
  commit(types.CAMERA_POINTS_SCROLL, { 'subject': subject, 'height': height })
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
export const cameraErrorUpload = ({ state, rootState, commit }, params) => {
  Vue.$vux.loading.show({ text: '请稍候' })
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'camear/upload',
      data: {
        'token': rootState.common.user.token,
        'photo': state.uploader.list[0],
        'comment': params.comment,
        'relationId': rootState.route.query.relationId,
        'type': rootState.route.query.type
      }
    })
      .then((response) => {
        commit(types.CAMERA_UPLOAD)
        resolve(response)
        Vue.$vux.loading.hide()
      })
      .catch(() => {
        Vue.$vux.loading.hide()
      })
  })
}
