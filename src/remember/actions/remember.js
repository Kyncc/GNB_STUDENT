import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'

/**我的习题册 */
export const getWorkbook = ({ dispatch }, params,success,wrong) => {
  Api.workbook({
    data: params,
    ok: response => {
      dispatch(types.REMEMBER_WORKBOOK_GET, response.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

/**更换科目 */
export const setSubject = ({ dispatch }, id) => {
    dispatch(types.REMEMBER_SUBJECT_CHANGE,id);
}
