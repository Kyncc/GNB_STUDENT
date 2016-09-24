/*用户信息*/
export const fetchUserInfo = (state) => state.info
/*token*/
export const fetchToken = (state) => state.login.userInfo.token
//获取班级信息
export const fetchClassList = (state) => state.class.classList
//获取班级信息
export const fetchHistory = (state) => state.advice.adviceList
//受邀好友列表
export const fetchInviteStudentList = (state) => state.friend.inviteStudentList
//邀请码
export const fetchInviteCode = (state) => state.friend.inviteCode
//我的积分
export const fetchNumericalList = (state) => state.member.numericalList
//我的积分
export const fetchBilllList = (state) => state.member.myBillList
//会员信息
export const fetchMemberInfo = (state) => state.member.memberInfo
