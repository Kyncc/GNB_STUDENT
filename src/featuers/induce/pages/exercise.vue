<template>
  <view-box ref="induce" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '题型归纳'}"></x-header>
    <tab style="position:fixed;top:46px;width:100%;z-index:2017">
      <tab-item :selected="Route.name === 'Indece_Total'" @click.native="$router.replace({name:'Indece_Total', params:{subject: Params.subject, chapterId: Params.chapterId}})">题型本</tab-item>
      <tab-item :selected="Route.name === 'Indece_Practice'" @click.native="$router.replace({name:'Indece_Practice', params:{subject: Params.subject, chapterId: Params.chapterId}})">练习本</tab-item>
      <tab-item :selected="Route.name === 'Indece_Break'" @click.native="$router.replace({name:'Indece_Break', params:{subject: Params.subject, chapterId: Params.chapterId}})">斩题本</tab-item>
      <tab-item :selected="Route.name === 'Indece_Pass'" @click.native="$router.replace({name:'Indece_Pass', params:{subject: Params.subject, chapterId: Params.chapterId}})">弃题本</tab-item>
    </tab>
    <div style="padding-top:46px;">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div> 
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Tab, TabItem} from 'vux'
import {mapGetters} from 'vuex'
import modules from '../modules/store'
import store from '@/store'

store.registerModule('induce', {
  ...modules
})

export default {
  name: 'induce',
  components: {
    XHeader, ViewBox, Tab, TabItem
  },
  computed: {
    ...mapGetters(['Params'])
  },
  methods: {
  }
}
</script>
