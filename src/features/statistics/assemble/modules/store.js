import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'
import state from './state'

const mutations = {
  [types.STATISTICS_REMEMBER] (state, payload) {
    if (payload.data.list.length === 0) return
    state.remember.index.reset = false
    state.remember.index.list = state.remember.index.list ? state.remember.index.list.concat(payload.data.list) : payload.data.list
    state.remember.index.offset = payload.data.offset
    state.remember.count = payload.data.count
  },
  [types.STATISTICS_REMEMBER_OPTIONS] (state, payload) {
    state.remember.index.options = {
      degree: payload.degree
    }
    state.remember.index.reset = true
  },
  [types.STATISTICS_REMEMBER_ASSEMBLE] (state, data) {
    state.remember.download = data.list
    state.remember.count = data.count
  },
  [types.STATISTICS_REMEMBER_ASSEMBLE_UPDATE] (state, payload) {
    state['remember']['index']['list'][payload.index]['isAssembly'] = payload.data.isAssembly
    payload.data.isAssembly ? ++state.remember.count : --state.remember.count
  },
  [types.STATISTICS_CAMERA] (state, payload) {
    if (payload.data.list.length === 0) return
    state.camera.index.reset = false
    state.camera.index.list = state.camera.index.list ? state.camera.index.list.concat(payload.data.list) : payload.data.list
    state.camera.index.offset = payload.data.offset
    state.camera.count = payload.data.count
  },
  [types.STATISTICS_CAMERA_ASSEMBLE] (state, data) {
    state.camera.download = data.list
    state.camera.count = data.count
  },
  [types.STATISTICS_CAMERA_ASSEMBLE_UPDATE] (state, payload) {
    state['camera']['index']['list'][payload.index]['isAssembly'] = payload.data.isAssembly
    payload.data.isAssembly ? ++state.camera.count : --state.camera.count
  },
  [types.STATISTICS_GOOD] (state, payload) {
    if (payload.data.list.length === 0) return
    state.good.index.list = state.good.index.list ? state.good.index.list.concat(payload.data.list) : payload.data.list
    state.good.index.offset = payload.data.offset
    state.good.index.reset = false
    state.good.count = payload.data.count
  },
  [types.STATISTICS_GOOD_OPTIONS] (state, payload) {
    state.good.index.options = {
      degree: payload.degree,
      type: payload.type
    }
    state.good.index.reset = false
  },
  [types.STATISTICS_GOOD_ASSEMBLE] (state, data) {
    state.good.download = data.list
    state.good.count = data.count
  },
  [types.STATISTICS_GOOD_ASSEMBLE_UPDATE] (state, payload) {
    state['good']['index']['list'][payload.index]['isAssembly'] = payload.data.isAssembly
    payload.data.isAssembly ? ++state.good.count : --state.good.count
  },
  [types.STATISTICS_GOOD_ASSEMBLE_ORDER] (state, payload) {
    let arr = state.good.index.download.block[payload.pindex].list
    arr[payload.index] = (payload.type === 'up' ? arr.splice((payload.index - 1), 1, arr[payload.index])[0] : arr[payload.index] = arr.splice((payload.index + 1), 1, arr[payload.index])[0])
  },
  [types.STATISTICS_SCROLL] (state, payload) {
    state[payload.type]['index']['scroll'] = payload.height
  },
  [types.STATISTICS_ASSEMBLE_DOWNLOAD_RESET] (state, payload) {
    switch (payload.type) {
      case 'camera' : { state.camera.download = []; state.camera.index.reset = false; break }
      case 'remember' : { state.remember.download = []; state.remember.index.reset = false; break }
      case 'good' : { state.good.download = []; state.good.index.reset = false; break }
    }
  },
  [types.STATISTICS_ASSEMBLE_RESET] (state, payload) {
    switch (payload.type) {
      case 'camera' : {
        state.camera = { index: { list: [], scroll: 0, offset: '', reset: true }, download: [], count: 0 }; break
      }
      case 'remember' : {
        state.remember = { index: { options: { degree: 0 }, scroll: 0, list: [], offset: '', reset: true }, download: [], count: 0 }; break
      }
      case 'good' : {
        state.good = { index: { options: { type: 0, degree: 0 }, scroll: 0, list: [], offset: '', reset: true }, download: [], count: 0 }; break
      }
    }
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
