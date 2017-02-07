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
        "studentId":rootState.route.params.studentId,
        "token":rootState.login.token,
      }
    })
    .then((response) => {
      commit(types.EXAMPLE,response.data.data);
      resolve(response);
    })
  });
}

/**清空例题 */
export const exampleClear = ({ commit }) => {
  commit(types.EXAMPLE_CLEAR);
}



