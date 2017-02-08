<template>
  <div class='userinfo'>
    <x-header :left-options="{showBack: true,preventGoBack: true}"  @on-click-back="_back()">
      个人资料
      <a slot="right" @click="_complete">{{edit}}</a>
    </x-header>

    <div v-show="edit=='编辑'">
      <group title="基本资料">
        <x-input title="姓名" name="username" :value.sync="name" readonly></x-input>
        <x-input title="性别" name="sex" value="女" v-show="sex=='0'"readonly></x-input>
        <x-input title="性别" name="sex" value="男" v-show="sex=='1'" readonly></x-input>
        <x-input title="年级" name="grade" :value.sync="gradeName" readonly></x-input>
        <x-input title="学校" name="school" :value.sync="school" readonly></x-input>
      </group>
      <group title="版本选择">
        <x-input title="数学" name="math" :value.sync="mathName" readonly></x-input>
        <x-input v-show="physicsName.length != 0 " title="物理" name="physics"  :value.sync="physicsName" readonly></x-input>
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
          <!--<selector title="数学" :options="TextBookMathVer | covert" :value.sync="math" @on-change="_onChangeMath"></selector>
          <selector title="物理"  v-show="this.TextBookPhysicsVer.length != 0" :options="TextBookPhysicsVer | covert " :value.sync="physics" @on-change="_onChangePhysisc"></selector>
          -->
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
      mathName:'',
      physicsName:'',
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
     this.mathName = this.User.subject.math.name
     this.physicsName = (!this.User.subject.physics ? '':this.User.subject.physics.name )
  },
  methods: {
    ...mapActions(['getUserInfo','setUserInfo','getTextbookVersion']),
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
      }
    },
    _complete() {
      if (this.edit == '编辑') {
        this.edit = '完成'
      } else if (this.edit == '完成') {
        if(this.name && this.school){
          
          this.setUserInfo({
              name: this.name,
              sex: this.sex,
              school: this.school,
              token: this.token
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
     this.getTextbookVersion({grade: this.grade})
    }
  },
  computed:{
    ...mapGetters(['User']),
    gradeName(){
      console.log(this.grade);
      switch(this.grade){
        case '7' : return '七年级';
        case '8' : return '八年级';
        case '9' : return '九年级';
        case '10' : return '高中';
      }
    }
  }
}
</script>
