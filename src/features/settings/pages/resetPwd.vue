<template>
  <view-box ref="resetPwd" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '修改密码'}">
      <a slot="right" @click="_complete" v-show="newPwd && repeatPwd && oldPwd">完成</a>
    </x-header>
    <group gutter="0">
      <x-input type="password" name="oldPwd" placeholder="请输入旧密码" keyboard="text" v-model="oldPwd" ref="oldPwd" :min="6" :max="18"></x-input>
      <x-input type="password" name="newPwd" placeholder="新密码6位字母或符号组合" keyboard="text" v-model="newPwd" ref="newpwd" :min="6" :max="18"></x-input>
      <x-input type="password" name="repeatPwd" placeholder="请再次输入新密码" keyboard="text" v-model="repeatPwd" ref="repeatpwd" :equal-with="newPwd"></x-input>
    </group>
  </view-box>
</template>

<script>
import {XHeader, XInput, Group, XButton, ViewBox} from 'vux'
import {mapActions} from 'vuex'

export default {
  components: {
    XHeader, XInput, Group, XButton, ViewBox
  },
  data () {
    return {
      oldPwd: '',
      newPwd: '',
      repeatPwd: ''
    }
  },
  methods: {
    ...mapActions(['updatePwd']),
    _complete () {
      if (this.oldPwd === this.newPwd) {
        this.$vux.toast.show({text: '不可与旧密码一致', type: 'text', time: 1500, position: 'bottom'})
      } else {
        if (this.newPwd === this.repeatPwd) {
          this.updatePwd({
            oldPwd: this.oldPwd,
            pwd: this.newPwd
          }).then(() => {
            this.$vux.toast.show({text: '修改成功', type: 'text', time: 1500, position: 'bottom'})
            setTimeout(() => {
              try {
                localStorage.removeItem('token')
                plus.runtime.restart() // 重启应用
              } catch (e) {
                this.$router.push('/login')
              }
            }, 500)
          })
        } else {
          this.$vux.toast.show({text: '两次密码输入不一致', type: 'text', time: 1500, position: 'bottom'})
        }
      }
    }
  }
}
</script>
