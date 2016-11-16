import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'



/**获取例题信息 */
export const rememberExampleGet = ({ dispatch }, params,success) => {
  Api.rememberExampleGet({
      data:params,
      ok:response=>{
          dispatch(types.REMEMBER_EXEMPLE,response.data);
          success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

/**清空例题 */
export const rememberExampleClear = ({ dispatch }) => {
  dispatch(types.REMEMBER_EXEMPLE_CLEAR);
}

