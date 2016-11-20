import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'

/**获取章节数据 */
export const getBrush = ({ dispatch }, params, success,wrong) => {
  Api.brush({
    data: params,
    ok: response => {
       dispatch(types.BRUSH_ALL, response.data);
       success&&success();
    },
    wrong: response => {
        _.toast(response.data.msg);
        wrong&&wrong();
    }
  })
}

/**索引对应手风琴的打开关闭 */
export const changeChapter = ({ dispatch },index) => {
    dispatch(types.BRUSH_STATE_CHANGE,index);
}

/**浏览器高度 */
export const setScoll = ({ dispatch },height) => {
    dispatch(types.BRUSH_SCOLLER,height);
}

/**清除刷题型数据 */
export const clearBrush = ({ dispatch }) => {
    dispatch(types.BRUSH_CLEAR);
}

/**更换科目 */
export const setSubject = ({ dispatch }, id) => {
    dispatch(types.BRUSH_CHANGE_SUBJECT,id);
    dispatch(types.BRUSH_CLEAR);
}

