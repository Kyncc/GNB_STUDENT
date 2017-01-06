import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'

/** 用户登陆*/
export const login = ({ dispatch }, params,success,wrong) => {
  _.busy();
  Api.login({
      data:params,
      ok:response=>{
        // console.log(response.data);
        dispatch(types.LOGIN,response.data);
        _.leave();
        success&&success();
      },
      wrong:response=>{
        wrong&&wrong();
        _.leave();
        _.toast(response.data.msg);
      }
  })
}