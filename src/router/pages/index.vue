<template>
  <div class="mainIndex">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{showBack: false}">归纳本</x-header>
    <div>
      <router-link :to="{ path: 'induce'}">
        <p class="induce"></p>
      </router-link>
    </div>
    <div>
      <div>
        <router-link :to="{ path: 'workbook'}">
          <x-button type='primary' mini class="rememberBtn">查答案</x-button>
        </router-link>
      </div>
      <div>
        <router-link :to="{ path: 'error'}">
          <x-button type='primary' mini class="rememberBtn">我的错题</x-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, ViewBox, XButton} from 'vux'
import {mapActions} from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, ViewBox, XButton
  },
  methods: {
    ...mapActions(['getUserInfo'])
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style>
.weui-loading_toast .weui-mask_transparent{
  z-index: 2 !important;
}
.mainIndex .weui-btn_primary:not(.weui-btn_disabled):active{
  background:none;
}
</style>
