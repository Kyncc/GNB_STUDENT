import Api from '../../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../../config/whole'

export const getMessageSystem = ({ dispatch },params,success) => {
  Api.msgSystem({
      data:params,
      ok:response=>{
        dispatch(types.MESSAGE_SYSTEM,response.data);
        success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

export const getMessageClass = ({ dispatch }, params,success) => {
  Api.msgClass({
      data:params,
      ok:response=>{
        dispatch(types.MESSAGE_CLASS,response.data);
        success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

export const getMessageCorrect = ({ dispatch }, params,success) => {
  Api.msgCorrect({
      data:params,
      ok:response=>{
        dispatch(types.MESSAGE_CORRECT,response.data);
        success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

export const clearMessage = ({ dispatch }) => {
  dispatch(types.MESSAGE_CLEAR);
}
