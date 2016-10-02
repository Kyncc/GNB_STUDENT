<template>
    <view-box v-ref:view-box class="cameraIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                拍错题
                <a slot="right" v-link="{path: 'camera/history'}" >历史记录</a>
            </x-header>
        </div>

        <div style="margin-top:46px;" >
              <img id="defaultimg" v-el:img src="../../assets/logo.png"/>
            <!--<div class="img" v-touch:tap="_camera()">
                <i class="icon iconfont icon-camera"></i>
                <p>横屏拍照，注意尽量对焦哦</p>
            </div>-->
        </div>

      <x-button @click="_img">click</x-button>
      <img :src="jpgData"/>

	</view-box>
</template>

<script>
import {XHeader,Panel,ViewBox,Tabbar, TabbarItem,XButton} from 'vux'
import Cropper from 'Cropperjs'

export default {
    components: {
       XHeader,Panel,ViewBox,Tabbar, TabbarItem,XButton
    },
    methods: {
        imgclick(){
            alert(1);
        },
        _img(){
            // let cropBoxData = this.cropper.getCropBoxData();
            let canvasData = this.cropper.getCanvasData();
            

            this.jpgData = this.cropper.getCroppedCanvas().toDataURL('image/png');
            // this.cropper.setCropBoxData(this.jpgData);
            this.cropper.setCropBoxData(this.jpgData);
            //  this.cropper.destroy();
            //  this.cropper = new Cropper(this.$els.img, {
            //     aspectRatio: NaN,
            //  });
        },
        _history(){
            this.$router.go(`/camera/history`);
        },
        _camera(){
        }
    },
    data(){
        return{
           cropper:'',
           jpgData:''
        }
    },
    computed:{

    },
    ready(){
        this.cropper = new Cropper(this.$els.img, {
            aspectRatio: NaN
        });
    }
}
</script>
