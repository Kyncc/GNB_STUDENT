<template>
    <view-box v-ref:view-box class="cameraIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">拍错题</x-header>
        </div>

        <div style="margin-top:46px;">

        </div>
	</view-box>
</template>

<script>
import {XHeader,Panel,ViewBox} from 'vux'



export default {
    components: {
       XHeader,Panel,ViewBox
    },
    methods: {
        
    },
    data(){
        return{
           
        }
    },
    computed:{

    }
}
</script>
