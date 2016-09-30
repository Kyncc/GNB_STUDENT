import Vue from 'vue'
import Vuex from 'vuex'
import Global from './common/global'
import register from './login/modules/register'
import login from './login/modules/login'
import setPassword from './login/modules/setPassword'
import forget from './login/modules/forget'
import resetPassword from './login/modules/resetPassword'
import comment from './common/modules/comment'
import correct from './common/modules/correct'
import collectAction from './common/modules/collect'
import index from './main/modules/index'
import message from './message/modules/index'
import camera from './camera/modules/index'
import error from './error/modules/index'
import collect from './collect/modules/index'
import info from './user/modules/info'
import myClass from './user/modules/class'
import advice from './user/modules/advice.js'
import friend from './user/modules/friend.js'
import member from './user/modules/member.js'
import setting from './user/modules/setting.js'


Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Global,
    login,
    register,
    setPassword,
    forget,
    resetPassword,
    index,
    //评注
    comment,
    //纠错
    correct,
    collectAction,
    message,//互动
    info,//个人资料
    myClass,//我的班级
    advice,//反馈
    friend,//受邀好友
    member,
    setting,
    //收藏本
    collect,
    //归纳本
    error,
    //拍错题
    camera

  }
})
