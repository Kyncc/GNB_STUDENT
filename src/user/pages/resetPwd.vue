<template>
<div class='resetPwd'>
  <x-header :left-options="{showBack: true,preventGoBack: true}" @on-click-back="_back()">修改密码<a slot="right" v-touch:tap="_complete">完成</a></x-header>
  <group>
    <x-input type="password" name="oldPwd" placeholder="请输入旧密码" keyboard="text" :value.sync="oldPwd" v-ref:oldPwd :min="6" :max="18"></x-input>
    <x-input type="password" name="newPwd" placeholder="新密码6位字母或符号组合" keyboard="text" :value.sync="newPwd" v-ref:newpwd :min="6" :max="18"></x-input>
    <x-input type="password" name="repeatPwd" placeholder="请再次输入新密码" keyboard="text" :value.sync="repeatPwd" v-ref:repeatpwd :equal-with="newPwd"></x-input>
  </group>
  <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="确定放弃修改密吗" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>
</div>
</template>

<script>
import {XHeader,XInput,Group,XButton,Confirm} from 'vux'
import {fetchToken} from '../getters.js'
import {updatePwd} from '../actions.js'
import * as _ from '../../config/whole.js'
export default {
  components: {
    XHeader,
    XInput,
    Group,
    XButton,
    Confirm
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
      repeatPwd: '',
      show:false
    }
  },
  methods: {
      _back(){
        this.show = true
      },
      onAction(type) {
          if(type=='确认'){
              setTimeout(() => {
                 this.$router.go('/main/user')
             }, 500)
          }else{
              return
          }
      },
    _complete() {
      if (this.newPwd && this.repeatPwd && this.oldPwd) {
        if (this.oldPwd == this.newPwd) {
          _.toast("不可与旧密码一致")
        } else {
          if (this.newPwd == this.repeatPwd) {
            this.updatePwd({
              oldPwd: this.oldPwd,
              pwd: this.newPwd,
              token: this.fetchToken
            }, () => {
              _.toast("修改成功请重新登录")
              setTimeout(() => {
                this.$router.go('/')
                }, 800)
            })
          } else {
            _.toast("两次密码输入不一致")
          }
        }
      } else {
        _.toast("请填写密码")
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

<style lang="less">
.resetPwd {
    .vux-header {
        color: #fff;
        background-color: #4bb7aa;
    }
    .weui_cells {
        margin-top: 0;
    }
    .vux-no-group-title {
        margin-top: 0;
    }
    .vux-header .vux-header-right a {
        color: #fff;
    }
    .vux-header .vux-header-left,
    .vux-header .vux-header-right {
        font-size: 16px;
    }
    .vux-header .vux-header-left .vux-header-back:before {
        border-color: #fff;
    }
    .vux-header .vux-header-title,
    .vux-header h1 {
        margin-left: 88px;
    }
}
</style>
