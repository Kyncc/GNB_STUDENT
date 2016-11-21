import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'

//获取搜题IDS
export const getCameraResultIds = ({ dispatch }, params,success,error) => {
  Api.camera({
      data:params,
      ok:response=>{
        dispatch(types.GET_CAMERA_RESULTIDS,response.data);
        _.leave()
        success&&success();
      },
      wrong:response=>{
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
          dispatch(types.GET_CAMERA_RESULTLIST,response.data);
          success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}




//移除拍错题
export const delCameraHistroy = ({ dispatch },params,id,success) => {
  Api.cameraRemove({
      data:params,
      ok:response=>{
          dispatch(types.DEL_CAMERA_HISTORYID,id);
          success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}


//设置例题
export const postCameraExample = ({ dispatch }, params,success) => {
  Api.cameraImportant({
      data:params,
      ok:response=>{
          dispatch(types.POST_CAMERA_EXAMPLE,response.data);
          success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

//设置人工搜索
export const postCameraSearch = ({ dispatch }, params,success) => {
  Api.cameraMatch({
      data:params,
      ok:response=>{
          dispatch(types.POST_CAMERA_RESULTSEARCH,response.data);
          success&&success()
      },
      wrong:response=>{
        _.toast(response.data.msg)
      }
  })
}

//设置头像图片
export const setCameraImg = ({ dispatch }, params) => {
    dispatch(types.SET_CAMERA_IMG, params)
}


