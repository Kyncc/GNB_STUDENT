<template >
  <div> 
    <infinite-loading :on-infinite="infinite" spinner="spiral" noresults="" nomore="">
      <span slot="no-results" style="color:#4bb7aa;">
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem">{{noresults}}</i>
        <p style="font-size:1rem;display:inline-block;">{{nomore}}</p>
      </span>
      <span slot="no-more"></span>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'

export default {
  props: ['noresults','nomore'],
  components:{
      "infinite-loading":InfiniteLoading
  },
  methods:{
    infinite(){
      this.$emit('loading');
    }
  }
}
</script>