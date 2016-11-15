import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'


/**获取全部练习册 */
export const workbookAll = ({ dispatch }, params,success,wrong) => {
  Api.workbookList({
    data: params,
    ok: response => {
      dispatch(types.REMEMBER_WORKBOOK_ALL, response.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

/**增加全部练习册 */
export const workbookAdd = ({ dispatch }, params,success,wrong) => {
  Api.workbookAdd({
    data: params,
    ok: response => {
      dispatch(types.REMEMBER_WORKBOOK_ADD, response.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

/**全部练习册数据清空 */
export const WorkbookAllDel = ({ dispatch }) => {
  dispatch(types.REMEMBER_WORKBOOK_ALL_CLEAR);
}


