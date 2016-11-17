<template>
  <div class='resetPwd'>
    <x-header :left-options="{showBack: true}">修改密码
      <a slot="right" v-touch:tap="_complete" v-show="newPwd && repeatPwd && oldPwd">完成</a>
    </x-header>
    <group>
      <x-input type="password" name="oldPwd" placeholder="请输入旧密码" keyboard="text" :value.sync="oldPwd" v-ref:oldPwd :min="6" :max="18"></x-input>
      <x-input type="password" name="newPwd" placeholder="新密码6位字母或符号组合" keyboard="text" :value.sync="newPwd" v-ref:newpwd :min="6" :max="18"></x-input>
      <x-input type="password" name="repeatPwd" placeholder="请再次输入新密码" keyboard="text" :value.sync="repeatPwd" v-ref:repeatpwd :equal-with="newPwd"></x-input>
    </group>
  </div>
</template>

<script>
import {XHeader,XInput,Group,XButton} from 'vux'
import {fetchToken} from '../getters.js'
import {updatePwd} from '../actions.js'
import * as _ from '../../config/whole.js'
import './resetPwd.less'
export default {
  components: {
    XHeader,
    XInput,
    Group,
    XButton,
    
  },
  vuex: {
    getters: {
      fetchToken
    },
    actions: {
      updatePwd
    }
  },
  data() {
    return {
      oldPwd: '',
      newPwd: '',
      repeatPwd: ''
    }
  },
  methods: {
    _complete() {
        if (this.oldPwd == this.newPwd){
          _.toast("不可与旧密码一致")
        } else {
          if (this.newPwd == this.repeatPwd){
            this.updatePwd({
              oldPwd: this.oldPwd,
              pwd: this.newPwd,
              token: this.fetchToken
            },() => {
                 _.toast('退出登陆生效');
            })
          } else {
            _.toast("两次密码输入不一致");
          }
        }
    }
  },
  computed: {
    disable() {
      return (this.$refs.oldpwd.valid && this.$refs.newpwd.valid && this.$refs.repeatpwd.valid ? false : true);
    }
  }
}
</script>
