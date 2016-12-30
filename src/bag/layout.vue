<template>
  <router-view keep-alive></router-view>
</template>

<script>
  export default {
    vuex: {
      getters: {},
      actions: {
      }
    },
    ready(){
        // this.$router.afterEach((transition) => {
        //   if(transition.from.name == 'passChapter' &&  transition.to.name == 'passList'){
        //     this.passListClear();
        //   }
        //   else if(transition.from.name == 'passList' &&  transition.to.name == 'passExample'){
        //     this.passExampleClear();
        //   }
        // })
    }
  }
</script>