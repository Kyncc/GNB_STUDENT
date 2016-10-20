<template>
<view-box v-ref:view-box class='myClass'>
  <x-header :left-options="{showBack: true}">添加班级</x-header>
    <group>
        <cell :title="fetchMyClassSearchClass.name" v-if="fetchMyClassSearchClass.name">
           <x-button type="primary" :mini="true" v-touch:tap="_add(fetchMyClassSearchClass.classCode)">申请加入</x-button>
       </cell>
       <p class="tips" v-else>
           没有查询到班级
       </p>
    </group>
</view-box >
</template>

<script>
import './myClass.less'
import {fetchMyClassSearchClass} from '../../getters.js'
import { token } from '../../../common/getters.js'
import { postMyClassInto } from '../../actions/class.js'

import {
  XHeader,
  XButton,
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
    XButton,
    Cell,
    Group,
    Alert,
    Flexbox,
    FlexboxItem,
    Search,
    ViewBox
  },
  vuex:{
    getters:{
        fetchMyClassSearchClass,token
    },
    actions:{
        postMyClassInto
    }
  },
  methods:{
      _add(code){
          this.postMyClassInto({classCode:code,token:this.token},()=>{
              this.$router.go('/user/class')
          },()=>{
              this.$router.go('/user/class')
          })
      }
  }
}
</script>
<style media="screen" scoped>
    .tips{
        text-align: center;
        line-height: 3rem;
    }
</style>
