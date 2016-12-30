<template>
    <view-box v-ref:view-box class="mainIndex">
        <div  slot="header" style="position:fixed;left:0;top:0;width:100%;z-index:2016" >
            <x-header :left-options="{showBack: false}">归纳本</x-header>
        </div>

        <div style="padding-top:46px">
            <div>
                <a class="brush" v-link="{ path: 'index/brush/'}"></a>
            </div>     
            <div>
                <x-button type='primary' v-link="{ path: 'index/remember/'}" mini class="rememberBtn">记错题</x-button>
            </div>
        </div>
    </view-box>
</template>

<script>
import { XHeader,ViewBox,XButton} from 'vux'
import './index.less'

export default {
    components: {
        XHeader,ViewBox,XButton
    },
    ready(){
        //进首页一系列清空操作
        if(window.plus) {
            setTimeout(()=>{
                plus.navigator.closeSplashscreen(); //关闭等待
                plus.navigator.setStatusBarBackground(75,183,170);      //设置系统状态条颜色
            },500)
        }
    }
}
</script>
