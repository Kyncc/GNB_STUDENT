/*token*/
export const fetchToken = (state) => state.userInfo.token
//获取反馈信息列表
export const fetchHistory = (state) => state.user.settings.adviceList

//我的积分
export const fetchNumericalList = (state) => state.member.numericalList
//我的积分
export const fetchBilllList = (state) => state.member.myBillList
//会员信息
export const fetchMemberInfo = (state) => state.member.memberInfo
//会员信息
export const fetchVersion = (state) => state.user.settings.appVersion

/** 获取用户信息*/
export const Userinfo = (state) => state.user.userinfo
/** 获取教材信息*/
export const TextBookMathVer  = (state) => state.user.version.math
export const TextBookPhysicsVer = (state) => state.user.version.physics
/** 班级 */
export const ClassMy = (state) => state.user.class.my
export const ClassMyClassmate = (state) => state.user.class.classmate
export const ClassSearch = (state) => state.user.class.searchClass
/** 教材 */
export const AllTextbook = (state) => state.user.textbook.all
export const MyTextbook = (state) => state.user.textbook.my
export const textBookSubjectId = (state) => state.user.textbook.subjectId
/** 习题册 */
export const AllWorkbook = (state) => state.user.workbook.all
export const MyWorkbook = (state) => state.user.workbook.my
export const workbookSubjectId = (state) => state.user.workbook.subjectId
/** 邀请 */
export const inviteCode = (state) => state.user.invite.code
export const inviteStatus = (state) => state.user.invite.status
export const inviteStudentList = (state) => state.user.invite.list

