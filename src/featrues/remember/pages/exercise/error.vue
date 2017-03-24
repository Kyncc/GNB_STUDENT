<template >
  <div class="workbookAnswer">
    <template v-for="item in errorList">
       <group :title="item.name">
        <cell v-for="img in item.imgList">  
          <img class="previewer-workbookAnswer-img" @click="show($index)" v-lazy="img.url+'?imageView2/2/w/640/q|imageslim'">
        </cell>
      </group>
    </template>
    <!--<photoswiper :list="list" :options="options" v-ref:photo></photoswiper>-->
  </div>
</template>

<script>
import { XHeader,Group,Cell} from 'vux'
import { mapActions,mapGetters} from 'vuex'
//import {photoswiper} from 'components'

export default {
  components:{
    XHeader,Group,Cell
    //,photoswiper
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
    ...mapActions([]),
    show(index){
      this.$refs.photo.show(index)
    }
  },
  computed:{
    ...mapGetters(['workbookStuExercise']),
    errorList(){
      return this.workbookStuExercise.list.errorList
    },
    list(){
      let list = []
      if(this.errorList){
        for(let arr of this.errorList) {
          list.push({
            "w":Number(arr.group.width),
            "h":Number(arr.group.height),
            "src":`${arr.group.url}?imageView2/0/q/50|imageslim`
          })
        }
      }
      return list
    }
	}
}
</script>
