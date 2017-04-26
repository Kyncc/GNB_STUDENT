<template>
  <view-box ref="myClass" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" 
    :left-options="{backText: ClassMyClassmate.classname ? ClassMyClassmate.classname : '',showBack: true}"> 
    </x-header>
    <template v-if="ClassMyClassmate.teacher">
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
     <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading">
      <div slot="no-results" style="color:#4bb7aa;">出错了~</div>
      <div slot="spinner" style="padding:.5rem 0"><spinner type="dots" slot="value"></spinner></div>
      <div slot="no-more"></div>
    </infinite-loading>
  </view-box>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader, Cell, Group, ViewBox, Spinner} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'classmate',
  components: {
    XHeader, Cell, Group, ViewBox, InfiniteLoading, Spinner
  },
  computed: {
    ...mapGetters(['ClassMyClassmate'])
  },
  methods: {
    ...mapActions(['getMyClassmateList', 'myClassmateClear']),
    _onInfinite () {
      this.getMyClassmateList()
      .then(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    }
  },
  deactivated () {
    this.$refs.infiniteLoading.isLoading = false
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.myClassmateClear()
      vm.$nextTick(() => {
        vm.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
    })
  }
}
</script>
