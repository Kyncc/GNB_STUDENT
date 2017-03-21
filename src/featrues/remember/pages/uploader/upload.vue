<template>
  <view-box class="workbookStuUploader">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}" >
        上传作业
      </x-header>
    </div>

    <div style="padding-top:46px;">
      <group title="最多上传5张照片"> </group>
        <div style="padding:.6rem" class="photoGroup">
          <div class="photo">
            <img src=""/>
            <i class="icon iconfont icon-error" style="font-size:30px"></i>
          </div>
          <div class="photo">
            <img src=""/>
            <i class="icon iconfont icon-error" style="font-size:30px"></i>
          </div>
          <div class="photo">
            <img src=""/>
            <i class="icon iconfont icon-error" style="font-size:30px"></i>
          </div>
          <div class="photo">
            <img src=""/>
            <i class="icon iconfont icon-error" style="font-size:30px"></i>
          </div>
          <div class="photoAdd">
            <i class="icon iconfont icon-plus" style="font-size:44px"></i>
          </div>
        </div>
    </div>

  </view-box>

</template>

<script>
import {XHeader,ViewBox,Group,Cell,XButton,Tabbar} from 'vux'
import { mapActions,mapGetters} from 'vuex'

export default {
  components:{
    XHeader,ViewBox,Group,Cell,XButton
  },
  route: {
    data:function(transition){
     
    }
  },
  methods: {
    ...mapActions([]),
    
  },
  data(){
    return {
    }
  },
  computed:{
    ...mapGetters(['Params','User','workbookStuUploader']),
	}
}
</script>