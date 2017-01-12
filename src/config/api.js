// api env
const mock = 'http://rap.taobao.org/rap.plugin.js?projectId=6273';
const server = 'http://www.guinaben.com:8070';
const version = '/v1';

// http dispatch code
export const OK_CODE = 200;
export const UNAUTHORIZED_CODE = 401;

//change api
export const API_ENV = `${server}`;
export const API_VERSION = `${version}`;

export const API_PATHS = {
  //登陆
  token:`${API_ENV}/v2/student/user/getToken`,
  /** 注册模块
   *  resgisterCode:注册验证码
   *  addPwd:新增密码
   *  addInfo:新增人员信息
   */
  resgisterCode: `${API_ENV}/v2/student/register/code`,
  addInfo: `${API_ENV}/v2/student/user/addUserInfo`,
  textbookVersion: `${API_ENV}${API_VERSION}/student/edition/byGrade`,
  addPwd: `${API_ENV}/v2/student/pwd/add`,
   /** 重置模块
   *  resetPwd:重置验证码
   *  addInfo:新增人员信息
   */
  resetCode: `${API_ENV}/v2/student/pwd/reset`,
  resetPwd: `${API_ENV}/v2/student/pwd/update`,
  //首页
  index: `${API_ENV}${API_VERSION}/student/index`,
  //收藏事件
  collectAdd: `${API_ENV}${API_VERSION}/student/collect/add`,
  collectRemove: `${API_ENV}${API_VERSION}/student/collect/remove`,
  //纠错
  correct: `${API_ENV}${API_VERSION}/student/correct`,
  //评注
  comment: `${API_ENV}${API_VERSION}/student/comment`,
  //习题获取
  exerciseList: `${API_ENV}${API_VERSION}/student/exerciseList`,
  //拍错题获取
  cameraList: `${API_ENV}${API_VERSION}/student/cameraList`,
  /**收藏题模块
   * collectExampleIds：获取收藏练习题ID
   * collectCameraIds：获取收藏拍错题ID
   */
  collectExampleIds: `${API_ENV}${API_VERSION}/student/collect/example`,
  collectCameraIds: `${API_ENV}${API_VERSION}/student/collect/camera`,
   /**拍错题模块
   *  camera:拍错题搜索
   *  cameraImportant:拍错题设为例题
   *  cameraSearch:拍错题匹配
   *  cameraHistory:拍错题记录
   *  cameraRemove:例题删除
   */
   camera:`${API_ENV}${API_VERSION}/student/camera`,
   cameraImportant:`${API_ENV}${API_VERSION}/student/camera/important`,
   cameraMatch:`${API_ENV}${API_VERSION}/student/camera/match`,
   cameraHistory:`${API_ENV}${API_VERSION}/student/camera/list`,
   cameraRemove:`${API_ENV}${API_VERSION}/student/camera/remove`,
   /**归纳本模块
   *  error:归纳本首页获取数据
   *  errorList:归纳本错题列表
   *  errorMore:归纳本首更多习题
   *  errorRecommend:归纳本推荐习题
   */
   error:`${API_ENV}${API_VERSION}/student/error`,
   errorList:`${API_ENV}${API_VERSION}/student/error/list`,
   errorMore:`${API_ENV}${API_VERSION}/student/error/more`,
   errorRecommend:`${API_ENV}${API_VERSION}/student/error/recommend`,
   errorRecommendPost:`${API_ENV}${API_VERSION}/student/error/recommendPost`,
   /**成绩报告单
   *  reportDetail:教材详细
   *  reportChapter:教材章节列表
   */
    reportChapter:`${API_ENV}${API_VERSION}/student/report`,
    reportDetail:`${API_ENV}${API_VERSION}/student/report/detail`,
  /**题型汇总
   *  brush:首页
   *  brushList:章节刷题
   *  brushAction:斩题放弃
   * brushTypeList:斩题或放弃列表
   */
    brush:`${API_ENV}${API_VERSION}/student/summary`,
    brushList:`${API_ENV}${API_VERSION}/student/summary/list-exercises`,
    brushAction:`${API_ENV}${API_VERSION}/student/summary/loose-win-exercise`,
    brushTypeList:`${API_ENV}${API_VERSION}/student/summary/list-loose-win-exercise`,
   /**记错题
   *  rememberChapter:记错题章节列表
   */
   rememberChapter:`${API_ENV}${API_VERSION}/student/remember/chapter`,
   rememberDetail:`${API_ENV}${API_VERSION}/student/remember/exercises`,
   rememberDetailPost:`${API_ENV}${API_VERSION}/student/remember/submit`,
   rememberExample: `${API_ENV}${API_VERSION}/student/exerciseList`,
   /**互动模块
   * msgSystem:系统消息
   * msgClass:班级消息
   * msgCorrect:纠错消息
   */
  msg:`${API_ENV}${API_VERSION}/student/message`,
  msgSystem:`${API_ENV}${API_VERSION}/student/message/system`,
  msgClass:`${API_ENV}${API_VERSION}/student/message/class`,
  msgCorrect:`${API_ENV}${API_VERSION}/student/message/correct`,
  //获取用户信息
  userInfo: `${API_ENV}/v2/student/user/getUserInfo`,
  userInfoUpdate: `${API_ENV}${API_VERSION}/student/user/updateUserInfo`,
  userInfoTextbookVersion: `${API_ENV}${API_VERSION}/student/edition/byGrade`,
  /**我的班级
   * myClassList:获取班级列表
   * myClassmateList:班级成员名单
   * myClassInto:加入班级
   * myClassSearch:搜索班级
   */
  myClassList: `${API_ENV}${API_VERSION}/student/class/myClassList`,
  myClassmateList: `${API_ENV}${API_VERSION}/student/class/myClassmateList`,
  myClassInto: `${API_ENV}${API_VERSION}/student/class/intoClass`,
  myClassSearch: `${API_ENV}${API_VERSION}/student/class/bindClass`,
  //我的教材
  userTextbook: `${API_ENV}${API_VERSION}/student/textbook`,
  userTextbookAll: `${API_ENV}${API_VERSION}/student/textbook/list`,
  userTextbookAdd: `${API_ENV}${API_VERSION}/student/textbook/add`,
  userTextbookDel: `${API_ENV}${API_VERSION}/student/textbook/del`,
  //习题册
  userWorkbook: `${API_ENV}${API_VERSION}/student/workbook`,
  userWorkbookAll: `${API_ENV}${API_VERSION}/student/workbook/list`,
  userWorkbookAdd: `${API_ENV}${API_VERSION}/student/workbook/add`,
  userWorkbookDel: `${API_ENV}${API_VERSION}/student/workbook/del`,
  userWorkbookSearch: `${API_ENV}${API_VERSION}/student/workbook/search`,
  //编辑用户信息
  updateUserInfo: `${API_ENV}${API_VERSION}/student/user/updateUserInfo`,
  //修改密码
  updatePwd: `${API_ENV}${API_VERSION}/student/user/updatePwd`,
  //反馈
  advice: `${API_ENV}${API_VERSION}/student/user/advice`,
  //反馈历史
  adviceHistory: `${API_ENV}${API_VERSION}/student/user/adviceHistory`,
  //受邀同学
  getInviteStudentList: `${API_ENV}${API_VERSION}/student/user/invite/getInviteStudentList`,
  //绑定邀请码
  bindInviteCode: `${API_ENV}${API_VERSION}/student/user/invite/bindInviteCode`,
  //获取邀请码
  getInviteCode: `${API_ENV}${API_VERSION}/student/user/invite/getInviteCode`,
  //积分账单
  numerical: `${API_ENV}${API_VERSION}/student/member/numerical/history`,
  //我的账单
  payList: `${API_ENV}${API_VERSION}/student/member/payList`,
  //会员信息
  member: `${API_ENV}${API_VERSION}/student/member`,
  //退出
  quitToken: `${API_ENV}${API_VERSION}/student/quitToken`,
  //检查版本
  updateVersion: `${API_ENV}${API_VERSION}/student/updateVersion`,
  //编辑头像
  headImg: `${API_ENV}${API_VERSION}/student/user/headImg`,
}
