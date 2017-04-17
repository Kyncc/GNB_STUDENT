<template >
  <div>
    <template v-for="item in errorList">
      <group :title="item.name" :gutter="0">
        <cell v-for="img in item.imgList">
          <x-img :src="img.url+'-errorList'"/>
        </cell>
      </group>
    </template>
  </div>
</template>

<script>
import {XHeader, Group, Cell, XImg} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  components:{
    Group, Cell, XImg
  },
  computed:{
    ...mapGetters(['workbookExercise']),
    errorList(){
      return this.workbookExercise.list.errorList
    }
  }
}
</script>
