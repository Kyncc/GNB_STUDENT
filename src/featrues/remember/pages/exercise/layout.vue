<template>
  <view-box class="workbookStuSelect">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        {{Params.name}}
        <a slot="right" @click="_changeSub()">练习册</a>
      </x-header>
      <tab active-color='#4bb7aa'>
        <tab-item :selected="isExercise" @click="_into(1)">记错题</tab-item>
        <tab-item :selected="isAnswer" @click="_into(2)">查答案</tab-item>
        <tab-item :selected="isError" @click="_into(3)">错题本</tab-item>
      </tab>
    </div>
    <div style="padding-top:90px">
      <router-view keep-alive></router-view>
    </div>
  </view-box>
</template>

<script>
  import { XHeader,ViewBox,Tab,TabItem,} from 'vux'
  import { mapActions,mapGetters} from 'vuex'

  export default {
    components:{
      XHeader,ViewBox,Tab, TabItem
    },
    methods:{
      _into(state){
        if(state == '1'){
          this.$router.replace(`../../../main/${this.Params.chapterId}/${this.Params.name}/`)
        }else if(state == '2'){
          this.$router.replace(`../../../answer/${this.Params.chapterId}/${this.Params.name}/`)
        }else{
          this.$router.replace(`../../../error/${this.Params.chapterId}/${this.Params.name}/`)
        }
      }
    },
    computed:{
      ...mapGetters(['path','Params']),
      isChapter(){
        return (this.path.indexOf('exercise') == -1 ? false : true)
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
