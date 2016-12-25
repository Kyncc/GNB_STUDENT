import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'


export const getInteractIndex = ({ dispatch }, params,scuess) => {
  Api.msg({
      data:params,
      ok:response=>{
        dispatch(types.GET_INTERACT_HOME_SUCCESS,response.data);
        scuess&&scuess();
      },
      wrong:response=>{
        dispatch(types.GET_INTERACT_HOME_ERROR,response.data);
        _.toast('获取信息失败');
      }
  })
}

export const getInteractSystem = ({ dispatch },params,scuess) => {
  Api.msgSystem({
      data:params,
      ok:response=>{
        dispatch(types.GET_INTERACT_SYSTEM_SUCCESS,response.data);
        scuess();
      },
      wrong:response=>{
        dispatch(types.GET_INTERACT_SYSTEM_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

export const getInteractClass = ({ dispatch }, params,success) => {
  Api.msgClass({
      data:params,
      ok:response=>{
        dispatch(types.GET_INTERACT_CLASS_SUCCESS,response.data);
        success();
      },
      wrong:response=>{
        dispatch(types.GET_INTERACT_CLASS_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

export const getInteractCorrect = ({ dispatch }, params,success) => {
  Api.msgCorrect({
      data:params,
      ok:response=>{
        dispatch(types.GET_INTERACT_CORRECT_SUCCESS,response.data);
        success();
      },
      wrong:response=>{
        dispatch(types.GET_INTERACT_CORRECT_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}