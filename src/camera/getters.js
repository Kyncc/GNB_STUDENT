export const cameraHistoryIds  = (state) => state.camera.history.ids
export const cameraHistoryList  = (state) => state.camera.history.list
export const cameraHistoryCurrentPage  = (state) => state.camera.history.currentPage
export const cameraHistoryTotalPage  = (state) => state.camera.history.totalPage
export const cameraHistorySubjectId  = (state) => state.camera.subjectId
/** 获取例题*/
export const cameraExample  = (state) => state.camera.example
export const exampleId  = (state) => state.route.params.exampleId
export const cameraId  = (state) => state.route.params.cameraId
//搜题结果
export const cameraResultIds  = (state) => state.camera.result.ids
export const cameraResultId  = (state) => state.camera.result.id
export const cameraResultList  = (state) => state.camera.result.list

export const fetchCameraImg  = (state) => state.camera.cameraImg
