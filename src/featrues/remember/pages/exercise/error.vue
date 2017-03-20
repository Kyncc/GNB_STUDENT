<template >
  <div class="workbookAnswer">
    <div class="weui_cells_title">错题列表</div>
    <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
      <span slot="no-results" style="color:#4bb7aa;">
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
        <p style="font-size:1rem;display:inline-block;">数据发生一点问题~</p>
      </span>
      <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
    </infinite-loading>
</template>

<script>
import { XHeader,Group,Cell} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions,mapGetters} from 'vuex'

export default {
  components:{
    XHeader,Group,Cell,InfiniteLoading
  },
  route: {
    data:function(transition){
      
    }
  },
  methods: {
    ...mapActions([]),
    _onInfinite(){
      // this.getWorkbookStuExercise()
      // .then(()=>{
      //   this.$broadcast('$InfiniteLoading:loaded');
      //   this.$broadcast('$InfiniteLoading:complete');
      // });
    }
  },
  computed:{
    ...mapGetters(['']),
	}
}
</script>
