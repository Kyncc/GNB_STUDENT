<template>
  <div class='info'>
      <x-header :left-options="{showBack: true}">个人资料 <a slot="right" v-touch:tap="_complete">完成</a></x-header>
      <group>
        <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name"></x-input>
        <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name"></x-input>
        <x-input title="学校" name="school" placeholder="请输入学校名称" ></x-input>
      </group>
  </div>

</template>

<script>
import {XHeader,XInput,Group} from 'vux'

export default {
  components: {
    XHeader,XInput,Group
  },
  methods: {
    _complete(){
      alert(1);
    }


  }
}
</script>

<style lang="less">
.info{
  .vux-header{
    color:#fff;
    background-color:#4bb7aa;
  }
  .weui_cells{margin-top:0;}
  .vux-no-group-title{margin-top:0;}
  .vux-header .vux-header-right a{color:#fff;}
  .vux-header .vux-header-left, .vux-header .vux-header-right{font-size:16px;}
  .vux-header .vux-header-left .vux-header-back:before{border-color:#fff;}
  .vux-header .vux-header-title, .vux-header h1{margin-left:88px;}
}
</style>
