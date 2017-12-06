<template>
  <view-box body-padding-top="46px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '记错题'}">
        <div slot="right"  @click="_add">
          <i class="icon iconfont icon-book" style="padding:10px;margin:0 -10px 0 0"></i>
        </div>
      </x-header>
      <tab>
        <tab-item v-if="User.subjectType.indexOf('math') >= 0" :selected="Route.name === 'workbook_math'" @click.native="$router.replace('math')">数学</tab-item>
        <!-- <tab-item v-if="User.subjectType.indexOf('physics') >= 0" :selected="Route.name === 'workbook_physics'" @click.native="$router.replace('physics')">物理</tab-item> -->
        <!-- <tab-item v-if="User.subjectType.indexOf('chemistry') >= 0" :selected="Route.name === 'workbook_chemistry'" @click.native="$router.replace('chemistry')">化学</tab-item> -->
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
import modules from '../../modules/store'
import store from '@/store'

export default {
  name: 'workbook',
  components: {
    XHeader, ViewBox, Tab, TabItem
  },
  computed: {
    ...mapGetters(['Route', 'User'])
  },
  methods: {
    _add () {
      if (this.Route.name === 'workbook_math') {
        this.$router.push({name: 'workbook_add', params: {subject: 'math'}, query: {id: this.User.textbook.math[0].id}})
      } else if (this.Route.name === 'workbook_physics') {
        this.$router.push({name: 'workbook_add', params: {subject: 'physics'}, query: {id: this.User.textbook.physics[0].id}})
      } else {
        this.$router.push({name: 'workbook_add', params: {subject: 'chemistry'}, query: {id: this.User.textbook.chemistry[0].id}})
      }
    }
  },
  beforeCreate () {
    store.registerModule('workbook', {
      ...modules
    })
  }
}
</script>
