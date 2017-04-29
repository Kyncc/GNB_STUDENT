<template>
  <div class="mainIndex">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{showBack: false}">归纳本</x-header>
    <div>
      <router-link :to="{ path: 'induce'}">
        <p class="induce"></p>
      </router-link>
    </div>
    <div>
      <router-link :to="{ path: 'workbook'}">
        <x-button type='primary' mini class="rememberBtn">查答案</x-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {XHeader, ViewBox, XButton} from 'vux'

export default {
  name: 'index',
  components: {
    XHeader, ViewBox, XButton
  },
  mounted () {
    setTimeout(function () {
      if (window.plus) {
        plus.navigator.setStatusBarBackground('#4BB7AA')
      }
    }, 300)
  }
}
</script>
