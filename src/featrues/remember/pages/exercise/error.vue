<template >
  <div class="workbookAnswer">
    <template v-for="item in errorList">
       <group :title="item.name">
        <cell v-for="img in item.imgList">  
          <img class="previewer-workbookAnswer-img" v-lazy="img.url+'?imageView2/2/w/640/format/jpg/q/70|imageslim'">
        </cell>
      </group>
    </template>
  </div>
</template>

<script>
import { XHeader,Group,Cell} from 'vux'
import { mapActions,mapGetters} from 'vuex'

export default {
  components:{
    XHeader,Group,Cell
  },
  route: {
    data:function(transition){
      // console.log(this.$refs.photo)
      // this.$refs.photo.destroy()
    }
  },
  data(){
    return{
      preload:[1,1],
      bgOpacity:1,
      fullscreenEl: false
    }
  },
  methods: {
    ...mapActions([])
  },
  computed:{
    ...mapGetters(['workbookStuExercise','path']),
    errorList(){
      return this.workbookStuExercise.list.errorList
    }
	}
}
</script>
