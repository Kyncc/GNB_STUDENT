<template >
  <div class="workbookAnswer">
    <div class="weui_cells_title">答案列表</div>
    <div class="padding:.5rem">
      <template v-for="img in resultImg">
        <img  class="previewer-demo-img" width="90" height="120" @click="show($index)" style="margin-left:.5rem;background:#ddd" v-lazy="img.url+'?imageView2/2/w/90/h/120/q/75|imageslim'" />
      </template>
    </div>
    <photoswiper :list="list" :options="options" v-ref:photoswiper></photoswiper>
  </div>
</template>
<script>
import { XHeader} from 'vux'
import {photoswiper} from 'components'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions,mapGetters} from 'vuex'

export default {
  components:{
    XHeader,photoswiper
  },
  data(){
    return{
      options: {
        preload:[1,3],
        bgOpacity:1,
        fullscreenEl: false,
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      }
    }
  },
  methods: {
    ...mapActions([]),
    show(index){
      //显示
      this.$refs.photoswiper.show(index)
      //打开图集
      this.$refs.photoswiper.obj().listen('initialZoomIn', () =>{
        this.$router.go({
          path:this.path,
          query:{
            'photo':true
          }
        })
      });
      //关闭图集
      this.$refs.photoswiper.obj().listen('close', () =>{
          history.back()
      });
    }
  },
  computed:{
    ...mapGetters(['workbookStuExercise','Path']),
    resultImg(){
      return (this.workbookStuExercise.list.resultImg ? this.workbookStuExercise.list.resultImg : [])
    },
    list(){
      let list = []
      if(this.workbookStuExercise.list.resultImg){
        for(let arr of this.workbookStuExercise.list.resultImg) {
          list.push({
            "w":Number(arr.width)/2,
            "h":Number(arr.height)/2,
            "src":`${arr.url}?imageMogr2/auto-orient/thumbnail/!50p/format/jpg/interlace/1/blur/1x0/quality/50|imageslim`
          })
        }
      }
      return list
    }
	}
}
</script>
