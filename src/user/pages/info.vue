<template>
<div class='userinfo'>
  <x-header :left-options="{showBack: true,preventGoBack: true}"  @on-click-back="_back()">
    个人资料 
    <a slot="right" v-touch:tap="_complete">{{edit}}</a>
  </x-header>

  <!--<div v-show="edit=='编辑'">
    <group title="基本资料">
      <x-input title="姓名" name="username" :value.sync="Userinfo.name" readonly></x-input>
      <x-input title="性别" name="sex" value="女" v-show="Userinfo.sex=='0'"readonly></x-input>
      <x-input title="性别" name="sex" value="男" v-show="Userinfo.sex=='1'" readonly></x-input>
      <x-input title="年级" name="grade" :value.sync="grade" readonly></x-input>
      <x-input title="学校" name="school" :value.sync="Userinfo.school" readonly></x-input>
    </group>
    <group title="版本选择">
        <x-input title="物理" name="physics" v-show="physicsShow" :value.sync="Userinfo.subject.physics.name ?Userinfo.subject.physics.name || ''" readonly></x-input>
        <x-input title="物理" name="math" :value.sync="Userinfo.subject.math.name ?Userinfo.subject.math.name|| ''" readonly></x-input>
    </group>  
  </div>-->

  <div v-show="edit=='编辑'">
    <group title="基本资料">
      <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name" :value.sync="name"></x-input>
      <cell title="性别">
        <checker :value.sync="sex" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
          <checker-item value="1">男</checker-item>
          <checker-item value="0">女</checker-item>
        </checker>
      </cell>
      <popup-picker title="年级" :data="gradeList" :columns="1" :value.sync="gradeVal" show-name></popup-picker>
      <x-input title="学校" name="school" placeholder="请输入学校名称" :value.sync="school"></x-input>
    </group>
    <group title="版本选择">
       <popup-picker title="物理" :data="physicsList" :columns="1" :value.sync="physicsVer"  show-name></popup-picker>
       <popup-picker title="数学" :data="mathList" :columns="1" :value.sync="mathVer" show-name></popup-picker>
    </group>  
  </div>

  <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="还未保存,确定返回吗" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>
</div>
</template>

<script>
import {Checker,CheckerItem,XHeader,XInput,Group,Cell,Confirm,PopupPicker} from 'vux'
import {getUserinfo,updateUserinfo,getTextbookVersion} from '../actions/info.js'
import {token} from '../../common/getters'
import {Userinfo,TextBookVer} from '../getters'
import store from '../../store' 
import './info.less' 
import * as _ from '../../config/whole.js'

export default {
  components: {
    Checker,CheckerItem,XHeader,XInput,Group,Cell,Confirm,PopupPicker
  },
  vuex: {
		getters: {
			token,Userinfo,TextBookVer
		},
		actions: {
      getUserinfo,updateUserinfo,getTextbookVersion
		}
	},
	store,
  data() {
    return {
      edit: '编辑',
      show: false,
      sex:'',
      name:'',
      school:'',
      grade:'',
      physicsShow:false,
      physicsVer:[],
      physicsList:[],
      mathVer:[],
      mathList:[],
      gradeVal:[],
      gradeList: [
         {name: '七年级',value: '7',parent: 0}, 
         {name: '八年级',value: '8',parent: 0}, 
         {name: '九年级',value: '9',parent: 0},
         {name: '高中',value: '10',parent: 0}
      ]  
    }
  },
  methods: {
    _back(){
        if (this.edit == '完成'){
            this.show = true
        }else if(this.edit = '编辑'){
            setTimeout(() => {
               this.$router.go('/main/user')
           }, 500)
        }
    },
    onAction(type) {
        if(type=='确认'){
            setTimeout(() => {
               this.$router.go('/main/user')
           }, 500)
        }else{
            return
        }
    },
    _complete() {
      if (this.edit == '编辑') {
        this.edit = '完成'
      } else if (this.edit == '完成') {
          if(this.name && this.school){

              this.updateUserInfo({
                name: this.name,
                sex: this.sex,
                school: this.school,
                subject: 3,
                grade: 1,
                token: this.fetchToken
              }, () => {
                this.getUserInfo({
                  token: this.fetchToken
                }, () => {
                    this.edit = '编辑'
                })
              })
          }else{
              _.toast('请完善内容')
          }

      }
    }
  },
  ready() {
    this.getUserinfo({token: this.token},() => {
      
    })
    
    //getTextbookVersion
  },
  watch:{
    /** 年级更改请求教材版本*/
    gradeVal(){
      this.grade = this.gradeVal[0];
      this.getTextbookVersion({grade: this.grade},() => {
      
      })
    },
    Userinfo(){
        this.name = this.Userinfo.name;
        this.school = this.Userinfo.school;
        this.sex = this.Userinfo.sex;
        
        if(this.Userinfo.grade == '7'){
          this.grade = '七年级';
        }else if(this.Userinfo.grade == '8'){
          this.grade = '八年级';
        }else if(this.Userinfo.grade == '9'){
          this.grade = '九年级';
        }else{
          this.grade = '高中';
        }
    },
    TextBookVer(){
      this.physicsList = [];
      this.mathList = [];

      if(this.TextBookVer.physics){
        this.TextBookVer.physics.forEach((item, index)=> {
          this.physicsList.push({
              value: item.editionId || '',
              name: item.editionName || '',
              parent:0
          });
        });
      }
      

      this.TextBookVer.math.forEach((item, index)=> {
          this.mathList.push({
              value: item.editionId || '',
              name: item.editionName || '',
              parent:0
          });
      });



    }
  }
}
</script>
