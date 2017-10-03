<template>
  <div>
    <group gutter="0" class="gnb_collapse" v-if="!loading">
      <template v-for="(list, index) in CameraPointsChemistry.list.chaper">
        <cell :title="list.name" is-link :key='index'
        :border-intent="false"
        :arrow-direction="list.check ? 'up' : 'down'"
        @click.native="list.check = !list.check"></cell>
        <div class="slide" :class="list.check ? 'animate':''" :key='index'>
          <template v-for="(chapter, eindex) in list.sub_chapter_list">
            <cell-box :style="chapter.used ? 'color:#FEAA85':''" :key='eindex' is-link
            @click.native="$router.push({name: 'camera_upload', query: {subject: 'chemistry', relationId: chapter.id, type: 'testpoint'}})">
              <div slot="default" style="width:100%;">{{chapter.name}}</div>
            </cell-box>
          </template>
        </div>
      </template>
    </group>
    <div style="text-align:center">
      <spinner v-if="loading" type="ripple"></spinner>
    </div>
  </div>
</template>

<script>
import {XHeader, Cell, CellBox, Group, Spinner} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'chemistry',
  components: {
    XHeader, Cell, Group, CellBox, Spinner
  },
  computed: {
    ...mapGetters(['CameraPointsChemistry', 'User']),
    textList () {
      return this.User.textbook.chemistry
    }
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getCameraPoints', 'setCameraPointsScroll', 'clearCameraPoints']),
    _getData () {
      this.loading = true
      this.getCameraPoints({
        subject: 'chemistry',
        editionId: this.User.subject.chemistry.id
      }).then(() => {
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$parent.$refs.viewBoxBody.scrollTop = vm.CameraPointsChemistry.scroll
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setCameraPointsScroll({subject: 'chemistry', height: this.$parent.$refs.viewBoxBody.scrollTop})
    next()
  },
  mounted () {
    this._getData()
  }
}
</script>
