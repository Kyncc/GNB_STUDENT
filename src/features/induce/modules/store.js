import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'
import state from './state'

const mutations = {
  [types.INDUCE] (state, payload) {
    state['index'][payload.subject]['list'] = payload.data
  },
  [types.INDUCE_CLEAR] (state, payload) {
    state['index'][payload.subject]['list'] = []
    state['index'][payload.subject]['scroll'] = 0
  },
  [types.INDUCE_SCROLL] (state, payload) {
    state['index'][payload.subject]['scroll'] = payload.height
  },
  [types.INDUCE_LIST] (state, payload) {
    if (state['exercise'][payload.type]['list']) {
      state['exercise'][payload.type]['list'] = state['exercise'][payload.type]['list'].concat(payload.data.list)
    } else {
      state['exercise'][payload.type]['list'] = payload.data.list
    }
    state['exercise'][payload.type]['currentChapterId'] = payload.data.currentChapterId
    state['exercise'][payload.type]['currentExercisesId'] = payload.data.currentExercisesId
    state['exercise'][payload.type]['totalCount'] = payload.data.totalCount
    state['exercise'][payload.type]['recordSize'] = payload.data.recordSize
    state['exercise'][payload.type]['isReset'] = false
  },
  [types.INDUCE_LIST_CLEAR] (state, payload) {
    state['exercise'][payload.type]['isReset'] = true
    state['exercise'][payload.type]['list'] = []
    state['exercise'][payload.type]['scroll'] = 0
    state['exercise'][payload.type]['totalCount'] = 0
    state['exercise'][payload.type]['recordSize'] = 0
    state['exercise'][payload.type]['currentChapterId'] = ''
    state['exercise'][payload.type]['currentExercisesId'] = ''
  },
  [types.INDUCE_LIST_SCROLL] (state, payload) {
    state['exercise'][payload.type]['scroll'] = payload.height
  },
  [types.INDUCE_ACTION] (state, index) {
    state.exercise.total.recordSize = --state.exercise.total.recordSize
    state.exercise.total.list.splice(index, 1)
  },
  [types.INDUCE_BACK] (state, payload) {
    state['exercise'][payload.type]['recordSize'] = --state['exercise'][payload.type]['recordSize']
    state['exercise'][payload.type]['list'].splice(payload.index, 1)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
