import Api from '../../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../../config/whole'

export const getInteractIndex = ({ dispatch }, params,scuess) => {
  Api.msg({
    data:params,
    ok:response=>{
      dispatch(types.INTERACT_HOME,response.data);
      scuess&&scuess();
    },
    wrong:response=>{
      _.toast('获取信息失败');
    }
  })
}