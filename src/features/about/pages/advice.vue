<template>
  <view-box ref="about_advice" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '意见反馈'}">
      <router-link :to="{ path: 'adviceHistory'}" slot="right">
        <p>反馈历史</p>
      </router-link>
    </x-header>
    <group gutter="0">
      <x-input placeholder="标题" v-model="title"></x-input>
      <x-input placeholder="QQ号/微信号" v-model="contact"></x-input>
      <x-textarea :max="200" name="description" placeholder="问题或建议描述" :rows="5" v-model="content"></x-textarea>
    </group>
    <div class="footer">
      <x-button class="footer_botton" type="primary" @click.native="_submit">提交</x-button>
    </div>
  </view-box>
</template>

<script>
import {XHeader, XInput, Group, XTextarea, XButton, ViewBox} from 'vux'
import {mapActions} from 'vuex'

export default {
  name: 'advice',
  components: {
    XHeader, XInput, Group, XTextarea, XButton, ViewBox
  },
  data () {
    return {
      title: '',
      content: '',
      contact: ''
    }
  },
  methods: {
    ...mapActions(['updateAdvice']),
    _submit () {
      if (this.title && this.content && this.contact) {
        this.updateAdvice({
          title: this.title,
          content: this.content,
          contact: this.contact
        })
        .then(() => {
          setTimeout(() => {
            this.$router.push('adviceList')
          }, 300)
        })
      } else {
        this.$vux.toast.show({text: '请完善内容', type: 'text', time: 1000, position: 'bottom'})
      }
    }
  },
  activated () {
    this.title = ''
    this.content = ''
    this.contact = ''
  }
}
</script>
<style lang="less" scopedd>
.footer{
  width:90%;
  margin:0 auto;
  .footer_botton{margin-top:1rem;}
}
</style>

