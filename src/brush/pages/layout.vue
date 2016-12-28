<template>
  <router-view keep-alive></router-view>
</template>

<script>
import {brushListClear} from '../actions/list'
import {brushExampleClear} from '../actions/example'

export default {
  vuex: {
    getters: {},
    actions: {
      brushListClear,brushExampleClear
    }
  },
  ready(){
      this.$router.afterEach((transition) => {
        if(transition.from.name == 'brushChapter' &&  transition.to.name == 'brushList'){
          this.brushListClear();
        }
        else if(transition.from.name == 'brushList' &&  transition.to.name == 'brushExample'){
          this.brushExampleClear();
        }
      })
  }
}
</script>