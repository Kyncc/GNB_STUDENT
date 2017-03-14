<template >
  <div class="workbookAnswer">
    <p>照片列表</p>
    <div style="padding:.5rem;">
      <img class="previewer-demo-img" width="100" @click="show(0)" style="margin-right:.3rem" src="http://img.guinaben.com/workbookPic/290-cover-936902.jpg?imageView2/0/format/png/w/90/h/120" />
      <img class="previewer-demo-img" width="100" @click="show(1)" style="margin-right:.3rem" src="http://img.guinaben.com/workbookPic/290-cover-936902.jpg?imageView2/0/format/png/w/90/h/120" />
      <img class="previewer-demo-img" width="100" @click="show(2)" style="margin-right:.3rem" src="http://img.guinaben.com/workbookPic/290-cover-936902.jpg?imageView2/0/format/png/w/90/h/120" />
    </div>
    <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
      <span slot="no-results" style="color:#4bb7aa;">
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
        <p style="font-size:1rem;display:inline-block;">数据发生一点问题~</p>
      </span>
      <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
    </infinite-loading>
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
    XHeader,InfiniteLoading,photoswiper
  },
  route: {
    data:function(transition){
      
    }
  },
  data(){
    return{
       list: [{
        src: 'http://img.guinaben.com/workbookPic/290-cover-936902.jpg?imageView2/2/w/700/h/1050/q|imageslim',
        w: 600,
        h: 400
      },
      {
        src: 'https://placekitten.com/1200/900',
        w: 1200,
        h: 900
      },
      {
        src: 'https://placekitten.com/1200/900',
        w: 1200,
        h: 900
      }
      ],
      options: {
        preload:[1,3],
        bgOpacity:1,
        // loadingIndicatorDelay: 10000,
        // showAnimationDuration :0,
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
    _onInfinite(){
      // this.getWorkbookStuExercise()
      // .then(()=>{
      //   this.$broadcast('$InfiniteLoading:loaded');
      //   this.$broadcast('$InfiniteLoading:complete');
      // });
    },
    show(index){
      this.$refs.photoswiper.show(index)
    }
  },
  ready(){
    //  console.log(this.$refs.previewer)
  },
  computed:{
    ...mapGetters(['']),
	}
}
</script>
