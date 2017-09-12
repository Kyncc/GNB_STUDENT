import Vue from 'vue'
import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取组卷高考列表 */
export const getCameraPoints = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'camera/points',
      params: {
        token: rootState.common.user.token,
        options: {
          editionId: state.options.editionId,
          grade: state.options.grade,
          subjectId: state.options.subject
        }
      }
    }).then((response) => {
      commit(types.CAMERA_GAOKAO, response.data.data)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 筛选选择 */
export const setCameraOptions = ({ rootState, commit }, params) => {
  commit(types.CAMERA_OPTIONS, params)
}

/** 获取筛选教材 */
export const getCameraOptionsTextbook = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/textbook',
      params: {
        token: rootState.common.user.token
      }
    }).then((response) => {
      commit(types.CAMERA_OPTIONS_TEXTBOOK, response.data.data)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 组卷高考列表高度保存 */
export const setCameraPointsScroll = ({ rootState, commit }, height) => {
  commit(types.CAMERA_GAOKAO_SCROLL, height)
}

/** 获取组卷同步列表 */
export const getCameraChapter = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'camera/chapter',
      params: {
        token: rootState.common.user.token,
        textbookId: state.options.textbook
      }
    }).then((response) => {
      commit(types.CAMERA_SYNC, response.data.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}
/** 同步高度保存 */
export const setCameraChapterScroll = ({ rootState, commit }, height) => {
  commit(types.CAMERA_SYNC_SCROLL, height)
}

/** 获取例题列表 */
export const getCameraExample = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'camera/example',
      params: {
        token: rootState.common.user.token,
        offset: state.example.offset,
        options: {
          id: rootState.route.params.id,
          type: rootState.route.params.type
        }
      }
    }).then((response) => {
      commit(types.CAMERA_EXAMPLE, response.data.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}
/** 组卷精选高度保存 */
export const setCameraExampleScroll = ({ rootState, commit }, height) => {
  commit(types.CAMERA_EXAMPLE_SCROLL, height)
}
/** 清空精选列表 */
export const clearCameraExample = ({ rootState, commit }) => {
  commit(types.CAMERA_EXAMPLE_CLEAR)
}

/** 获取精选列表 */
export const getCameraChoice = ({ rootState, state, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'camera/chioce',
      params: {
        token: rootState.common.user.token,
        offset: state.choice.offset,
        options: {
          exerciseId: rootState.route.params.id,
          grade: rootState.route.params.grade,
          subjectId: rootState.route.params.subjectId
        }
      }
    }).then((response) => {
      commit(types.CAMERA_CHOICE, response.data.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

/** 设置组卷 */
export const setCamera = ({ rootState, commit, state }, params) => {
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'camera/add',
      data: {
        token: rootState.common.user.token,
        options: {
          form: params.form,
          exercisesId: params.id,
          grade: params.grade || rootState.route.params.grade,
          subjectId: params.subjectId || rootState.route.params.subjectId
        }
      }
    })
      .then((response) => {
        Vue.$vux.loading.hide()
        commit(types.CAMERA_INTO, { form: params.form, index: params.index, data: response.data.data })
        if (localStorage.getItem('isCamera')) {
          Vue.$vux.toast.show({ text: response.data.msg, type: 'text', time: 1000, position: 'bottom' })
        } else {
          localStorage.setItem('isCamera', true)
          Vue.$vux.alert.show({
            title: '请到下载中心下载~',
            content: '(可以跨章节组卷)',
            dialogTransition: 'vux-fade'
          })
        }
        resolve(response)
      })
      .catch((err) => {
        Vue.$vux.loading.hide()
        reject(err)
      })
  })
}

/** 组卷精选高度保存 */
export const setCameraChoiceScroll = ({ rootState, commit }, height) => {
  commit(types.CAMERA_CHOICE_SCROLL, height)
}
/** 清空精选列表 */
export const clearCameraChoice = ({ rootState, commit }) => {
  commit(types.CAMERA_CHOICE_CLEAR)
}
