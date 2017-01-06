/*用户登陆*/
export const userInfo = (state) => state.userInfo
/*手机号注册*/
export const registerMessageCode = (state) => state.register.code
export const registerMobile = (state) => state.register.mobile
export const registerTeacher = (state) => state.register.isTeacher
/** 获取教材信息*/
export const TextBookMathVer  = (state) => state.register.version.math
export const TextBookPhysicsVer = (state) => state.register.version.physics
/*手机号重置*/
export const forgetMessageCode = (state) => state.forget.code
export const forgetMobile = (state) => state.forget.mobile


