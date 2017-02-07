<template >
    <view-box v-ref:view-box class="registerInfo">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: false}">
                资料填写
            </x-header>
        </div>
        <div style="padding-top:46px;">
            <div class="icon">
              <img src="../../../assets/login/icon.jpg">
            </div>
            <div class="title">
              <img src="../../../assets/login/title.png">
            </div>
            <group title="基本资料">
                <x-input title="姓名" name="name" :value.sync="name"></x-input>
                <x-input title="学校" name="school" :value.sync="school"></x-input>
                <selector title="主教科目" :options="subjectList" :value.sync="subject" @on-change="_onChangeSunject"></selector>
            </group>
            <div style="width:90%;margin:1.5rem auto;">
              <x-button type="primary" @click="_complete" :disabled="disable">完成</x-button>
            </div>
        </div>  
    </view-box>
</template>

<script>
import { XHeader,Panel,ViewBox,XButton,XInput,Group,Cell,Selector} from 'vux'
import { mapActions,mapGetters  } from 'vuex'

export default {
  components: {
    XHeader,ViewBox,Panel,XButton,XInput,Group,Cell,Selector
  },
  methods: {
    ...mapActions(['setUserInfo']),
    _onChangeSunject(item){
      this.grade = item;
    },
    _complete(){
      this.setUserInfo({
        name: this.name,
        school: this.school,
        subjectId:this.subject,
        sex:1,
        mobile:this.registerMobile,
      }).then(()=>{
          this.$router.replace('/main/index');
      });
    }
  },
  data() {
    return {
      name:'',
      school:'',
      subject:'2',
      subjectList: [{key: '2', value: '数学'},{key: '7', value: '物理'}]
    }
  },
  computed:{
     ...mapGetters(['registerMobile']),
     disable(){
         return (this.name && this.school ? false : true);
     }
  }
}
</script>
