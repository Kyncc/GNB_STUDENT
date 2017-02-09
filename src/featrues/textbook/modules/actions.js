import axios from 'config/http'
import * as types from './mutationTypes'
import * as _ from 'config/whole'

/**我的习题册 */
export const getTextbook = ({ rootState,commit,state },params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'textbook',
      params: {
        "token":rootState.login.token,
        "subjectId":state.subjectId
      }
    })
    .then((response) => {
      commit(types.TEXTBOOK_GET,response.data.data);
      resolve(response);
    })
  })
}

/**全部习题册 */
export const getTextbookAll = ({ rootState,commit,state }) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'textbook/list',
      params: {
        "token":rootState.login.token,
        "subjectId":state.subjectId
      }
    })
    .then((response) => {
      commit(types.TEXTBOOK_ALL,response.data.data);
      resolve(response);
    })
  })
}

/**更换科目 */
export const setTextbookSubject = ({ commit }, id) => {
  commit(types.TEXTBOOK_SUBJECT_CHANGE,id);
}

/**全部练习册数据清空 */
export const textbookAllClear = ({ commit }) => {
  commit(types.TEXTBOOK_ALL_CLEAR);
}

/**删除习题册 */
export const delTextbook = ({ rootState,commit },params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'post',
      url: 'textbook/del',
      params: {
        "token":rootState.login.token,
        "textbookId":params.id,
      }
    })
    .then((response) => {
      commit(types.TEXTBOOK_RELOAD);
      resolve(response);
    })
  })
}

/**增加习题册 */
export const addTextbook = ({ rootState,commit,dispatch },params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'post',
      url: 'textbook/add',
      params: {
        "token":rootState.login.token,
        "textbookId":params.textbookId,
      }
    })
    .then((response) => {
      commit(types.TEXTBOOK_RELOAD);
      dispatch("getUserInfo");
      resolve(response);
    })
  })
}