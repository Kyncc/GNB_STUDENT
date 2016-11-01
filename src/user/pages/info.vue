<template>
<div class='info'>
  <x-header :left-options="{showBack: true,preventGoBack: true}"  @on-click-back="_back()">个人资料 <a slot="right" v-touch:tap="_complete">{{edit}}</a></x-header>
  <group v-show="edit=='编辑'">
    <x-input title="姓名" name="username" :value.sync="fetchUserInfo.name" readonly></x-input>
    <x-input title="性别" name="sex" value="女" v-show="fetchUserInfo.sex=='0'" readonly></x-input>
    <x-input title="性别" name="sex" value="男" v-show="fetchUserInfo.sex=='1'" readonly></x-input>
    <x-input title="年级" name="grade" value="高中" readonly></x-input>
    <x-input title="版本" name="textbook" value="人教A版" readonly></x-input>
    <x-input title="学校" name="school" :value.sync="fetchUserInfo.school" readonly></x-input>
  </group>
  <group v-show="edit=='完成'">
    <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name" :value.sync="name"></x-input>
    <cell title="性别">
      <checker :value.sync="sex" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
        <checker-item value="1">男</checker-item>
        <checker-item value="0">女</checker-item>
      </checker>
    </cell>
    <popup-picker title="版本" :data="bookList" :columns="2" :value.sync="bookVal" show-name></popup-picker>
    <popup-picker title="年级" :data="gradeList" :columns="2" :value.sync="gradeVal" show-name></popup-picker>
    <x-input title="学校" name="school" placeholder="请输入学校名称" :value.sync="school"></x-input>
  </group>
  <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="还未保存,确定返回吗" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>
</div>
</template>

<script>
import {Checker,CheckerItem,XHeader,XInput,Group,Cell,Confirm,PopupPicker} from 'vux'
import {getUserInfo,updateUserInfo} from '../actions'
import {fetchUserInfo,fetchToken} from '../getters'
import * as _ from '../../config/whole.js'

export default {
  components: {
    Checker,CheckerItem,XHeader,XInput,Group,Cell,Confirm,PopupPicker
  },
  data() {
    return {
      edit: '编辑',
      sex: '1',
      name: '',
      school: '',
      show: false,
      gradeVal:[],
      bookList: [
        {
          name: '数学',
          value: 'math',
          parent: 0
        }, {
          name: '物理',
          value: 'physical',
          parent: 0
        }, {
          name: '化学',
          value: 'chemistry',
          parent: 0
        }, {
          name: '人教A版本',
          value: 'mathRenJiaoA',
          parent: 'math'
        }, {
          name: '人教版',
          value: 'physicalRenJiao',
          parent: 'physical'
        }, {
          name: '人教版',
          value: 'chemistryRenJiao',
          parent: 'chemistry'
        }
      ],
      gradeList: [
        {
          name: '初中',
          value: 'middle',
          parent: 0
        }, {
          name: '高中',
          value: 'high',
          parent: 0
        }, {
          name: '七年级',
          value: 'middle1',
          parent: 'middle'
        }, {
          name: '八年级',
          value: 'middle2',
          parent: 'middle'
        }, {
          name: '九年级',
          value: 'middle3',
          parent: 'middle'
        }, {
          name: '高中',
          value: 'high1',
          parent: 'high'
        }
      ]  
    }
  },
  filters: {
    'sexs' (val) {
        console.log( val == "0")
      return ( val == "0") ? '女' : '男'
    }
  },
  vuex: {
    getters: {
      fetchUserInfo,
      fetchToken
    },
    actions: {
      getUserInfo,
      updateUserInfo
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
        this.name = this.fetchUserInfo.name
        this.sex = this.fetchUserInfo.sex
        this.school = this.fetchUserInfo.school
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
    this.getUserInfo({
      token: this.fetchToken
    }, () => {
      //判断是否为空
      if ((this.fetchUserInfo.grade == 0) && (this.fetchUserInfo.sex == 0) && (!this.fetchUserInfo.name) && (!this.fetchUserInfo.school)) {
        this.edit = '完成'
      }
    })

  }
}
</script>

<style lang="less">
.info {

    .weui_cells {
        margin-top: 0;
    }
    .vux-no-group-title {
        margin-top: 0;
    }
    .weui_input {
        text-align: right;
    }
    .demo2-item {
        width: 1.5rem;
        height: 1.5rem;
        border: 1px solid #ccc;
        display: inline-block;
        border-radius: 50%;
        line-height: 1.5rem;
        text-align: center;
    }
    .demo2-item-selected {
        border-color: #4bb7aa;
        background-color: #4bb7aa;
        color: #fff;
    }
}
</style>
