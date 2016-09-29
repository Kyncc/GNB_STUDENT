import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'


export const getMessageIndex = ({ dispatch }, params,scuess) => {
  Api.msg({
      data:params,
      ok:response=>{
        dispatch(types.GET_MESSAGE_HOME_SUCCESS,response.data);
        scuess&&scuess();
      },
      wrong:response=>{
        dispatch(types.GET_MESSAGE_HOME_ERROR,response.data);
        _.toast('获取信息失败');
      }
  })
}

export const getMessageSystem = ({ dispatch },params,scuess) => {
  Api.msgSystem({
      data:params,
      ok:response=>{
        dispatch(types.GET_MESSAGE_SYSTEM_SUCCESS,response.data);
        scuess();
      },
      wrong:response=>{
        dispatch(types.GET_MESSAGE_SYSTEM_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

export const getMessageClass = ({ dispatch }, params,success) => {
  Api.msgClass({
      data:params,
      ok:response=>{
        dispatch(types.GET_MESSAGE_CLASS_SUCCESS,response.data);
        success();
      },
      wrong:response=>{
        dispatch(types.GET_MESSAGE_CLASS_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

export const getMessageCorrect = ({ dispatch }, params,success) => {
  Api.msgCorrect({
      data:params,
      ok:response=>{
        dispatch(types.GET_MESSAGE_CORRECT_SUCCESS,response.data);
        success();
      },
      wrong:response=>{
        dispatch(types.GET_MESSAGE_CORRECT_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}