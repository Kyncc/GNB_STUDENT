<template>
  <router-view keep-alive></router-view>
</template>

<script>
import {passListClear} from '../actions/list'
import {passExampleClear} from '../actions/example'
import './index.less'

export default {
  vuex: {
    getters: {},
    actions: {
      passListClear,passExampleClear
    }
  },
  ready(){
      this.$router.afterEach((transition) => {
        if(transition.from.name == 'passChapter' &&  transition.to.name == 'passList'){
          this.passListClear();
        }
        else if(transition.from.name == 'passList' &&  transition.to.name == 'passExample'){
          this.passExampleClear();
        }
      })
  }
}
</script>