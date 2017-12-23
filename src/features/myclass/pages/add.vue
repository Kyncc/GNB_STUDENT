<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '添加班级'}"></x-header>
    <search ref="search" @on-submit="_onSearch"  @on-change="_onSearch" @on-cancel="_onClear" v-model="name" :auto-fixed="false" placeholder="请输入老师的手机号码或班级码"></search>
    <group gutter="0" v-if="!loading">
      <cell v-if='ClassSearch.name'>
        <img slot="icon" width="60" height="60" style="border-radius:50%;margin-right:.5rem" v-lazy="ClassSearch.img">
        <div slot="after-title">{{ClassSearch.name}}</div>
        <div slot="inline-desc" style='padding-top:.25rem'>{{ClassSearch.mobile}}</div>
      </cell>
      <cell :title="classes.name" v-for='(classes, index) in ClassSearch.classes' :key='classes.code'>
        <x-button type="primary" :mini="true" :disabled='classes.status' @click.native="_addClass(classes.code, index)">
          {{classes.status ? '已加' : '加入'}}
        </x-button>
      </cell>
    </group>
    <div style="text-align:center;padding:20px 0;">
      <spinner v-if="loading" type="ripple"></spinner>
      <p v-if="ClassSearch.hasOwnProperty('name') && ClassSearch.name.length === 0" style="font-size:16px;color:#4cc0be">没有找到老师~</p>
      <p v-else-if="ClassSearch.hasOwnProperty('name') && ClassSearch.classes.length === 0" style="font-size:16px;color:#4cc0be">该老师还未创建班级~</p>
    </div>
  </view-box>
</template>

<script>
import {XHeader, XButton, Cell, Group, Search, Spinner, ViewBox} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'MyClassAdd',
  components: {
    XHeader, XButton, Cell, Group, Search, ViewBox, Spinner
  },
  data () {
    return {
      name: '',
      loading: false
    }
  },
  methods: {
    ...mapActions(['getMyClassSearchClass', 'postMyClassInto', 'myClassSearchClear']),
    _addClass (code, index) {
      this.postMyClassInto({
        classCode: code,
        index: index
      })
    },
    _getData () {
      if (this.name.length === 0) {
        this.myClassSearchClear()
      } else if (this.name[0] !== '1' && this.name.length === 6) {
        this.loading = true
        this.getMyClassSearchClass({ name: this.name })
        .then(() => { this.loading = false })
        .catch(() => { this.loading = false })
      } else if (this.name.length === 11) {
        this.loading = true
        this.getMyClassSearchClass({ name: this.name })
        .then(() => { this.loading = false })
        .catch(() => { this.loading = false })
      }
    },
    _onSearch (str) {
      this.name = str
      this._getData()
    },
    _onClear () {
      this.myClassSearchClear()
    }
  },
  computed: {
    ...mapGetters(['ClassSearch'])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.name = ''
      vm.$refs.search.setFocus()
      vm.myClassSearchClear()
    })
  }
}
</script>
