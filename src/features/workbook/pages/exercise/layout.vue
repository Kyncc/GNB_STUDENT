<template>
  <view-box ref="workbook" body-padding-top="90px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" >
      <x-header :left-options="{backText: Route.params.name}">
        <i slot="right" class="icon iconfont icon-home" @click="$router.go(-2)"></i>
      </x-header>
      <tab style="position:fixed;top:46px;width:100%;z-index:1">
        <tab-item :selected="Route.name === 'workbook_exercise_result'" 
          @click.native="$router.replace({name:'workbook_exercise_result'})">
          查答案
        </tab-item>
        <tab-item :selected="Route.name === 'workbook_exercise_answer'" 
          @click.native="$router.replace({name:'workbook_exercise_answer'})">
          记错题
        </tab-item>
        <tab-item :selected="Route.name === 'workbook_exercise_error'" 
          @click.native="$router.replace({name:'workbook_exercise_error'})">
          错题本
        </tab-item>
      </tab>
    </div>
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Tab, TabItem} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'exercise',
  components: {
    XHeader, ViewBox, Tab, TabItem
  },
  computed: {
    ...mapGetters(['Route', 'workbookExercise'])
  },
  methods: {
    ...mapActions(['getWorkbookExercise', 'workbookExerciseClear'])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'workbook_chapter' || vm.workbookExercise.isReset) {
        vm.workbookExerciseClear()
        vm.getWorkbookExercise().then(() => {
          next()
        }).catch(() => {
          this.$router.go(-1)
        })
      }
    })
  }
}
</script>
