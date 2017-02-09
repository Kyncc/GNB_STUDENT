<template>
   <view-box v-ref:view-box class="settingsAdviceHistory">
      <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
        <x-header :left-options="{showBack: true}">
            反馈历史
        </x-header>
      </div>

     <div style="padding-top:46px;" class="messageSection">
      <section v-for="item in historyList" >
        <h3>{{item.createTime}}</h3>
        <article>
          <h4>{{item.title}}</h4>
          <p>
          {{item.content}}
          </p>
        </article>
      </section>
    </div>
    
    <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
      <span slot="no-results" style="color:#4bb7aa;">
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
        <p style="font-size:1rem;display:inline-block;">暂无消息~</p>
      </span>
      <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
    </infinite-loading>


  </view-box>
</template>

<script>
import {XHeader,XInput,Group,Cell,ViewBox} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions,mapGetters } from 'vuex'

export default {
  components: {
    XHeader,XInput,Group,Cell,ViewBox,InfiniteLoading
  },
   methods: {
    ...mapActions(['adviceHistory']),
    _onInfinite(){
      this.adviceHistory().
      then(()=>{
        if(this.historyList.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
        this.$broadcast('$InfiniteLoading:complete');
      });
    }
  },
  computed:{
    ...mapGetters(['historyList'])
  }
}
</script>
