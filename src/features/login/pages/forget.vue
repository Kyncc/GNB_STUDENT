<template>
  <view-box class="forget">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:1">
      <x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%" >重置密码</x-header>
    </div>
    <div style="padding-top:46px">
      <div class="icon">
        <img src="../assets/icon.png">
      </div>
      <div class="title">
        <img src="../assets/title.png">
      </div>
      <group class="weui_cells_form">
        <x-input name="mobile" placeholder="手机号" keyboard="number" is-type="china-mobile" v-model="mobile" ref="mobile" @on-change="_changeMoblie"></x-input>
        <div class="weui-cell" style="padding:0">
          <div style="width:60%">
            <x-input name="code" placeholder="验证码" keyboard="number" v-model="code" :min="6" :max="6" ref="code" is-type="is-code"  @on-change="_changeCode"/>
          </div>
          <div style="width:40%" class="code">
            <x-button style="height:2.75em;border-radius:0;border:0px;" slot="right" :text="btnValue" type="primary" :disabled="!disableMobile" @click.native="_getCode"></x-button>
          </div>
        </div>
      </group>
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item :span="1/20"></flexbox-item>
        <flexbox-item :span="18/20">
          <group>
            <x-button type="primary" :disabled="!disableNext" @click.native="_next">下一步</x-button>
          </group>
        </flexbox-item>
        <flexbox-item :span="1/20"></flexbox-item>
      </flexbox>
    </div>
  </view-box>
</template>

<script>
import {XInput, Group, ViewBox, XButton, Flexbox, FlexboxItem, XHeader, Cell} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'forget',
  components: {
    XInput, Group, ViewBox, XButton, Flexbox, FlexboxItem, XHeader, Cell
  },
  computed: {
    ...mapGetters(['forgetCode', 'forgetMobile'])
  },
  data () {
    return {
      disableMobile: false,
      disableNext: false,
      currentDown: false,
      mobile: '',
      code: '',
      btnValue: '获取验证码',
      'is-code': (val) => {
        return (val.length >= 6 && val.length <= 18)
      }
    }
  },
  methods: {
    ...mapActions(['getForgetCode']),
    _next () {
      if (this.forgetCode.toString() === this.code.toString()) {
        this.$router.replace('resetPassword')
      } else {
        this.code = ''
        this.$vux.toast.show({text: '错误的验证码', type: 'text', time: 1500, position: 'bottom'})
      }
    },
    _getCode () {
      if (this.currentDown) {
        return
      }
      this.currentDown = true
      let time = 60
      let timeDown = setInterval(() => {
        time--
        this.btnValue = `已发送(${time})`
        if (time.toString() === '0') {
          clearInterval(timeDown)
          this.btnValue = '获取验证码'
          this.currentDown = false
        }
      }, 1000)
      let params = {
        mobile: this.mobile,
        type: 2
      }
      this.getForgetCode(params)
    },
    _changeMoblie () {
      this.disableMobile = this.$refs.mobile.valid && !this.currentDown
    },
    _changeCode () {
      this.disableNext = this.$refs.mobile.valid && this.$refs.code.valid
    }
  },
  watch: {
    currentDown () {
      this.disableMobile = this.$refs.mobile.valid && !this.currentDown
    }
  }
}
</script>
