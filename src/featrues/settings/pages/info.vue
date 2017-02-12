<template>
  <div class='userinfo'>
    <x-header :left-options="{showBack: true,preventGoBack: true}"  @on-click-back="_back()">
      个人资料
      <a slot="right" @click="_complete">{{edit}}</a>
    </x-header>

    <div v-show="edit=='编辑'">
      <group title="基本资料">
        <cell title="姓名" :value="User.name"></cell>
        <cell title="性别" :value="(User.sex == '0' ? '女':'男')"></cell>
        <cell title="年级" :value="User.grade | gradeName"></cell>
        <cell title="学校" :value="User.school"></cell>
      </group>
      <group title="课本版本">
        <cell title="数学" :value="User.subject.math.name"></cell>
        <cell title="物理" v-if="User.subject.physics.length != 0" :value="User.subject.physics.name"></cell>
      </group> 
    </div>

    <div v-show="edit=='完成'">
      <group title="基本资料">
        <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name" :value.sync="name"></x-input>
        <cell title="性别">
          <checker :value.sync="sex" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
            <checker-item value="1">男</checker-item>
            <checker-item value="0">女</checker-item>
          </checker>
        </cell>
        <selector title="年级" :options="gradeList" :value.sync="grade" @on-change="_onChangeGrade"></selector>
        <x-input title="学校" name="school" placeholder="请输入学校名称" :value.sync="school"></x-input>
      </group>
       <group title="版本选择">
          <selector title="数学" :options="textBookAllVersion.math | covert" :value.sync="math" @on-change="_onChangeMath"></selector>
          <selector title="物理"  v-show="textBookAllVersion.physics.length != 0" :options="textBookAllVersion.physics | covert " :value.sync="physics" @on-change="_onChangePhysisc"></selector>
       </group>
    </div>

    <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="还未保存,确定返回吗" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>
  </div>
</template>

<script>
import {Checker,CheckerItem,XHeader,XInput,Group,Cell,Confirm,PopupPicker,Selector} from 'vux'
import { mapActions,mapGetters } from 'vuex'
import * as _ from 'config/whole.js'

export default {
  components: {
    Checker,CheckerItem,XHeader,XInput,Group,Cell,Confirm,PopupPicker,Selector
  },
  data() {
    return {
      edit: '编辑',
      show: false,
      name:"",
      school:'',
      sex:'',
      grade:'',
      math:'',
      physics:'',
      gradeList: [{key: '7', value: '七年级'},{key: '8', value: '八年级'},{key: '9', value: '九年级'},{key: '10', value: '高中'}]
    }
  },
  filters: {
    covert(obj){
        let newObj = [];
        obj.forEach((item, index)=> {
            newObj.push({
                key: item.id.toString() || '',
                value: item.name.toString() || ''
            });
        });
        return newObj;
    }
  },
  created(){
     this.name = this.User.name
     this.school = this.User.school
     this.sex = this.User.sex
     this.grade = this.User.grade
  },
  methods: {
    ...mapActions(['getUserInfo','setUserInfo','getTextbookAllVersion']),
     _onChangeGrade(item){
      this.grade = item;
    },
    _onChangeMath(item){
      this.math = item;
    },
    _onChangePhysisc(item){
      this.physics = item;
    },
    _back(){
      if (this.edit == '完成'){
        this.show = true
      }else if(this.edit = '编辑'){
        this.$router.go('/main/user')
      }
    },
    onAction(type) {
      if(type=='确认'){
        setTimeout(() => {
          this.$router.go('/main/user')
        },300)
      }
    },
    _complete() {
      if (this.edit == '编辑') {
        this.edit = '完成'
      } else if (this.edit == '完成') {
        if(this.name && this.school){
          this.setUserInfo({
            "name": this.name,
            "sex": this.sex,
            "school": this.school,
            "grade": this.grade,
            "subject": {
              "math":this.math,
              "physics":this.physics
            }
          }).then(()=>{
             this.getUserInfo()
            .then(()=>{
              this.edit = '编辑'
            })
          })
        }else{
          _.toast('请完善内容');
        }
      }
    }
  },
  watch: {
    grade(){
      this.getTextbookAllVersion({grade: this.grade})
     .then((res)=>{
        this.math = this.textBookAllVersion.math[0].id.toString();
        (
          this.textBookAllVersion.physics.length == 0  ? 
          (this.physics = '') : 
          (this.physics = this.textBookAllVersion.physics[0].id.toString())
        )
     })
    }
  },
  computed:{
    ...mapGetters(['User','textBookAllVersion'])
  }
}
</script>
