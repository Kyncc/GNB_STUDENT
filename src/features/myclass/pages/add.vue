<template>
  <view-box ref="myClassAdd" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '添加班级'}"></x-header>
    <search @on-submit="_onSearch"  @on-change="_onSearch" v-model="searchCode" :auto-fixed="false" placeholder="请输入班级码"></search>
    <group gutter="0" v-if="!loading">
      <template v-if="ClassSearch.name">
        <cell :title="ClassSearch.name">
          <x-button type="primary" :mini="true" @click.native="_addClass(ClassSearch.classCode)">申请加入</x-button>
        </cell>
      </template>
    </group>
    <div style="text-align:center;padding:20px 0;">
      <spinner v-if="loading" type="ripple"></spinner>
      <p v-else-if="_isEmpty(ClassSearch) && searchCode.length === 6" style="font-size:16px;color:#4BB7AA">没有查找到班级~</p>
    </div>
  </view-box>
</template>

<script>
import {XHeader, XButton, Cell, Group, Search, Spinner, ViewBox} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'add',
  components: {
    XHeader, XButton, Cell, Group, Search, ViewBox, Spinner
  },
  data () {
    return {
      searchCode: '',
      loading: false
    }
  },
  methods: {
    ...mapActions(['getMyClassSearchClass', 'postMyClassInto', 'myClassSearchClear']),
    _addClass (code) {
      this.postMyClassInto({
        classCode: code
      }).then(() => {
        this.$vux.toast.show({text: '申请成功', type: 'text', time: 1500})
        history.back()
      })
    },
    _getData () {
      if (this.searchCode.length === 6) {
        this.loading = true
        this.getMyClassSearchClass({
          classCode: this.searchCode
        }).then(() => {
          this.loading = false
        })
      }
    },
    _isEmpty (value) {
      for (let t in value) {
        return !1
      }
      return !0
    },
    _onSearch (str) {
      this.searchCode = str
      this._getData()
    }
  },
  computed: {
    ...mapGetters(['ClassSearch'])
  },
  activated () {
    this.searchCode = ''
    this.myClassSearchClear()
  }
}
</script>
