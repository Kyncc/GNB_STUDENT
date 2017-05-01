<template>
  <div class="login">
    <div class="icon">
      <img src="../assets/icon.png"/>
    </div>
    <div class="title">
      <img src="../assets/title.png"/>
    </div>
    <group class="weui_cells_form">
      <x-input name="mobile" placeholder="手机号" keyboard="number" v-model="mobile" is-type="china-mobile" required ref="mobile" @on-change="_change"></x-input>
      <x-input name="password" placeholder="密码" type="password" v-model="password" is-type="is-password" :min="6" :max="18" ref="password" required @on-change="_change"></x-input>
    </group>
    <div class="btnWapper">
      <x-button :disabled="!disable" @click.native='_login' type="primary">登录</x-button>
      <div class="link">
        <router-link :to="{ path: 'register'}">
          <p class="register">新用户注册</p>
        </router-link>
        <router-link :to="{ path: 'forget'}">
          <p class="resetPwd">忘记密码?</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {XInput, Group, XButton} from 'vux'
import { mapActions, mapGetters } from 'vuex'
import store from '@/store'

export default {
  components: {
    XInput, Group, XButton
  },
  data () {
    return {
      disable: false,
      mobile: this.registerMobile,
      password: '',
      'is-password': (val) => {
        return (val.length >= 6 && val.length <= 18)
      }
    }
  },
  methods: {
    ...mapActions(['getToken']),
    // 改动的事件
    _change () {
      this.disable = this.$refs.mobile.valid && this.$refs.password.valid
    },
    _login () {
      let params = {
        mobile: this.mobile,
        pwd: this.password
      }
      this.getToken(params).then(() => {
        setTimeout(() => {
          this.$router.replace({name: 'index'})
        }, 500)
      })
      .catch((error) => {
        if (error) this.pwd = ''
      })
    }
  },
  computed: {
    ...mapGetters(['registerMobile'])
  },
  mounted () {
    // 在首页 返回键失效其他页面则直接返回上一页
    document.addEventListener('plusready', () => {
      let first = null
      plus.navigator.setStatusBarBackground('#4BB7AA')  // 设置状态栏颜色
      plus.key.addEventListener('backbutton', () => {
        if (store.state.route.path === '/index' || store.state.route.path === '/bag' || store.state.route.path === '/login' || store.state.route.path === '/user') {
          if (!first) {
            first = new Date().getTime()
            this.$vux.toast.show({text: '再按一次退出', type: 'text', time: 1000, position: 'bottom'})
            setTimeout(() => { first = null }, 1000)
          } else {
            new Date().getTime() - first < 1000 ? plus.runtime.quit() : ''
          }
        } else {
          history.back()
        }
      }, false)
    })
  }
}
</script>
