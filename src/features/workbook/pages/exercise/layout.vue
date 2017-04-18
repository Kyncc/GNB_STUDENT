<template>
  <view-box ref="workbook" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: Route.params.name}"></x-header>
    <tab style="position:fixed;top:46px;width:100%;z-index:100">
      <tab-item :selected="Route.name === 'workbook_exercise_answer'" 
        @click.native="$router.replace({name:'workbook_exercise_answer'})">
        记错题
      </tab-item>
      <tab-item :selected="Route.name === 'workbook_exercise_result'" 
        @click.native="_intoAnswer">
        查答案
      </tab-item>
      <tab-item :selected="Route.name === 'workbook_exercise_error'" 
        @click.native="$router.replace({name:'workbook_exercise_error'})">
        错题本
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
  methods: {
    _intoAnswer () {
      if (this.workbookExercise.list.bindTeacher && this.workbookExercise.list.practiceImg.length === 0) {
        this.$router.push({name: 'workbook_uploader'})
      } else {
        this.$router.replace({name: 'workbook_exercise_result'})
      }
    }
  },
  computed: {
    ...mapGetters(['Route', 'workbookExercise'])
  }
}
</script>
