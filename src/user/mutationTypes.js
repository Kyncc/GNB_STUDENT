/** 获取用户信息 */
export const USERINFO_GET = 'USERINFO_GET'
/** 获得教材 */
export const USERINFO_TEXTBOOKVERSION = 'USERINFO_TEXTBOOKVERSION'
/**我的班级
 * GET_CLASS_LIST:获取班级列表
 * classmGET_CLASSMATE_LISTate:班级成员名单
 * POST_INTO_CLASS:加入班级
 * GET_CLASS_BYCODE:根据代码搜索班级
 */
export const GET_CLASS_LIST = 'GET_CLASS_LIST'
export const GET_CLASSMATE_LIST = 'GET_CLASSMATE_LIST'
export const POST_INTO_CLASS = 'POST_INTO_CLASS'
export const GET_CLASS_BYCODE = 'GET_CLASS_BYCODE'

/** 获取全部教材 */
export const TEXTBOOK_GET_ALL = 'TEXTBOOK_GET_ALL'
/** 获取我的教材 */
export const TEXTBOOK_GET = 'TEXTBOOK_GET'
/** 删除教材*/
export const TEXTBOOK_DEL = 'TEXTBOOK_DEL'
/** 增加教材 */
export const TEXTBOOK_ADD = 'TEXTBOOK_ADD'
/** 更改教材科目 */
export const TEXTBOOK_SUBJECT_CHANGE = 'TEXTBOOK_SUBJECT_CHANGE'
/** 教材数据更新 */
export const TEXTBOOK_RELOAD = 'TEXTBOOK_RELOAD'

/** 获取全部习题册 */
export const WORKBOOK_GET_ALL = 'WORKBOOK_GET_ALL'
/** 获取我的习题册 */
export const WORKBOOK_GET = 'WORKBOOK_GET'
/** 删除习题册 */
export const WORKBOOK_DEL = 'WORKBOOK_DEL'
/** 增加习题册 */
export const WORKBOOK_ADD = 'WORKBOOK_ADD'
/** 习题册数据更新 */
export const WORKBOOK_RELOAD = 'WORKBOOK_RELOAD'
/** 习题册更改教材科目 */
export const WORKBOOK_SUBJECT_CHANGE = 'WORKBOOK_SUBJECT_CHANGE'



//反馈历史
export const GET_ADVICE_LIST = 'GET_ADVICE_LIST'
//受邀好友列表
export const GET_INVITE_STUDENT_LIST = 'GET_INVITE_STUDENT_LIST'
//邀请码
export const GET_INVITE_CODE = 'GET_INVITE_CODE'
//我的积分
export const GET_NUMERICAL_LIST= 'GET_NUMERICAL_LIST'
//我的账单
export const GET_BILL_LIST= 'GET_BILL_LIST'
//会员信息
export const GET_MEMBER_INFO= 'GET_MEMBER_INFO'
//版本信息
export const GET_VERSION = 'GET_VERSION'
