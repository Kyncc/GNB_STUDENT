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
        token: rootState.common.user.token
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
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'statistics/remember/assemble/update',
      params: {
        token: rootState.common.user.token,
        id: params.id,
        type: params.type
      }
    })
      .then((response) => {
        commit(types.STATISTICS_REMEMBER_ASSEMBLE_UPDATE, {type: params.type, index: params.index})
        resolve(response)
      })
  })
}

/** 记错题难度筛选 */
export const setStatisticsRememberOptions = ({ commit }, params) => {
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
        token: rootState.common.user.token
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
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'statistics/camera/assemble/update',
      params: {
        token: rootState.common.user.token,
        id: params.id,
        type: params.type
      }
    })
      .then((response) => {
        commit(types.STATISTICS_CAMERA_ASSEMBLE_UPDATE, {type: params.type, index: params.index})
        resolve(response)
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
        offset: state.camera.offset,
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
        token: rootState.common.user.token
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
  commit(types.STATISTICS_GOOD_OPTIONS, {type: params.type, degree: params.degree})
}

/** 精选题组卷编辑 */
export const setStatisticsGoodAssembleUpdate = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'statistics/good/assemble/update',
      params: {
        token: rootState.common.user.token,
        id: params.id,
        type: params.type
      }
    })
      .then((response) => {
        commit(types.STATISTICS_GOOD_ASSEMBLE_UPDATE, {type: params.type, index: params.index})
        resolve(response)
      })
  })
}

/** 精选题题目排序 */
export const setStatisticsGoodAssembleList = ({ rootState, state, commit }, params) => {
  let ids = []
  let array = state.good.index.list
  for (let pindex = 0; pindex < array.length; pindex++) {
    for (let index = 0; index < array[pindex].list.length; index++) {
      ids.push({id: array[pindex]['list'][index].exercisesId, form: array[pindex]['list'][index].form})
    }
  }
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'statistics/good/assemble/order',
      data: {
        token: rootState.common.user.token,
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
export const setStatisticsGoodAssembleOrder = ({ commit }, params) => {
  commit(types.STATISTICS_GOOD_ASSEMBLE_ORDER, {type: params.type, index: params.index, pindex: params.pindex})
}

/** 列表高度保存 */
export const setStatisticsScroll = ({ commit }, params) => {
  commit(types.STATISTICS_SCROLL, {type: params.type, height: params.height})
}

/** 清空列表 */
export const clearStatistics = ({ commit }, params) => {
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
      params: {
        token: rootState.common.user.token,
        type: params.type
      }
    })
      .then((response) => {
        resolve(response)
      })
  })
}
