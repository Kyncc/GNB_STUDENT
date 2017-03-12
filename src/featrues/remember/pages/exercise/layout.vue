<template>
  <view-box class="workbookStuSelect">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        章节选择
        <a slot="right" @click="_changeSub()" >练习册</a>
      </x-header>
    </div>
    <div style="padding-top:46px;">
      <router-view keep-alive></router-view>
    </div>
  </view-box>
</template>

<script>
  import { XHeader,ViewBox} from 'vux'
  import { mapActions,mapGetters} from 'vuex'

  export default {
    components:{
      XHeader,ViewBox
    }
  }
</script>
