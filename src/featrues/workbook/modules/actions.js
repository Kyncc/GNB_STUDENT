import axios from 'config/http'
import * as types from './mutationTypes'
import * as _ from 'config/whole'

/**我的习题册 */
export const getWorkbook = ({ rootState,commit,state },params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'workbook',
      params: {
        "token":rootState.login.token,
        "subjectId":state.subjectId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_GET,response.data.data);
      resolve(response);
    })
  })
}

/**全部习题册 */
export const getWorkbookAll = ({ rootState,commit,state },params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'workbook/list',
      params: {
        "token":rootState.login.token,
        "subjectId":state.subjectId,
        "workbookName":params.workbookName,
        "textbookId":params.textbookId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_ALL,response.data.data);
      resolve(response);
    })
  })
}

/**更换科目 */
export const setWorkBookSubject = ({ commit }, id) => {
  commit(types.WORKBOOK_SUBJECT_CHANGE,id);
}

/**全部练习册数据清空 */
export const workbookAllClear = ({ commit }) => {
  commit(types.WORKBOOK_ALL_CLEAR);
}

/**删除习题册 */
export const delWorkbook = ({ rootState,commit },params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'post',
      url: 'workbook/del',
      params: {
        "token":rootState.login.token,
        "workbookId":params.id,
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_RELOAD);
      resolve(response);
    })
  })
}

/**增加习题册 */
export const addWorkbook = ({ rootState,commit },params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'post',
      url: 'workbook/add',
      data: {
        "token":rootState.login.token,
        "workbookId":params.id,
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_RELOAD);
      resolve(response);
    })
  })
}