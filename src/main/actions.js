import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'


/*获取首页数据*/
export const getStudentIndex = ({ dispatch }, params) => {
  Api.index({
    data: params,
    ok: response => {
      dispatch(types.GET_STUDENT_INDEX_SUCCESS, response.data);
    },
    wrong: response => {
      dispatch(types.GET_STUDENT_INDEX_ERROR, response.data);
    }
  })
}
