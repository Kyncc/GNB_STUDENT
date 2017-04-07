<template>
  <view-box ref="myClass" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: ClassMyClassmate.classname,showBack: true}"> </x-header>
    <template v-if="ClassMyClassmate">
      <group title="我的老师">
        <cell v-if="ClassMyClassmate.teacher" :title="ClassMyClassmate.teacher.name">
          <img slot="icon" width="30" height="30" style="display:block;margin-right:5px;border-radius:50%;background:#ddd" v-lazy="ClassMyClassmate.teacher.headImg">
        </cell>
      </group>
      <group title="我的同学">
        <template v-for="student in ClassMyClassmate.students">
          <cell :title="student.name">
            <img slot="icon" width="30" height="30" style="display:block;margin-right:5px;border-radius:50%;background:#ddd" v-lazy="student.headImg">
          </cell>
        </template>
      </group>
    </template>
     <infinite-loading :on-infinite="_onInfinite"  ref="infiniteLoading" spinner="default">
      <div slot="no-results" >
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
        <p style="font-size:1rem;display:inline-block;">还未同学~</p>
      </div>
      <div slot="no-more"></div>
    </infinite-loading>
  </view-box>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader, Cell, Group, ViewBox} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    XHeader, Cell, Group, ViewBox, InfiniteLoading
  },
  // route: {
  //   data:function(transition){
  //     this.$nextTick(() => {
  //       this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
  //     });
  //   }
  // },
  methods: {
    ...mapActions(['getMyClassmateList']),
    _onInfinite () {
      this.getMyClassmateList({
        'classCode': this.id
      })
      .then(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    }
  },
  computed: {
    ...mapGetters(['ClassMyClassmate'])
  }
}
</script>
