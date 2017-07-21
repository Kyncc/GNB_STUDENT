<template>
  <view-box body-padding-top="46px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '我的习题册'}">
        <div slot="right"  @click="_add">
          <i class="icon iconfont icon-book" style="padding:10px;margin:0 -10px 0 0"></i>
        </div>
      </x-header>
      <tab>
        <tab-item :selected="Route.name === 'myBook_math'" @click.native="$router.replace('math')">数学</tab-item>
        <template v-if="User.subjectType.length > 1">
          <tab-item :selected="Route.name === 'myBook_physics'" @click.native="$router.replace('physics')">物理</tab-item>
        </template>
      </tab>
    </div>
    <div style="padding-top:46px;">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Tab, TabItem} from 'vux'
import {mapGetters} from 'vuex'
import modules from '../modules/store'
import store from '@/store'

export default {
  name: 'myBook',
  components: {
    XHeader, ViewBox, Tab, TabItem
  },
  computed: {
    ...mapGetters(['Route', 'User'])
  },
  methods: {
    _add () {
      if (this.Route.name === 'myBook_math') {
        let id = this.User.textbook.math[0].id
        this.$router.push({name: 'myBook_add', params: {subject: 'math'}, query: {id: id}})
      } else {
        let id = this.User.textbook.physics[0].id
        this.$router.push({name: 'myBook_add', params: {subject: 'physics'}, query: {id: id}})
      }
    }
  },
  beforeCreate () {
    store.registerModule('myBook', {
      ...modules
    })
  }
}
</script>
