<template>
  <view-box class="workbookStuSelect">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        {{path.name}}
        <a slot="right" @click="_changeSub()">练习册</a>
      </x-header>
    </div>
    <div style="padding-top:46px;">
      <tab active-color='#4bb7aa'>
        <tab-item :selected="isChapter">记错题</tab-item>
        <tab-item :selected="isAnswer">查答案</tab-item>
        <tab-item :selected="isError">错题本</tab-item>
      </tab>
      <router-view keep-alive></router-view>
    </div>
  </view-box>
</template>

<script>
  import { XHeader,ViewBox,Tab, TabItem,} from 'vux'
  import { mapActions,mapGetters} from 'vuex'

  export default {
    components:{
      XHeader,ViewBox,Tab, TabItem
    },
    computed:{
      ...mapGetters(['path']),
      isChapter(){
        return (this.path.indexOf('chapter') == -1 ? false : true)
      },
      isAnswer(){
        return (this.path.indexOf('answer') == -1 ? false : true)
      },
      isError(){
        return (this.path.indexOf('error') == -1 ? false : true)
      }
    }
  }
</script>
