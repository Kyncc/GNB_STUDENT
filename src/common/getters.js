export const toastMsg = (state) => state.Global.toastMsg
export const toastShow = (state) => state.Global.toastShow
export const isLoading = (state) => state.Global.isLoading
export const period_id = (state) => state.Global.period_id
export const subject_id = (state) => state.Global.subject_id
export const id = (state) => state.route.params.id
export const knowledgeId = (state) => state.route.params.knowledgeId
export const chapterId = (state) => state.route.params.chapterId
export const cameraId = (state) => state.route.params.cameraId

export const token = (state) => state.userInfo.token
export const userBalance = (state) => state.userInfo.balance
export const userHeadImg = (state) => state.userInfo.headImg
export const userIsVip = (state) => state.userInfo.isVip
export const userName = (state) => state.userInfo.name
export const userNumerical = (state) => state.userInfo.numerical
export const userSubjectList = (state) => state.userInfo.subjectType
