<template>
  <div>
      <tab>
        <tab-item :selected="demo1 === '已发货'" @click="demo1 = '已发货'">1</tab-item>
        <tab-item :selected="demo1 === '未发货'" @click="demo1 = '未发货'">2</tab-item>
        <tab-item :selected="demo1 === '全部订单'" @click="demo1 = '全部订单'">3</tab-item>
      </tab>
  </div>
   
</template>

<script>
import { Tab, TabItem } from 'vux'


export default {
  components:{
    Tab, TabItem
  },
  data () {
    return {
      demo1: '未发货'
    }
  }
}
</script>


<style>
  @import '~vux/dist/vux.css';
</style>