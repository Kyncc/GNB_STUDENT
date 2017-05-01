<template>
  <view-box class="register">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:1">
      <x-header :left-options="{showBack: false,preventGoBack:false}" style="position:fixed;left:0;top:0;width:100%" >重置密码</x-header>
    </div>
    <div style="padding-top:46px">
      <div class="icon">
        <img src="../assets/icon.png">
      </div>
      <div class="title">
        <img src="../assets/title.png">
      </div>
      <group class="weui_cells_form">
        <x-input type="password" placeholder="新密码" keyboard="text" v-model="password" ref="password" :min="6" :max="18" @on-change="_change"></x-input>
        <x-input type="password" placeholder="再次确认密码" keyboard="text" v-model="passwordAgain" ref="passwordAgain" :equal-with="password" @on-change="_change"></x-input>
      </group>
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item :span="1/20"></flexbox-item>
        <flexbox-item :span="18/20">
          <group>
            <x-button type="primary" @click.native="_complete" :disabled="!disable" >完成</x-button>
          </group>
        </flexbox-item>
        <flexbox-item :span="1/20"></flexbox-item>
      </flexbox>
    </div>
  </view-box>
</template>

<script>
import { XInput, Group, ViewBox, XButton, Flexbox, FlexboxItem, XHeader, Cell } from 'vux'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    XInput, Group, ViewBox, XButton, Flexbox, FlexboxItem, XHeader, Cell
  },
  data () {
    return {
      disable: false,
      password: '',
      passwordAgain: ''
    }
  },
  methods: {
    ...mapActions(['resetPwd']),
    _change () {
      this.disable = this.$refs.password.valid && (this.passwordAgain === this.password)
    },
    _complete () {
      let params = {
        mobile: this.forgetMobile,
        pwd: this.password
      }
      this.resetPwd(params).then(() => {
        this.$router.replace({name: 'index'})
      })
    }
  },
  computed: {
    ...mapGetters(['forgetMobile'])
  }
}
</script>
