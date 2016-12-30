import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'

/**习题册获取页码 */
export const getWorkbookPage = ({ dispatch }, params,success,wrong) => {
  Api.rememberCharpter({
    data: params,
    ok: response => {
      dispatch(types.REMEMBER_PAGE_GET, response.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}
/**页码设置高度 */
export const setScoll = ({ dispatch }, height) => {
    dispatch(types.REMEMBER_PAGE_SCROLL,height);
}

/**习题册页码数据清空 */
export const delPage = ({ dispatch }) => {
  dispatch(types.REMEMBER_PAGE_CLEAR);
}

