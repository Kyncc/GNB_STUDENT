<template>
  <view-box ref="induce" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: Route.params.chapterName}"></x-header>
    <tab style="position:fixed;top:46px;width:100%;z-index:2017">
      <tab-item :selected="Route.name === 'induce_exercise_total'" 
        @click.native="$router.replace({name:'induce_exercise_total'})">
        题型本
      </tab-item>
      <tab-item :selected="Route.name === 'induce_exercise_practice'" 
        @click.native="$router.replace({name:'induce_exercise_practice'})">
        练习本
      </tab-item>
      <tab-item :selected="Route.name === 'induce_exercise_break'" 
        @click.native="$router.replace({name:'induce_exercise_break'})">
        斩题本
      </tab-item>
      <tab-item :selected="Route.name === 'induce_exercise_pass'" 
        @click.native="$router.replace({name:'induce_exercise_pass'})">
        弃题本
      </tab-item>
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

export default {
  name: 'exercise',
  components: {
    XHeader, ViewBox, Tab, TabItem
  },
  computed: {
    ...mapGetters(['Route'])
  }
}
</script>
