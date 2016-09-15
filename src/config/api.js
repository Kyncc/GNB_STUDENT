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
  //获取用户信息
  getUserInfo: `${API_ENV}${API_VERSION}/student/user/getUserInfo`,
}
