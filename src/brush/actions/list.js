import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'

/**清空列表 */
export const brushListClear = ({ dispatch }) => {
  dispatch(types.BRUSH_LIST_CLEAR);
}

/**设置高度 */
export const setScoll = ({ dispatch },height) => {
  dispatch(types.BRUSH_LIST_SCOLLER,height);
}

/**获取列表数据 */
export const getBushList = ({ dispatch }, params,success) => {
  Api.brushList({
      data:params,
      ok:response=>{
          dispatch(types.BRUSH_LIST,response.data);
          success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

/**刷题型动作 */
export const bushListAction = ({ dispatch },params,success,index) => {
    _.busy();
    Api.brushAction({
      data:params,
      ok:response=>{
          dispatch(types.BRUSH_LIST_ACTION,index);
          success&&success();
          _.leave();
      },
      wrong:response=>{
          _.toast(response.data.msg);
          _.leave();
      }
  })
}