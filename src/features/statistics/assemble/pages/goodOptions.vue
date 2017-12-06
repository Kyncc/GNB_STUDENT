<template>
  <view-box body-padding-top="46px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '筛选'}"></x-header>
    </div>
    <div>
      <div style='padding:10px;'>
        <span class='searchtitle'>难度：</span>
        <checker style='padding-left:.5rem;' v-model="degree" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
          <checker-item value="0">不限</checker-item>
          <checker-item value="1">1</checker-item>
          <checker-item value="2">2</checker-item>
          <checker-item value="3">3</checker-item>
        </checker>
      </div>
      <div style='padding:10px;'>
        <span class='searchtitle'>题型：</span>
        <checker style='padding-left:.5rem;' v-model="type" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
          <checker-item value="0">不限</checker-item>
          <checker-item value="1">选择题</checker-item>
          <checker-item value="2">填空题</checker-item>
          <checker-item value="3">解答题</checker-item>
        </checker>
      </div>
    </div>
  </view-box>
</template>
<script>
import {XButton, Checker, CheckerItem, XHeader, ViewBox} from 'vux'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'options',
  components: {
    XButton, Checker, CheckerItem, XHeader, ViewBox
  },
  computed: {
    ...mapGetters(['AssembleGood'])
  },
  data () {
    return {
      degree: '',
      type: ''
    }
  },
  methods: {
    ...mapActions(['setStatisticsGoodOptions'])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.degree = vm.AssembleGood.index.options.degree.toString()
      vm.type = vm.AssembleGood.index.options.type.toString()
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setStatisticsGoodOptions({
      degree: this.degree,
      type: this.type
    })
    next()
  }
}
</script>
<style lang="less" scoped>
.searchtitle{
  font-size:14px;
  color:#4cc0be;
}
.demo4-item {
  background-color: #ccc;
  color: #fff;
  font-size: 14px;
  width:22%;
  text-align: center;
  padding:7px 0;
  margin:.25rem;
  min-width:29%;
  line-height: 18px;
  border-radius: 5px;
}
.demo4-item-selected {
  background-color: #4cc0be;
  color: #fff;
}
.demo4-item-disabled {
  color: #999;
}
</style>
