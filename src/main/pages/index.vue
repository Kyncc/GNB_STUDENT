<template >
  <div class="mainIndex">
    <div style="position:fixed;left:0;top:0;width:100%;z-index:2016" slot="header">
      <x-header :left-options="{showBack: false}">归纳本
        <!--<a slot="right" v-touch:tap="_share">
          <i class="icon iconfont icon-share"></i>
        </a>-->
      </x-header>
    </div>
    <scroller lock-x v-ref:scroller height="-46px">
      <div style="padding-top:46px;">
        <div class="swiper">
          <swiper auto loop height="10em" dots-position="center">
            <swiper-item class="swiperImg" v-for="item in swiper"><img :src="item"/></swiper-item>
          </swiper>
        </div>
        <section class="content">
            <flexbox :gutter="0" wrap="wrap">
              <flexbox-item :span="246.6/750" v-link="{ path: '/camera/'}">
                  <img src="../../assets/main/home_1.png"/>
                  <p>拍错题</p>
              </flexbox-item>
              <flexbox-item :span="5/750">
              </flexbox-item>
              <flexbox-item :span="246.6/750"  v-link="{ path: '/error/'}">
                  <img src="../../assets/main/home_2.png" alt="" />
                  <p>错题归纳</p>
              </flexbox-item>
              <flexbox-item :span="5/750">
              </flexbox-item>
              <flexbox-item :span="246.6/750"  v-link="{ path: '/collect/'}">
                  <img src="../../assets/main/home_4.png" alt="" />
                  <p>收藏本</p>
              </flexbox-item>
              <flexbox-item :span="246.6/750" @click='_warn()'>
                  <img src="../../assets/main/home_3.png" alt="" />
                  <p class="disable">记错题</p>
              </flexbox-item>
              <flexbox-item :span="5/750">
              </flexbox-item>
              <flexbox-item :span="246.6/750" @click='_warn()'>
                  <img src="../../assets/main/home_5.png" alt="" />
                  <p class="disable">知识图谱</p>
              </flexbox-item>
              <flexbox-item :span="5/750">
              </flexbox-item>
              <flexbox-item :span="246.6/750" @click='_warn()'>
                  <img src="../../assets/main/home_6.png" alt="" />
                  <p class="disable">刷题型</p>
              </flexbox-item>
                <flexbox-item :span="246.6/750" @click='_warn()'>
                    <img src="../../assets/main/home_7.png" alt="" />
                    <p class="disable">报听写</p>
                </flexbox-item>
                <flexbox-item :span="5/750">
                </flexbox-item>
                <flexbox-item :span="246.6/750" @click='_warn()'>
                    <img src="../../assets/main/home_8.png" alt="" />
                    <p class="disable">我的作业</p>
                </flexbox-item>
                <flexbox-item :span="5/750">
                </flexbox-item>
                <flexbox-item :span="246.6/750" @click='_warn()'>
                    <img src="../../assets/main/home_9.png" alt="" />
                    <p class="disable">在线练习</p>
                </flexbox-item>
          </flexbox>
        </section>
      </div>
    </scroller>
  </div>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import { XHeader,Swiper,SwiperItem,Panel,Scroller,Flexbox,FlexboxItem} from 'vux'
import { collectCount,errorCount,cameraCount,swiper} from '../getters'
import { period_id,subject_id,token } from '../../common/getters'
import { getStudentIndex } from '../actions'
import * as _ from '../../config/whole.js'

import {shareReady} from '../../common/h5Plus/share.js';
import './main.less'

export default {
  components: {
    XHeader,Swiper,SwiperItem,Panel,Scroller,Flexbox,FlexboxItem
  },
  methods: {
		_share(){
      //shareReady()
  },_warn(){
      _.toast('敬请期待')
  }
  },
  vuex: {
    getters: {
        collectCount,errorCount,cameraCount,swiper,
        period_id,subject_id,token
    },
    actions: {
      getStudentIndex
    }
  },
  store,
  ready(){
    let params = {
        options:{
            period_id:this.period_id,
            subject_id:this.subject_id
        },
        token:localStorage.getItem('token')
    }
    this.getStudentIndex(params);
    if(window.plus) {
        plus.navigator.closeSplashscreen();
    }
  }
}
</script>
<style lang="less" scoped>
.content{
    .vux-flexbox{
        .vux-flexbox-item{
            background:#fff;
            margin-bottom:0.13rem;
            min-width:0;
            img{
                width:2rem;
                height:2rem;
                display:block;
                margin:1rem auto 0.5rem auto;
            }
            p{
                text-align:center;
                font-size:0.8rem;
                margin-bottom:0.5rem;
            }
        }
    }
}
</style>
