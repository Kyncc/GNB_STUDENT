<template>
  <view-box v-ref:view-box class="messageSystem">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">系统消息</x-header>
    </div>
    <div style="padding-top:46px;" class="messageSection">
      <section v-for="item in messageSystemList">
        <h3>{{item.time | ymd}}</h3>
        <article>
          {{item.content}}
        </article>
      </section>
      
      <infinite-loading :on-infinite="onInfinite" spinner="spiral">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">暂无消息~</p>
        </span>
        <span slot="no-more"></span>
      </infinite-loading>
    </div>
  </view-box>
</template>
<script>
import {XHeader,ViewBox} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions,mapGetters } from 'vuex'

export default {
  components: {
    XHeader,ViewBox,InfiniteLoading
  },
  route: {
    data:function(transition){
      this.$nextTick(() => {
        this.$broadcast('$InfiniteLoading:reset');
      });
    }
  },
  methods: {
    ...mapActions(['getMessageSystem']),
    onInfinite(){
      this.getMessageSystem()
      .then(()=>{
        if(this.messageSystemList.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
        this.$broadcast('$InfiniteLoading:complete');
      })
    }
  },
  computed:{
    ...mapGetters(['messageSystemList'])
  }
}
</script>



