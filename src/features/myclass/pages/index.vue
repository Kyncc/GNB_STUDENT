<template>
  <view-box ref="myClass" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '我的班级'}">
      <div slot="right">
        <router-link :to="{ path: 'class/add'}" style="margin:0">
          <i class="icon iconfont icon-plus" style="padding:8px;font-size:28px;top:-1px;"></i>
        </router-link>
        <router-link :to="{ path: 'class/message'}" style="margin:0">
          <i class="icon iconfont icon-comment2" style="padding:10px;margin:0 -10px 0 0"></i>
        </router-link>
      </div>
    </x-header>
    <div>
      <group gutter="0" v-if="!loading">
        <template v-for="item in ClassMy">
          <cell :title="item.name" :link="'class/detail/'+item.classCode"></cell>
        </template>
      </group>
      <div style="text-align:center;padding:20px 0;">
        <spinner v-if="loading" type="ripple"></spinner>
        <p v-else-if="ClassMy.length === 0" style="font-size:16px;color:#4BB7AA" @click="$router.push('class/add')">点我加入班级~</p>
      </div>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, Spinner, ViewBox} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, Cell, Group, ViewBox, Spinner
  },
  methods: {
    ...mapActions(['getMyClass', 'myClassClear']),
    _getData () {
      this.getMyClass().then(() => {
        this.loading = false
      })
    }
  },
  computed: {
    ...mapGetters(['ClassMy'])
  },
  data () {
    return {
      loading: true
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'bag' || from.name === 'class_add') {
      next(vm => {
        vm.myClassClear()
        vm.loading = true
        vm._getData()
      })
    } else {
      next()
    }
  }
}
</script>
