<template>
  <div class='user'>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{showBack: false}">
      <!--<i class="icon iconfont icon-share" slot="right"></i>-->
      个人中心
    </x-header>
    <div class="info">
        <div style="display:inline-block;position:absolute;top:50%;margin-top:-57.5px;left:50%;margin-left:-40px;"
          @click="$router.push('settings/info')">
          <img :src="User.headImg" width="80" height="80" style="border-radius:50%"/>
          <p class="phone">&nbsp;{{User.name}}&nbsp;</p>
        </div>
    </div>
    <group gutter="0">
      <cell title="设置" link="settings">
        <i class="icon iconfont icon-settingfull" style="color:#794BB8" slot="icon"></i>
      </cell>
      <cell title="关于归纳本" link="about">
        <i class="icon iconfont icon-info" style="color:#6DC6FF" slot="icon"></i>
      </cell>
      <cell title="消息通知" link="message">
        <i class="icon iconfont icon-comment2" style="color:#ABC97C" slot="icon"></i>
        <badge text="新消息" v-if="News.correct || News.system"></badge>
      </cell>
      <cell title="版本更新" v-if="System != 'IOS' && User.version !== '3.0.0'" is-link @click.native="_openStore">
        <i class="icon iconfont icon-yingyongshengji" style="color:#FF5454" slot="icon"></i>
        <badge text="新版本"></badge>
      </cell>
    </group>
  </div>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, Badge} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'user',
  components: {
    XHeader, Cell, Group, ViewBox, Badge
  },
  computed: {
    ...mapGetters(['User', 'System', 'News'])
  },
  methods: {
    ...mapActions(['getUserNews']),
    _openStore () {
      window.location.href = 'market://details?id=com.sanbao.guinaben.student'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getUserNews()
    })
  }
}
</script>
