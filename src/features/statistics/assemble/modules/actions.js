import axios from '@/components/axios/'
import * as types from './mutationTypes'
import Vue from 'vue'

/** 获取记错题列表 */
export const getStatisticsRemember = ({ state, rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'statistics/remember/list',
      params: {
        token: rootState.common.user.token,
        offset: state.remember.index.offset,
        options: {
          subject: rootState.route.params.subject,
          chapterId: rootState.route.params.chapterId,
          degree: state.remember.index.options.degree
        }
      }
    })
      .then((response) => {
        commit(types.STATISTICS_REMEMBER, {'data': response.data.data})
        resolve(response)
      })
  })
}

/** 获取记错题组卷列表 */
export const getStatisticsRememberAssemble = ({ state, rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'statistics/remember/assemble',
      params: {
        token: rootState.common.user.token,
        subject: rootState.route.params.subject
      }
    })
      .then((response) => {
        commit(types.STATISTICS_REMEMBER_ASSEMBLE, {'data': response.data.data})
        resolve(response)
      })
  })
}

/** 记错题组卷编辑 */
export const setStatisticsRememberAssembleUpdate = ({ rootState, commit }, params) => {
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'statistics/remember/assemble/update',
      data: {
        token: rootState.common.user.token,
        id: params.id,
        subject: rootState.route.params.subject
      }
    })
      .then((response) => {
        Vue.$vux.loading.hide()
        Vue.$vux.toast.show({text: response.data.msg, type: 'text', time: 1000, position: 'bottom'})
        commit(types.STATISTICS_REMEMBER_ASSEMBLE_UPDATE, {index: params.index, data: response.data.data})
        resolve(response)
      })
      .catch((err) => {
        Vue.$vux.loading.hide()
        reject(err)
      })
  })
}

/** 记错题难度筛选 */
export const setStatisticsRememberOptions = ({ commit }, params) => {
  commit(types.STATISTICS_ASSEMBLE_RESET, {type: 'remember'})
  commit(types.STATISTICS_REMEMBER_OPTIONS, {degree: params.degree})
}

/** 获取拍错题列表 */
export const getStatisticsCamera = ({ state, rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'statistics/camera/list',
      params: {
        token: rootState.common.user.token,
        offset: state.camera.index.offset,
        options: {
          subject: rootState.route.params.subject,
          chapterId: rootState.route.params.chapterId
        }
      }
    })
      .then((response) => {
        commit(types.STATISTICS_CAMERA, {'data': response.data.data})
        resolve(response)
      })
  })
}

/** 获取拍错题组卷列表 */
export const getStatisticsCameraAssemble = ({ state, rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'statistics/camera/assemble',
      params: {
        token: rootState.common.user.token,
        subject: rootState.route.params.subject
      }
    })
      .then((response) => {
        commit(types.STATISTICS_CAMERA_ASSEMBLE, {'data': response.data.data})
        resolve(response)
      })
  })
}

/** 拍错题组卷编辑 */
export const setStatisticsCameraAssembleUpdate = ({ rootState, commit }, params) => {
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'statistics/camera/assemble/update',
      data: {
        token: rootState.common.user.token,
        id: params.id,
        subject: rootState.route.params.subject
      }
    })
      .then((response) => {
        Vue.$vux.loading.hide()
        commit(types.STATISTICS_CAMERA_ASSEMBLE_UPDATE, {data: response.data.data, index: params.index})
        Vue.$vux.toast.show({text: response.data.msg, type: 'text', time: 1000, position: 'bottom'})
        resolve(response)
      })
      .catch((err) => {
        Vue.$vux.loading.hide()
        reject(err)
      })
  })
}

/** 获取精选题列表 */
export const getStatisticsGood = ({ state, rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'statistics/good/list',
      params: {
        token: rootState.common.user.token,
        offset: state.good.index.offset,
        options: {
          subject: rootState.route.params.subject,
          chapterId: rootState.route.params.chapterId,
          type: state.good.index.options.type,
          degree: state.good.index.options.degree
        }
      }
    })
      .then((response) => {
        commit(types.STATISTICS_GOOD, {'data': response.data.data})
        resolve(response)
      })
  })
}

/** 获取精选题组卷列表 */
export const getStatisticsGoodAssemble = ({ state, rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'statistics/good/assemble',
      params: {
        token: rootState.common.user.token,
        subject: rootState.route.params.subject
      }
    })
      .then((response) => {
        commit(types.STATISTICS_GOOD_ASSEMBLE, {'data': response.data.data})
        resolve(response)
      })
  })
}

/** 精选题筛选 */
export const setStatisticsGoodOptions = ({ commit }, params) => {
  commit(types.STATISTICS_ASSEMBLE_RESET, {type: 'good'})
  commit(types.STATISTICS_GOOD_OPTIONS, {type: params.type, degree: params.degree})
}

/** 精选题组卷编辑 */
export const setStatisticsGoodAssembleUpdate = ({ rootState, commit }, params) => {
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'statistics/good/assemble/update',
      data: {
        token: rootState.common.user.token,
        subject: rootState.route.params.subject,
        id: params.id,
        type: params.type
      }
    })
      .then((response) => {
        Vue.$vux.loading.hide()
        commit(types.STATISTICS_GOOD_ASSEMBLE_UPDATE, {from: params.from, index: params.index, data: response.data.data})
        Vue.$vux.toast.show({text: response.data.msg, type: 'text', time: 1000, position: 'bottom'})
        resolve(response)
      })
  })
}

/** 精选题题目排序 */
export const setStatisticsGoodAssembleList = ({ state, rootState, commit }, params) => {
  let ids = []
  let array = state.good.download
  for (let pindex = 0; pindex < array.length; pindex++) {
    for (let index = 0; index < array[pindex]['list'].length; index++) {
      ids.push({id: array[pindex]['list'][index].exercisesId, form: array[pindex]['list'][index].form})
    }
  }
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'statistics/good/assemble/order',
      params: {
        token: rootState.common.user.token,
        subject: rootState.route.params.subject,
        ids: ids
      }
    }).then((response) => {
      Vue.$vux.loading.hide()
      resolve(response)
    }).catch((e) => {
      Vue.$vux.loading.hide()
      reject(e)
    })
  })
}

/**  精选题排序 */
export const setStatisticsGoodAssembleOrder = ({ state, commit }, params) => {
  if (params.index === 0 && params.type === 'up') {
    Vue.$vux.toast.show({text: '不能再上移了', type: 'text', time: 1000, position: 'bottom'})
  } else if ((params.index === (state.good.download[params.pindex].list.length - 1)) && params.type === 'down') {
    Vue.$vux.toast.show({text: '不能再下移了', type: 'text', time: 1000, position: 'bottom'})
  } else {
    commit(types.STATISTICS_GOOD_ASSEMBLE_ORDER, {type: params.type, index: params.index, pindex: params.pindex})
  }
}

/** 列表高度保存 */
export const setStatisticsScroll = ({ commit }, params) => {
  commit(types.STATISTICS_SCROLL, {type: params.type, height: params.height})
}

/** 清空列表 */
export const clearStatisticsAssemble = ({ commit }, params) => {
  commit(types.STATISTICS_ASSEMBLE_RESET, {type: params.type})
}

/** 清空组卷列表 */
export const clearStatisticsDownload = ({ commit }, params) => {
  commit(types.STATISTICS_ASSEMBLE_DOWNLOAD_RESET, {type: params.type})
}

/** 组卷下载 */
export const getStatisticsAssemblUrl = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'statistics/assemble/download',
      data: {
        token: rootState.common.user.token,
        subject: rootState.route.params.subject,
        type: params.type
      }
    })
      .then((response) => {
        // 清空组卷列表
        commit(types.STATISTICS_ASSEMBLE_RESET, {type: params.type})
        resolve(response)
      })
  })
}

/** 评价提交 */
export const getStatisticsComment = ({ rootState, commit }, params) => {
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'comment',
      data: {
        token: rootState.common.user.token,
        chapterId: params.chapterId,
        type: params.type,
        errorComment: params.errorComment,
        id: params.id
      }
    })
      .then((response) => {
        Vue.$vux.loading.hide()
        commit(types.STATISTICS_COMMENT, {type: params.type, errorComment: params.errorComment, index: params.index})
        resolve(response)
      })
      .catch((e) => {
        Vue.$vux.loading.hide()
        reject(e)
      })
  })
}
