<template>
  <view-box class="register">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:1">
      <x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%" >用户注册</x-header>
    </div>
    <div style="padding-top:46px">
      <div class="icon">
        <img src="../assets/icon.png">
      </div>
      <div class="title">
        <img src="../assets/title.png">
      </div>
      <group class="weui_cells_form">
        <x-input name="mobile" placeholder="手机号" keyboard="number" is-type="china-mobile" 
          v-model="mobile" ref="mobile" @on-change="_changeMoblie">
        </x-input>
        <div class="weui-cell" style="padding:0">
          <div style="width:60%">
            <x-input name="code" placeholder="验证码" keyboard="number" v-model="code" :min="6" :max="6" ref="code" is-type="is-code"  @on-change="_changeCode"/>
          </div>
          <div style="width:40%">
            <x-button style="height:2.65em;border-radius:0;" slot="right" :text="btnValue" type="primary" :disabled="!disableMobile" @click.native="_getCode"></x-button>
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
  <confirm :show.sync="confirmShow" confirm-text="确定" cancel-text="取消" title="已是教师用户,注册会清空数据" @on-confirm="_quit('确认')" @on-cancel="_quit('取消')"></confirm>
  </view-box>
</template>

<script>
import {XInput, Group, ViewBox, XButton, Flexbox, FlexboxItem, XHeader, Cell, Confirm} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    XInput, Group, ViewBox, XButton, Flexbox, FlexboxItem, XHeader, Cell, Confirm
  },
  data () {
    return {
      disableMobile: false,
      disableNext: false,
      currentDown: false,
      confirmShow: false,
      cover: false,
      mobile: '',
      code: '',
      btnValue: '获取验证码',
      'is-code': (val) => {
        return val.length === 6
      }
    }
  },
  methods: {
    ...mapActions(['getRegisterCode']),
    // 手机号码检测
    _changeMoblie () {
      this.disableMobile = this.$refs.mobile.valid && !this.currentDown
    },
    // 验证码检测
    _changeCode () {
      this.disableNext = this.$refs.mobile.valid && this.$refs.code.valid
    },
    _quit (type) {
      if (type === '确认') {
        this.cover = true
        this.getRegisterCode({
          cover: this.cover,
          mobile: this.mobile
        }).then(() => {
          this.$vux.toast.show({text: '注册码已发送', type: 'text', time: 1500, position: 'bottom'})
        })
      }
    },
    _next () {
      if (this.registerCode.toString() === this.code.toString()) {
        this.$router.replace({path: 'setPassword', registerMobile: this.mobile})
      } else {
        this.code = ''
        this.$vux.toast.show({text: '注册码已发送', type: 'text', time: 1500, position: 'bottom'})
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
        cover: this.cover,
        mobile: this.mobile
      }
      // 如果是已教师，则同意清空师账户后在发送接口获取验证码
      this.getRegisterCode(params)
      // .then((response) => {
      //   if (response.data.data.isTeacher) {
      //     this.confirmShow = true
      //   } else {
      //     this.$vux.toast.show({text: '注册码已发送', type: 'text', time: 1500, position: 'bottom'})
      //   }
      // })
    }
  },
  watch: {
    currentDown () {
      this.disableMobile = this.$refs.mobile.valid && !this.currentDown
    }
  },
  computed: {
    ...mapGetters(['registerCode', 'registerMobile'])
  }
}
</script>
