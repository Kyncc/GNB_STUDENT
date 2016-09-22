/*用户信息*/
export const fetchUserInfo = (state) => state.info
/*token*/
export const fetchToken = (state) => state.login.userInfo.token
//获取班级信息
export const fetchClassList = (state) => state.class.classList
//获取班级信息
export const fetchHistory = (state) => state.advice.adviceList
