<template>
  <div class='bag'>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{showBack: false}">书包</x-header>
    <group gutter="0">
      <cell title="知识图谱" link="report">
        <i class="icon iconfont icon-pie-chart" style="color:#794BB8" slot="icon"></i>
      </cell>
      <cell title="我的收藏本" link="collect">
        <i class="icon iconfont icon-box" style="color:#6DC6FF" slot="icon"></i>
      </cell>
      <cell title="我的班级" link="class">
        <i class="icon iconfont icon-workbook" style="color:#ABC97C" slot="icon"></i>
      </cell>
    </group>
  </div>
</template>

<script>
import {XHeader, Cell, Group, ViewBox} from 'vux'

export default {
  name: 'bag',
  components: {
    XHeader, Cell, Group, ViewBox
  }
}
</script>
