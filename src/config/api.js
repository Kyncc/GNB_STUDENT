// api env
const mock = 'http://rap.taobao.org/rap.plugin.js?projectId=6273';
const server = 'http://122.114.55.74:8070';
const yongDev = '';

// http dispatch code
export const OK_CODE = 200;
export const UNAUTHORIZED_CODE = 401;

//change api
export const API_ENV = `${server}`;

// api path map
export const API_PATHS = {
    //短信
    getCode:`${API_ENV}/common/getCode`,
    //登陆
    login:`${API_ENV}/student/login`,
    addPwd:`${API_ENV}/student/pwd/add`,
    resetPwd:`${API_ENV}/student/pwd/resetByMobile`
}