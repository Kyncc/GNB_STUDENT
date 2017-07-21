import Vue from 'vue'
import axios from '@/components/axios/'

const PWD_UPDATE = 'PWD_UPDATE'

const actions = {
  updatePwd: ({ rootState, commit }, params) => {
    Vue.$vux.loading.show({ text: '请稍候' })
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'pwd/update',
        data: {
          oldPwd: params.oldPwd,
          pwd: params.pwd,
          token: rootState.common.user.token
        }
      })
        .then((response) => {
          Vue.$vux.loading.hide()
          commit(PWD_UPDATE)
          resolve(response)
        })
        .catch((error) => {
          Vue.$vux.loading.hide()
          reject(error)
        })
    })
  }
}

export default {
  actions
}
