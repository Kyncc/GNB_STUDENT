<template>
  <div class="mainIndex">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{showBack: false}">归纳本</x-header>
    <div>
      <router-link :to="{ path: 'brush'}">
        <p class="brush" ></p>
      </router-link>
    </div>
    <div>
      <router-link :to="{ path: 'remember'}">
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
    // 进首页一系列清空操作
    if (window.plus) {
      setTimeout(() => {
        plus.navigator.closeSplashscreen() // 关闭等待
        plus.navigator.setStatusBarBackground(75, 183, 170) // 设置系统状态条颜色
      }, 300)
    }
  }
}
</script>
