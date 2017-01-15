import Api from '../../../config/httpdispatch'
import * as _ from '../../../config/whole'
import * as types from '../mutationTypes'

/**清空列表 */
export const breakListClear = ({ dispatch }) => {
  dispatch(types.BREAK_LIST_CLEAR);
}

/**设置高度 */
export const setScoll = ({ dispatch },height) => {
  dispatch(types.BREAK_LIST_SCOLLER,height);
}


/**斩弃题动作 */
export const brushActionBack = ({ dispatch }, params, success) => {
  Api.brushActionBack({
    data: params,
    ok: response => {
      dispatch(types.BREAK_LIST_BACK, response.data);
      success&&success(response);
    },
    wrong: response => {
      _.toast(response.data.msg);
    }
  })
}

/**获取弃题列表 */
export const getBreakList = ({ dispatch }, params, success) => {
  Api.brushTypeList({
    data: params,
    ok: response => {
      dispatch(types.BREAK_LIST, response.data);
      success&&success(response);
    },
    wrong: response => {
      _.toast(response.data.msg);
    }
  })
}


