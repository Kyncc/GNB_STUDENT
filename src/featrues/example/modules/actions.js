import axios from 'config/http'
import * as types from './mutationTypes'
import * as _ from 'config/whole'

/**获取例题信息 */
export const getExample = ({ rootState,commit }) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'exerciseList',
      params: {
        "ids":[rootState.route.params.id],
        "subject_id":rootState.route.params.subjectId,
        "token":rootState.login.token,
      }
    })
    .then((response) => {
      commit(types.EXAMPLE,response.data.data);
      resolve(response);
    })
  })
}

/**取消例题收藏 */
export const collectRemove = ({ rootState,commit }) => {
   return new Promise((resolve, reject)=> { 
      axios({
        method:'post',
        url: 'collect/remove',
        data: {
          "options":{
            "id":rootState.route.params.id,
            "subject_id":rootState.route.params.subjectId
          },
          "token":rootState.login.token,
          "type":'example'
        }
      })
      .then((response) => {
         _.toast('取消收藏成功');
        commit(types.COLLECT_REMOVE);
        resolve(response);
      })
  })
}

/**例题收藏 */
export const collectAdd = ({ rootState,commit }) => {
   return new Promise((resolve, reject)=> { 
      axios({
        method:'post',
        url: 'collect/add',
        data: {
          "options":{
            "id":rootState.route.params.id,
            "subject_id":rootState.route.params.subjectId
          },
          "token":rootState.login.token,
          "type":'example'
        }
      })
      .then((response) => {
        _.toast('收藏成功');
        commit(types.COLLECT_ADD);
        resolve(response);
      })
  })
}

/**清空例题 */
export const exampleClear = ({ commit }) => {
  commit(types.EXAMPLE_CLEAR);
}



