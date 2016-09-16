<template>
    <view-box v-ref:view-box class="cameraIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">拍错题</x-header>
        </div>

        <div style="margin-top:46px;" >
            <div class="img" v-touch:tap="_camera()">
                <i class="icon iconfont icon-camera"></i>
            </div>
        </div>

        <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
			 <x-button type="primary" v-touch:tap="_history()">拍题记录</x-button>
        </tabbar>

	</view-box>
</template>

<script>
import {XHeader,Panel,ViewBox,Tabbar, TabbarItem,XButton} from 'vux'

export default {
    components: {
       XHeader,Panel,ViewBox,Tabbar, TabbarItem,XButton
    },
    methods: {
        _history(){
            this.$router.go(`/camera/history`);
        },
        _camera(){
            alert(1);
        }
    },
    data(){
        return{
           
        }
    },
    computed:{

    }
}
</script>
