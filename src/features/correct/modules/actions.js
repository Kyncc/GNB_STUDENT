import Vue from 'vue'
import axios from '@/components/axios/'

/** 纠错 */
export const postCorrect = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'correct',
      data: {
        token: rootState.common.user.token,
        id: rootState.route.params.id,
        content: params.content,
        type: params.type
      }
    })
      .then((response) => {
        Vue.$vux.toast.show({ text: '纠错成功', type: 'text', time: 1500, position: 'bottom' })
        resolve(response)
      })
  })
}
