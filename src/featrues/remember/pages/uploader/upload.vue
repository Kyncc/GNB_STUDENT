<template>
  <view-box class="workbookStuIndex">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}" >
        上传作业
      </x-header>
    </div>

    <div style="padding-top:46px;">
      <group title="请上传照片"></group>
      
     
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
    ...mapGetters(['Params','User']),

	}
}
</script>


