<template >
    <view-box v-ref:view-box class="registerInfo">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: false}">
                资料填写
            </x-header>
        </div>
        <div style="padding-top:46px;">
            <div class="icon">
              <img src="../../assets/login/icon.jpg">
            </div>
            <div class="title">
              <img src="../../assets/login/title.png">
            </div>

            <group title="基本资料">
              <x-input title="姓名" name="username" :value.sync="username" v-ref:username is-type="china-name"></x-input>
              <popup-picker title="年级" :data="gradeList"  :value.sync="grade"></popup-picker>
              <x-input title="学校" name="school" :value.sync="school" v-ref:school ></x-input>
            </group>

            <group title="版本选择">
              <popup-picker title="物理" :data="physicsList"  :value.sync="physics" ></popup-picker>
              <popup-picker title="数学" :data="mathList"  :value.sync="math" ></popup-picker>
            </group>
            
            <div style="width:90%;margin:1.5rem auto;">
              <x-button type="primary" @click="_complete" :disabled="disable">完成</x-button>
            </div>
        </div>  
    </view-box>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import { registerMobile } from '../getters'
import { XHeader,Panel,ViewBox,Flexbox,FlexboxItem,XButton,XInput,Group,Cell,Confirm,PopupPicker} from 'vux'
import '../main.less'

export default {
  components: {
    XHeader,ViewBox,Panel,Flexbox,FlexboxItem,XButton,XInput,Group,Cell,Confirm,PopupPicker
  },
  methods: {
    _complete(){
      let grade;
      if(this.grade == '七年级'){
          grade = 7;
      }
      else if(this.grade == '八年级'){
          grade = 8;
      }
      else if(this.grade == '九年级'){
          grade = 9;
      }else{
         grade = 0;
      }
      console.log(this.username+"\n");
      console.log(this.school+"\n");
      console.log(this.physics+"\n");
      console.log(this.math+"\n");
      console.log(grade+"\n");
      this.$router.replace('password');
    }
  },
  vuex: {
    getters: {
        registerMobile
    },
    actions: {

    }
  },
  store,
    data() {
    return {
      username:'',
      school:'',
      disable: true,
      math:['人教版'],
      mathList: [
         ['人教版']
      ],
      physics:['人教A版'],
      physicsList: [
         ['人教A版']
      ],
      grade:['七年级'],
      gradeList: [
         ['七年级', '八年级', '九年级','高中']
      ]  
    }
  },
  computed:{
     disable(){
         return (this.$refs.username.valid && this.$refs.school.valid ? false : true);
     }
  }
}
</script>
