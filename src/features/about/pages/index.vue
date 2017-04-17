<template>
  <view-box ref="about" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '关于归纳本'}"></x-header>
    <Flexbox justify="center" orient="vertical" style="text-align:center;padding:3rem 0 1rem">
      <flexbox-item><img  src="../assets/icon.png" width="80px" height="80px"></flexbox-item>
      <flexbox-item><p style="font-size:16px;margin-top:-.5rem;">归纳本-学生端 3.0.0</p></flexbox-item>
    </Flexbox>
    <group gutter="0">
      <cell title="版本更新" is-link></cell>
      <cell title="意见反馈" link="about/advice"></cell>
      <cell title="给小纳好评" @click.native="_openStore" is-link></cell>
    </group>
    <group>
      <cell title="关于我们" link="report"></cell>
      <cell title="加入群聊" link="mqqapi://card/show_pslcard?src_type=internal&version=1&uin=458410557&card_type=group&source=qrcode"></cell>
    </group>
    <section class="about_footer">
      <a href="tel:0553-2111770" class="about_footer__link">联系我们: 0553-2111770</a><br/>
      <a href="mqqwpa://im/chat?chat_type=wpa&uin=1879831346&version=1&src_type=web&web_src=oicqzone.com"  class="about_footer__link" target="_blank">QQ客服: 1879831346</a>
    </section>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, Flexbox, FlexboxItem} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, Cell, Group, ViewBox, Flexbox, FlexboxItem
  },
  computed: {
    ...mapGetters(['System'])
  },
  method: {
    _openStore () {
      if (this.System === 'IOS') {
        window.location.href = 'itms-apps://itunes.apple.com/cn/app/gui-na-ben-xue-sheng-duan/id1184077595?l=en&mt=8'
      } else {
        window.location.href = 'market://details?id=com.sanbao.guinaben.student'
      }
    }
  }
}
</script>
<style lang="less" scopedd>
.about_footer{
  margin-top:.5rem;
  text-align:center;
  .about_footer__link{
    color:#555;
    font-size:.7rem;
  }
}
</style>
