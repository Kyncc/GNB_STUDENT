import * as types from './mutationTypes'
import axios from '@/components/axios/'

function getSubjectId (val) {
  let subject = ''
  if (val.toString() === '2') {
    subject = 'math'
  } else if (val.toString() === '7') {
    subject = 'physics'
  } else if (val.toString() === '8') {
    subject = 'chemistry'
  }
  return subject
}

/** 获取拍错题下载列表 */
export const getDownloadCamera = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: ' download/camera',
      params: {
        token: rootState.common.user.token,
        subject: getSubjectId(params.subject)
      }
    }).then((response) => {
      commit(types.DOWNLOAD, {data: response.data.data, type: 'camera'})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 获取拍错题试卷详情 */
export const getDownloadCameraDetail = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/camera/detail',
      params: {
        token: rootState.common.user.token,
        downloadId: rootState.route.params.id
      }
    }).then((response) => {
      commit(types.DOWNLOAD_DETAIL, {data: response.data.data, type: 'camera'})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 获取记错题下载列表 */
export const getDownloadRemember = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/remember',
      params: {
        token: rootState.common.user.token,
        subject: getSubjectId(params.subject)
      }
    }).then((response) => {
      commit(types.DOWNLOAD, {data: response.data.data, type: 'remember'})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 获取记错题试卷详情 */
export const getDownloadRememberDetail = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/remember/detail',
      params: {
        token: rootState.common.user.token,
        downloadId: rootState.route.params.id
      }
    }).then((response) => {
      commit(types.DOWNLOAD_DETAIL, {data: response.data.data, type: 'remember'})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 获取精选题下载列表 */
export const getDownloadGood = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/good',
      params: {
        token: rootState.common.user.token,
        subject: getSubjectId(params.subject)
      }
    }).then((response) => {
      commit(types.DOWNLOAD, {data: response.data.data, type: 'good'})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 试卷下载列表 */
export const getDownloadPaperHistory = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'paper',
      params: {
        token: rootState.common.user.token,
        subject: getSubjectId(params.subject)
      }
    }).then((response) => {
      commit(types.DOWNLOAD, {data: response.data.data, type: 'paper'})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 试卷搜索下载 */
export const getDownloadSearch = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'paper/search',
      params: {
        token: rootState.common.user.token,
        name: params.name,
        subject: getSubjectId(params.subject)
      }
    }).then((response) => {
      commit(types.DOWNLOAD_SEARCH_PAPER, response.data.data)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 试卷下载 */
export const getDownloadPaper = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'paper/download',
      params: {
        token: rootState.common.user.token,
        downloadId: params.downloadId
      }
    }).then((response) => {
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 获取精选题试卷详情 */
export const getDownloadGoodDetail = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/good/detail',
      params: {
        token: rootState.common.user.token,
        downloadId: rootState.route.params.id
      }
    }).then((response) => {
      commit(types.DOWNLOAD_DETAIL, {data: response.data.data, type: 'good'})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 清空下载列表 */
export const clearDownload = ({rootState, commit}, params) => {
  commit(types.DOWNLOAD_RESET, params)
}

/** 清空试卷下载列表 */
export const clearDownloadPaperSearch = ({commit}) => {
  commit(types.DOWNLOAD_SEARCH_RESET)
}

/** 试卷高度保存 */
export const setDownloadDetailScroll = ({commit}, params) => {
  commit(types.DOWNLOAD_DETAIL_SCROLL, params)
}

/** 清空试卷 */
export const clearDownloadDetail = ({rootState, commit}, params) => {
  commit(types.DOWNLOAD_DETAIL_RESET, params)
}
