<template>
<div class='info'>
  <x-header :left-options="{showBack: true}">个人资料 <a slot="right" v-touch:tap="_complete">完成</a></x-header>
  <group>

    <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name"></x-input>

    <cell title="性别">
      <checker :value.sync="sex" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
        <checker-item value="1">男</checker-item>
        <checker-item value="2">女</checker-item>
      </checker>
    </cell>

    <x-input title="年级" name="grade" value="高中" readonly></x-input>

    <x-input title="学校" name="school" placeholder="请输入学校名称"></x-input>

  </group>
</div>
</template>

<script>
import {
  Checker,
  CheckerItem,
  XHeader,
  XInput,
  Group,
  Cell
} from 'vux'
import {
  getUserInfo
} from '../actions'
import {
  fetchUserInfo
} from '../getters'

export default {
  components: {
    Checker,
    CheckerItem,
    XHeader,
    XInput,
    Group,
    Cell
  },
  data() {
    return {
      sex: ['男', '女']
    }
  },
  vuex: {
    getters: {
      fetchUserInfo
    },
    actions: {
      getUserInfo
    }
  },
  methods: {
    _complete() {
      alert(1);
    },
    change(value) {
      console.log('change:', value)
    }
  },
  ready() {
    let params = {
      token: '123'
    }
    this.getUserInfo(params)
  }
}
</script>

<style lang="less">
.info {

    .weui_cells {
        margin-top: 0;
    }
    .vux-no-group-title {
        margin-top: 0;
    }
    .weui_input {
        text-align: right;
    }
    .demo2-item {
        width: 40px;
        height: 40px;
        border: 1px solid #ccc;
        display: inline-block;
        border-radius: 50%;
        line-height: 40px;
        text-align: center;
    }
    .demo2-item-selected {
        border-color: green;
    }
}
</style>
