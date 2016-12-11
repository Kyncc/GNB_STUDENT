import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'


/**设置高度 */
export const setScoll = ({ dispatch },height) => {
  dispatch(types.BRUSH_TYPE_LIST_SCOLLER,height);
}

/**获取列表数据 */
export const getBushTypeList = ({ dispatch }, params,success) => {
  Api.brushTypeList({
      data:params,
      ok:response=>{
          dispatch(types.BRUSH_TYPE_LIST,response.data);
          success&&success(response);
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

/**切换列表类型（放弃或者斩题） */
export const changeType = ({ dispatch }, type) => {
  dispatch(types.BRUSH_TYPE_CHANGE,type);
}
