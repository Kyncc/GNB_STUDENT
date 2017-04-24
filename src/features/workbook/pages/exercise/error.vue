<template >
  <div>
    <group v-for="(item, index) in errorList" :title="item.name" :gutter="(index ? '10px' : '0px')" :key="index">
      <cell v-for="(img, index) in item.imgList" :key="index">
        <img v-lazy="img.url+'-errorList'" >
      </cell>
    </group>
  </div>
</template>

<script>
import {Group, Cell} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'error',
  components: {
    Group, Cell
  },
  computed: {
    ...mapGetters(['workbookExercise']),
    errorList () {
      return this.workbookExercise.list.errorList
    }
  }
}
</script>
