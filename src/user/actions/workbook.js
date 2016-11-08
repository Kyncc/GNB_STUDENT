import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'

/**我的习题册 */
export const getWorkbook = ({ dispatch }, params,success,wrong) => {
  Api.workbook({
    data: params,
    ok: response => {
      dispatch(types.WORKBOOK_GET, response.data.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

/**全部习题册 */
export const getWorkbookAll = ({ dispatch }, params,success,wrong) => {
  Api.workbookList({
    data: params,
    ok: response => {
      dispatch(types.WORKBOOK_GET_ALL, response.data.data);
       success&&success();
    },
    wrong: response => {
       wrong&&wrong();
        _.toast(response.data.msg);
    }
  })
}

/**删除习题册 */
export const delWorkbook = ({ dispatch }, params,success,wrong) => {
  Api.workbookDel({
    data: params,
    ok: response => {
      dispatch(types.WORKBOOK_DEL, response.data.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

/**增加习题册 */
export const addWorkbook = ({ dispatch }, params,success,wrong) => {
  Api.workbookAdd({
    data: params,
    ok: response => {
      dispatch(types.WORKBOOK_ADD);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

/**搜索习题册 */
export const searchWorkbook = ({ dispatch }, params,success,wrong) => {
  Api.workbookSearch({
    data: params,
    ok: response => {
      dispatch(types.WORKBOOK_GET_SEARCH);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}