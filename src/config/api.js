// api env
const mock = 'http://rap.taobao.org/rap.plugin.js?projectId=6273';
const server = 'http://192.168.5.53:8081';
const localSanBao = 'http://192.168.5.53:8081';


// http dispatch code
export const OK_CODE = 200;
export const UNAUTHORIZED_CODE = 401;

//change api
export const API_ENV = `${mock}`;

// api path map
export const API_PATHS = {
    //短信
    getCode:`${API_ENV}/student/getCode`,
    // 登陆
    login:`${API_ENV}/student/login`,
    addPwd:`${API_ENV}/student/pwd/add`,
    resetPwd:`${API_ENV}/student/pwd/resetByMobile`
}