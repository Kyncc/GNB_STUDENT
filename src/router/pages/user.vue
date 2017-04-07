<template>
  <div class='user'>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{showBack: false}">
      <i class="icon iconfont icon-share" slot="right"></i>
      个人中心
    </x-header>
    <div class="info">
     
    </div>
    <group gutter="0">
      <cell title="设置" link="settings">
        <i class="icon iconfont icon-settingfull" style="color:#794BB8" slot="icon"></i>
      </cell>
      <cell title="关于归纳本" link="about">
        <i class="icon iconfont icon-info" style="color:#6DC6FF" slot="icon"></i>
      </cell>
      <cell title="消息通知" link="workbook">
        <i class="icon iconfont icon-comment" style="color:#ABC97C"  slot="icon"></i>
      </cell>
    </group>
  </div>
</template>


<script>
import {XHeader, Cell, Group, Scroller, ViewBox} from 'vux'

export default {
  name: 'user',
  components: {
    XHeader, Cell, Group, Scroller, ViewBox
  }
}
</script>

<style >

</style>
