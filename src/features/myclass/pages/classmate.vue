<template>
  <view-box ref="myClass" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" 
    :left-options="{backText: ClassMyClassmate.classname ? ClassMyClassmate.classname : '',showBack: true}"> 
    </x-header>
    <template v-if="!loading">
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
    <div style="text-align:center">
      <spinner v-if="loading" type="ripple"></spinner>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, Spinner} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'classmate',
  components: {
    XHeader, Cell, Group, ViewBox, Spinner
  },
  computed: {
    ...mapGetters(['ClassMyClassmate'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getMyClassmateList', 'myClassmateClear']),
    _getData () {
      this.getMyClassmateList().then(() => {
        this.loading = false
      })
    }
  },
  deactivated () {
    this.myClassmateClear()
    this.loading = true
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm._getData()
    })
  }
}
</script>
