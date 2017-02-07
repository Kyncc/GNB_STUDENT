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
        <x-input title="学校" name="school" :value.sync="school" readonly></x-input>
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
        <x-input title="学校" name="school" placeholder="请输入学校名称" :value.sync="school"></x-input>
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
      subjectId:""
    }
  },
  created(){
     this.name = this.User.name,
     this.school = this.User.school,
     this.sex = this.User.sex,
     this.subjectId = this.User.subjectId
  },
  methods: {
    ...mapActions(['getUserInfo','setUserInfo']),
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
  computed:{
    ...mapGetters(['User'])
  }
}
</script>
