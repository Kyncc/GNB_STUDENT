<template>
<view-box v-ref:view-box class='myClass'>
  <x-header :left-options="{showBack: true}">我的班级</x-header>
    <group>
        <flexbox>
            <flexbox-item :span="17/20">
                <search placeholder="请输入班级编号" :auto-fixed="false"></search>
            </flexbox-item>
            <flexbox-item style="background:#efeff4;" :span="3/20">
                <div class="btn-wrap" style="">
                    <div class="search-btn"  v-touch:tap="_search">搜索</div>
                </div>
            </flexbox-item>
        </flexbox>
    </group>
    <group>
        <cell title="数学一班" link="detail" v-touch:tap="_detail">
           <span class="demo-icon" slot="icon"></span>
       </cell>
    </group>

</view-box>
</template>

<script>
import './myClass.less'
import {
  XHeader,
  Cell,
  Group,
  Alert,
  Flexbox,
  FlexboxItem,
  Search,
  ViewBox
}
from 'vux'
export default {
  components: {
    XHeader,
    Cell,
    Group,
    Alert,
    Flexbox,
    FlexboxItem,
    Search,
    ViewBox
  },
  methods: {
    _search(){
        this.$router.go('addClass')
    },
    _detail() {
      this.$router.go('detail')
    }
  }
}
</script>
