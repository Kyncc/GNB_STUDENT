<template>
  <view-box ref="userinfoUpdate" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '修改资料'}">
      <p slot="right">完成</p>
    </x-header>
    <group gutter="0">
      <cell title="头像">
        <img slot="default" src="https://cn.nuxtjs.org/vuejobs.png" width="60" height="60"/>
      </cell>
      <x-input title="姓名" v-model="name"></x-input>
      <cell title="性别">
        <checker slot="default" v-model="sex" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
          <checker-item value="1">男</checker-item>
          <checker-item value="0">女</checker-item>
        </checker>
      </cell>
    </group>
    <group>
      <selector v-model="grade" title="年级" :options="list"></selector>
      <x-input title="学校" v-model="school"></x-input>
    </group>
    <group>
      <selector v-model="math" title="数学" :options="list"></selector>
      <selector v-model="physics" title="物理" :options="list"></selector>
    </group>
  </view-box>
</template>

<script>
import {XHeader, Group, ViewBox, XInput, Checker, CheckerItem, Selector, Cell} from 'vux'

export default {
  name: 'update',
  components: {
    XHeader, Group, ViewBox, XInput, Checker, CheckerItem, Selector, Cell
  },
  data () {
    return {
      name: '111',
      sex: 0,
      school: '我的学校',
      grade: 'gd',
      physics: 'gd',
      math: 'gd',
      list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}]
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.demo2-item {
  width: 27px;
  height: 27px;
  border: 1px solid #ccc;
  display: inline-block;
  border-radius: 50%;
  line-height: 23px;
  text-align: center;
}
.demo2-item-selected {
  border-color: green;
}
.weui-cell_select .weui-select{
  direction: rtl !important;
}
.weui-input{
  text-align:right
}
</style>
