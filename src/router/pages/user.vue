<template>
  <div class='user'>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{showBack: false}">
      <!--<i class="icon iconfont icon-share" slot="right"></i>-->
      个人中心
    </x-header>
    <group gutter="0" class='headInfo'>
      <cell class='userBg' :link="{name: 'settings_update'}">
        <img slot="icon" width="70" height="70" style="border-radius:50%;margin-right:1rem" v-lazy="User.headImg">
        <div slot="after-title" style='color:#fff;'>{{User.name}}</div>
        <div slot="inline-desc" style='color:#fff;padding-top:.25rem'>{{User.mobile}}</div>
      </cell>
    </group>
    <group gutter="0" style='margin-top:-2px;'>
      <cell title="我的收藏本" link="collect">
        <i class="icon iconfont icon-my_collection" style="color:#4cc0be" slot="icon"></i>
      </cell>
      <cell title="我的习题册" link="myBook">
        <i class="icon iconfont icon-my_exercisebook" style="color:#4cc0be" slot="icon"></i>
      </cell>
      <cell title="设置" link="settings">
        <i class="icon iconfont icon-settingfull" style="color:#4cc0be" slot="icon"></i>
      </cell>
      <cell title="消息通知" link="message">
        <i class="icon iconfont icon-comment2" style="color:#4cc0be" slot="icon"></i>
        <badge v-if="News.correct || News.system"></badge>
      </cell>
      <cell title="版本更新" v-if="System != 'IOS' && User.version !== '3.7.0'" is-link @click.native="_openStore">
        <i class="icon iconfont icon-gengxin" style="color:#4cc0be" slot="icon"></i>
        <badge></badge>
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
