<template >
  <div class="workbookAnswer" style="-webkit-overflow-scrolling:auto">
    <div class="weui_cells_title">答案列表</div>
    <div style="padding-left:.35rem">
      <template v-for="img in resultImg">
        <img class="previewer-answer-img photo" @click="show($index)" style="background:#ddd" :src="img.url+'-answer'" />
      </template>
    </div>
    <div style="z-index:2017;position:relative">
      <photoswiper :list="list" :options="options" :begin="_photoBegin" :end="_photoEnd" v-ref:photoswiper></photoswiper>
    </div>
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
        preload:[1,1],
        bgOpacity:1,
        fullscreenEl: false,
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-answer-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      }
    }
  },
  methods: {
    ...mapActions([]),
    _photoBegin(){
      document.querySelector('.workbookStuSelectHeader').setAttribute('style','z-index:-1')
    },
    _photoEnd(){
      document.querySelector('.workbookStuSelectHeader').setAttribute('style','z-index:100')
    },
    show(index){
      //打开图集
      setTimeout(()=>{
        this.$refs.photoswiper.show(index)
      },200)
    }
  },
  computed:{
    ...mapGetters(['workbookStuExercise','path','Query','Params']),
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
            "src":`${arr.url}-answerBig`
          })
        }
      }
      return list
    }
	}
}
</script>
