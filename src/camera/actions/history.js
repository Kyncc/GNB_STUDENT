import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'

/**浏览器高度 */
export const setScoll = ({ dispatch },height) => {
    dispatch(types.CAMERA_SCOLLER_HEIGHT,height);
}

/**清除拍照历史数据 */
export const clearCameraHistory = ({ dispatch }) => {
    dispatch(types.CLEAR_CAMERA_HISTORY);
}

/**更换拍照科目 */
export const setSubject = ({ dispatch }, id) => {
    dispatch(types.CLEAR_CAMERA_HISTORY);
    dispatch(types.CAMERA_CHANGE_SUBJECT,id);
}

//获取搜题例题
export const getCameraExample = ({ dispatch }, params,success) => {
  Api.exerciseList({
      data:params,
      ok:response=>{
          dispatch(types.GET_CAMERA_HISTORYEXAMPLEID,response.data);
          success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

//获取历史ids
export const getCameraHistoryIds = ({ dispatch }, params,success) => {
  Api.cameraHistory({
      data:params,
      ok:response=>{
          dispatch(types.GET_CAMERA_HISTORYIDS,response.data);
           success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

//获取历史list
export const getCameraHistoryList = ({ dispatch }, params,success) => {
  Api.cameraList({
      data:params,
      ok:response=>{
          dispatch(types.GET_CAMERA_HISTORYLIST,response.data);
          success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

//移除拍错题
export const delCameraHistroy = ({ dispatch },params,id,success) => {
  _.busy();
  Api.cameraRemove({
      data:params,
      ok:response=>{
          dispatch(types.DEL_CAMERA_HISTORYID,id);
          _.leave();
          _.toast("删除成功");
          success&&success();
      },
      wrong:response=>{
        _.leave();
        _.toast(response.data.msg);
      }
  })
}
