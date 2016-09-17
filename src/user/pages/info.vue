<template>
<div class='info'>
  <x-header :left-options="{showBack: true}">个人资料 <a slot="right" v-touch:tap="_complete">{{edit}}</a></x-header>
  <group v-show="edit=='编辑'">
    <x-input title="姓名" name="username" value="姓名" readonly></x-input>
    <x-input title="性别" name="sex" value="男" readonly></x-input>
    <x-input title="年级" name="grade" value="高中" readonly></x-input>
    <x-input title="学校" name="school" value="学校名称" readonly></x-input>
  </group>
  <group v-show="edit=='完成'">
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
  fetchUserInfo,
  fetchToken
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
      sex: ['男', '女'],
      edit: '编辑'
    }
  },
  vuex: {
    getters: {
      fetchUserInfo,
      fetchToken
    },
    actions: {
      getUserInfo
    }
  },
  methods: {
    _complete() {
      if (this.edit == '编辑') {
        this.edit = '完成'
      } else {
        this.edit = '编辑'
      }
    },
    change(value) {
      console.log('change:', value)
    }
  },
  ready() {
    console.log(this.fetchToken)
    let params = {
      token: this.fetchToken
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
        width: 1.5rem;
        height: 1.5rem;
        border: 1px solid #ccc;
        display: inline-block;
        border-radius: 50%;
        line-height: 1.5rem;
        text-align: center;
    }
    .demo2-item-selected {
        border-color: #4bb7aa;
        background-color: #4bb7aa;
        color: #fff;
    }
}
</style>
