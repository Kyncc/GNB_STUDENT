import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'


//获取搜题IDS
export const getCameraResultIds = ({ dispatch }, params,success,error) => {
  Api.camera({
      data:params,
      ok:response=>{
        dispatch(types.GET_CAMERA_RESULTIDS_SUCCESS,response.data);
        _.leave()
        success&&success();
      },
      wrong:response=>{
        dispatch(types.GET_CAMERA_RESULTIDS_ERROR,response.data);
        _.leave()
        error&&error();
        _.toast(response.data.msg);
      }
  })
}

//获取搜题LIST
export const getCameraResultList = ({ dispatch }, params,success) => {
  Api.exerciseList({
      data:params,
      ok:response=>{
          dispatch(types.GET_CAMERA_RESULTLIST_SUCCESS,response.data);
          success&&success();
      },
      wrong:response=>{
        dispatch(types.GET_CAMERA_RESULTLIST_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

//获取搜题例题
export const getCameraExample = ({ dispatch }, params,success) => {
  Api.exerciseList({
      data:params,
      ok:response=>{
          dispatch(types.GET_CAMERA_HISTORYEXAMPLEID_SUCCESS,response.data);
          success&&success();
      },
      wrong:response=>{
        dispatch(types.GET_CAMERA_HISTORYEXAMPLEID_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

//获取历史ids
export const getCameraHistoryIds = ({ dispatch }, params,success) => {
  Api.cameraHistory({
      data:params,
      ok:response=>{
          dispatch(types.GET_CAMERA_HISTORYIDS_SUCCESS,response.data);
          success(response.data.data.ids);
      },
      wrong:response=>{
        dispatch(types.GET_CAMERA_HISTORYIDS_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

//获取历史list
export const getCameraHistoryList = ({ dispatch }, params,success) => {
  Api.cameraList({
      data:params,
      ok:response=>{
          dispatch(types.GET_CAMERA_HISTORYLIST_SUCCESS,response.data);
          success&&success();
      },
      wrong:response=>{
        dispatch(types.GET_CAMERA_HISTORYLIST_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

//移除拍错题
export const delCameraHistroy = ({ dispatch },params,id,success) => {
  Api.cameraRemove({
      data:params,
      ok:response=>{
          dispatch(types.DEL_CAMERA_HISTORYID_SUCCESS,id);
          success&&success();
      },
      wrong:response=>{
        dispatch(types.DEL_CAMERA_HISTORYID_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

//清空历史题目信息
export const clearCameraHistroy = ({ dispatch }) => {
    dispatch(types.CLEAR_CAMERA_HISTORY);
}

//设置例题
export const postCameraExample = ({ dispatch }, params,success) => {
  Api.cameraImportant({
      data:params,
      ok:response=>{
          dispatch(types.POST_CAMERA_EXAMPLE_SUCCESS,response.data);
          success&&success();
      },
      wrong:response=>{
        dispatch(types.POST_CAMERA_EXAMPLE_ERROR,response.data);
        _.toast(response.data.msg);
      }
  })
}

//设置人工搜索
export const postCameraSearch = ({ dispatch }, params,success) => {
  Api.cameraMatch({
      data:params,
      ok:response=>{
          dispatch(types.POST_CAMERA_RESULTSEARCH_SUCCESS,response.data);
          success&&success()
      },
      wrong:response=>{
        dispatch(types.POST_CAMERA_RESULTSEARCH_ERROR,response.data);
        _.toast(response.data.msg)
      }
  })
}

//设置头像图片
export const setCameraImg = ({ dispatch }, params) => {
    dispatch(types.SET_CAMERA_IMG, params)
}


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
    dispatch(types.CAMERA_CHANGE_SUBJECT,id);
    // dispatch(types.CLEAR_CAMERA_HISTORY);
}

