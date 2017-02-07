import store from '../store'

/** 
*   页面正在请求
*/
export function busy(){
    store.dispatch('isLoading', true);
}

/** 
*   页面请求结束
*/
export function leave(){
    store.dispatch('isLoading', false);
}

/** 
*   Toast公共方法
*/
export function toast(str){
    store.dispatch('toastShow', true); 
    store.dispatch('toastMsg',str);
    setTimeout(()=>{
        store.dispatch('toastShow', false); 
    },1500); 
}