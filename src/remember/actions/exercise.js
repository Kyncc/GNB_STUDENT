import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'


/**获取章节练习题 */
export const rememberExerciseGet = ({ dispatch }, params,success,wrong) => {
  Api.rememberExercise({
    data: params,
    ok: response => {
      dispatch(types.REMEMBER_EXERCISE, response.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

/**提交章节练习题 */
export const rememberExercisePost = ({ dispatch }, params,success,wrong) => {
  _.busy();
  Api.rememberExercisePost({
    data: params,
    ok: response => {
      dispatch(types.REMEMBER_CHAPTER_CLEAR);
      _.leave();
      _.toast('提交成功');
      success&&success();
    },
    wrong: response => {
      _.leave();
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

/**章节练习题数据清空 */
export const rememberExerciseClear = ({ dispatch }) => {
  dispatch(types.REMEMBER_EXERCISE_CLEAR);
}

/**章节练习题答案变更 */
export const rememberExAnswerChange = ({ dispatch },pid,id) => {
  dispatch(types.REMEMBER_EXERCISE_CHANGE,pid,id);
}