// api env
const mock = 'http://rap.taobao.org/rap.plugin.js?projectId=6273';
const server = 'http://122.114.55.74:8070';
const version = '/v1';

// http dispatch code
export const OK_CODE = 200;
export const UNAUTHORIZED_CODE = 401;

//change api
export const API_ENV = `${server}`;
export const API_VERSION = `${version}`;

// api path map
export const API_PATHS = {
  //短信
  getCode: `${API_ENV}/common/getCode`,
  //登陆
  login: `${API_ENV}${API_VERSION}/student/login`,
  addPwd: `${API_ENV}${API_VERSION}/student/pwd/add`,
  resetPwd: `${API_ENV}${API_VERSION}/student/pwd/resetByMobile`,
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
  //收藏本
  collectExample: `${API_ENV}${API_VERSION}/student/collect/example`,
  collectCamera: `${API_ENV}${API_VERSION}/student/collect/camera`,
  //获取用户信息
  getUserInfo: `${API_ENV}${API_VERSION}/student/user/getUserInfo`,
  //编辑用户信息
  updateUserInfo: `${API_ENV}${API_VERSION}/student/user/updateUserInfo`,
  //获取班级列表
  myClassList: `${API_ENV}${API_VERSION}/student/class/myClassList`,
  //班级成员名单
  myClassmateList: `${API_ENV}${API_VERSION}/student/class/myClassmateList`,
  //修改密码
  updatePwd: `${API_ENV}${API_VERSION}/student/user/updatePwd`,
}
