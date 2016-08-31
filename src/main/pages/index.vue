<template >
  <div class='mainIndex vux-scroller-header-box'>
    <div style="height:46px;">
      <x-header :left-options="{showBack: false}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">归纳本<a slot="right" v-touch:tap="_share"><img src="../../assets/main/share.png" height="30px"></a></x-header>
    </div>
    <div class="swiper">
      <swiper auto loop  height="10em">
        <swiper-item class="swiperImg" v-for="item in swiperImg"><img :src="item.img"></swiper-item>
      </swiper>
    </div>
    <section class="content">
        <div class="block">
          height
        </div>
    </section>
  </div>   
</template>

<script>


const baseList =[
  {
    url: 'javascript:',
    img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/1.jpg',
    title: '如何手制一份秋意的茶？'
  }, {
    url: 'javascript:',
    img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/2.jpg',
    title: '茶包VS原叶茶'
  }, {
    url: 'javascript:',
    img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/3.jpg',
    title: '播下茶籽，明春可发芽？'
  }
]

import Vue from 'vue'
import Router from 'vue-router'
import { XHeader,Swiper,SwiperItem} from 'vux'
export default {
  components: {
    XHeader,Swiper,SwiperItem
  },
  methods: {
		_share(){
		  alert(1);
    }
  },
  data(){
    return {
      swiperImg: baseList
    }
  }
}
</script>

<style lang = 'less'>
.mainIndex{
  font-size:inheirt;
	.vux-header{
		color:#fff;
		background-color:#4bb7aa;
	}
  .vux-header-right{
    top:8px;
  }
  .swiper{
    height:400/40em;
    width:100%;
    .swiperImg img {
      width: 100%;
    }
  }
  .content{
    .block{height:215/40em;background:#fff;}
  }
}
</style>

