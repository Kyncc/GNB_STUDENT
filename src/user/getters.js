/*token*/
export const fetchToken = (state) => state.login.token
//我的积分
export const fetchNumericalList = (state) => state.member.numericalList
//我的积分
export const fetchBilllList = (state) => state.member.myBillList
//会员信息
export const fetchMemberInfo = (state) => state.member.memberInfo

/** 获取用户信息*/
export const Userinfo = (state) => state.user.userinfo
/** 获取教材信息*/
export const TextBookMathVer  = (state) => state.user.version.math
export const TextBookPhysicsVer = (state) => state.user.version.physics

/** 邀请 */
export const inviteCode = (state) => state.user.invite.code
export const inviteStatus = (state) => state.user.invite.status
export const inviteStudentList = (state) => state.user.invite.list

