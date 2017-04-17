/** 获取数学章节数据 */
export const induceMath = (state) => state.index.math
/** 获取物理章节数据 */
export const inducePhysics = (state) => state.index.physics
/** 获取题型本 */
export const induceTotal = (state) => state.exercise.total
/** 获取练习 */
export const inducePractice = (state) => state.exercise.practice
/** 获取斩题本 */
export const induceBreak = (state) => state.exercise.break
/** 获取弃题本 */
export const inducePass = (state) => state.exercise.pass
