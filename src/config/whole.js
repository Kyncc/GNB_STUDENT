import store from '../store'

/** 
*   页面正在请求
*/
export function busy(){
    store.dispatch('GET_LOADING', true);
}

/** 
*   页面请求结束
*/
export function leave(){
    store.dispatch('GET_LOADING', false);
}

/** 
*   Toast公共方法
*/
export function toast(str){
    store.dispatch('GET_TOAST_SHOW', true); 
    store.dispatch('GET_TOAST_MESSAGE',str);
    setTimeout(()=>{
        store.dispatch('GET_TOAST_SHOW', false); 
    },1500); 
}