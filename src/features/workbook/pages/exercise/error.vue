<template >
  <div>
    <group v-for="(item, pindex) in errorList" :title="item.name" :gutter="(pindex ? '10px' : '0px')" :key="pindex">
      <cell v-for="(img, index) in item.imgList" :key="index" @click.native="show(pindex,index)" >
        <img v-lazy="img.url+'-errorList?123'">
      </cell>
    </group>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
import {Group, Cell, Previewer, TransferDomDirective as TransferDom} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'error',
  components: {
    Group, Cell, Previewer
  },
  computed: {
    ...mapGetters(['workbookExercise']),
    errorList () {
      return this.workbookExercise.list.errorList
    }
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      list: [{}],
      options: {
        preload: [1, 1],
        bgOpacity: 1,
        fullscreenEl: false,
        history: true
      }
    }
  },
  methods: {
    show (pindex, index) {
      this.list = []
      this.list.push({
        src: this.errorList[pindex].imgList[index].url,
        w: this.errorList[pindex].imgList[index].width,
        h: this.errorList[pindex].imgList[index].height
      })
      this.$nextTick(() => {
        this.$refs.previewer.show(0)
      })
    }
  }
}
</script>
