import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'


export const getMessageIndex = ({ dispatch }, params) => {
  Api.msg({
      data:params,
      ok:response=>{
        dispatch(types.GET_MESSAGE_HOME_SUCCESS,response.data);
      },
      wrong:response=>{
        dispatch(types.GET_MESSAGE_HOME_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

export const getMessageSystem = ({ dispatch }, params) => {
  Api.msgSystem({
      data:params,
      ok:response=>{
        dispatch(types.GET_MESSAGE_SETTINGS_SUCCESS,response.data);
      },
      wrong:response=>{
        dispatch(types.GET_MESSAGE_SETTINGS_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

export const getMessageClass = ({ dispatch }, params) => {
  Api.msgClass({
      data:params,
      ok:response=>{
        dispatch(types.GET_MESSAGE_CORRECT_SUCCESS,response.data);
      },
      wrong:response=>{
        dispatch(types.GET_MESSAGE_CORRECT_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

export const getMessageCorrect = ({ dispatch }, params) => {
  Api.msgCorrect({
      data:params,
      ok:response=>{
        dispatch(types.GET_MESSAGE_CLASS_SUCCESS,response.data);
      },
      wrong:response=>{
        dispatch(types.GET_MESSAGE_CLASS_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}