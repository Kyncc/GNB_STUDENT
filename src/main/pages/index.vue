<template>
    <view-box v-ref:view-box class="mainIndex">
        <div style="position:fixed;left:0;top:0;width:100%;z-index:2016" slot="header">
            <x-header :left-options="{showBack: false}">归纳本</x-header>
        </div>
        <scroller lock-x v-ref:scroller height="-46px">
            <div style="padding-top:46px;">
                <div class="swiper">
                    <swiper auto loop height="10em" dots-position="center">
                        <swiper-item class="swiperImg" v-for="item in swiper"><img :src="item"/></swiper-item>
                    </swiper>
                </div>
                <section class="content">
                    <div class="flex-wrap">
                        <div class="flex-item right1px bottom1px tap-highlight" v-link="{ path: '/camera/'}">
                            <img src="../../assets/main/home_1.png"/>
                            <p>拍错题</p>
                        </div>
                        <div class="flex-item right1px bottom1px tap-highlight" v-link="{ path: '/error/'}">
                            <img src="../../assets/main/home_2.png" alt="" />
                            <p>错题归纳</p>
                        </div>
                        <div class="flex-item bottom1px tap-highlight" v-link="{ path: '/collect/'}" >
                            <img src="../../assets/main/home_4.png" alt="" />
                            <p >收藏本</p>
                        </div>
                        <div class="flex-item right1px bottom1px tap-highlight" v-link="{ path: '/remember'}">
                            <img src="../../assets/main/home_3.png" alt="" />
                            <p >记错题</p>
                        </div>
                        <div class="flex-item right1px bottom1px tap-highlight" v-link="{ path: '/report'}">
                            <img src="../../assets/main/home_5.png" alt="" />
                            <p >成绩报告单</p>
                        </div>
                        <div class="flex-item bottom1px tap-highlight" v-link="{ path: '/brush'}">
                            <img src="../../assets/main/home_6.png" alt="" />
                            <p >题型汇总</p>
                        </div>
                        <!--<div class="flex-item right1px" @click='_warn()'>
                            <img src="../../assets/main/home_7.png"  />
                            <p class="disable">报听写</p>
                        </div>
                        <div class="flex-item right1px" @click='_warn()'>
                            <img src="../../assets/main/home_8.png"  />
                            <p class="disable">我的作业</p>
                        </div>
                        <div class="flex-item" @click='_warn()'>
                            <img src="../../assets/main/home_9.png"  />
                            <p class="disable">在线练习</p>
                        </div>-->
                    </div>
                </section>
            </div>
        </scroller>
    </view-box>
</template>

<script>
import store from '../../store'
import { XHeader,Swiper,SwiperItem,Panel,Scroller,Flexbox,FlexboxItem,ViewBox} from 'vux'
import { collectCount,errorCount,cameraCount,swiper} from '../getters'
import { subject_id,token } from '../../common/getters'
import { getStudentIndex } from '../actions'
import {shareReady} from '../../common/h5Plus/share.js'
import {clearReport} from '../../report/actions'
import {clearError} from '../../error/actions/index'
import {clearCollect} from '../../collect/actions'
import {clearBrush} from '../../brush/actions/index'
import {delChapter} from '../../remember/actions/workbook'

import * as _ from '../../config/whole.js'
import './main.less'

export default {
    components: {
        XHeader,Swiper,SwiperItem,Panel,Scroller,Flexbox,FlexboxItem,ViewBox
    },
    methods: {
        _warn(){
            _.toast('敬请期待')
        }
    },
    vuex: {
        getters: {
            collectCount,errorCount,cameraCount,swiper,
            subject_id,token
        },
        actions: {
            getStudentIndex,
            clearError,clearReport,clearCollect,clearBrush,delChapter
        }
    },
    store,
    ready(){
        //进首页一系列清空操作
        this.clearError();
        this.clearReport();
        this.clearCollect();
        this.clearBrush();
        this.delChapter();

        this.getStudentIndex({
            options:{
                subject_id:this.subject_id
            },
            token:localStorage.getItem('token')
        })
        if(window.plus) {
            setTimeout(()=>{
                plus.navigator.closeSplashscreen();
            },500)
        }
    }
}
</script>
