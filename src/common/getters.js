export const toastMsg = (state) => state.Global.toastMsg
export const toastShow = (state) => state.Global.toastShow
export const isLoading = (state) => state.Global.isLoading
export const system = (state) => state.Global.system

/** 路由提取*/
export const id = (state) => state.route.params.id
export const knowledgeId = (state) => state.route.params.knowledgeId
export const chapterId = (state) => state.route.params.chapterId
export const cameraId = (state) => state.route.params.cameraId
export const path = (state) => state.route.path

/**用户信息提取*/
export const token = (state) => state.login.token
export const userName = (state) => state.userinfo.name
export const userMobile = (state) => state.userinfo.mobile
export const userHeadImg = (state) => state.userinfo.headImg
export const userSubject = (state) => state.userinfo.subject
export const userTextbook = (state) => state.userinfo.textbook
export const userSubjectList = (state) => state.userinfo.subjectType
