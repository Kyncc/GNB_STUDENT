<template >
  <view-box class="registerInfo">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: false}">资料填写</x-header>
    </div>
    <div style="padding-top:46px">
      <div class="icon">
        <img src="../assets/icon.png">
      </div>
      <div class="title">
        <img src="../assets/title.png">
      </div>
      <group title="基本资料">
        <selector title="年级" :options="gradeList" v-model="grade" @on-change="_onChangeGrade"></selector>
      </group>
      <group title="版本选择">
        <selector title="数学" :options="textBookAllVersion.math | covert" v-model="math" @on-change="_onChangeMath"></selector>
        <selector title="物理"  v-show="textBookAllVersion.physics.length != 0" :options="textBookAllVersion.physics | covert " v-model="physics" @on-change="_onChangePhysisc"></selector>
      </group>
      <div style="width:90%margin:1.5rem auto">
        <x-button type="primary" @click.native="_complete" :disabled="disable">完成</x-button>
      </div>
    </div>
  </view-box>
</template>

<script>
import { XHeader, ViewBox, XButton, XInput, Group, Cell, Selector } from 'vux'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    XHeader, ViewBox, XButton, XInput, Group, Cell, Selector
  },
  filters: {
    covert (obj) {
      let newObj = []
      obj.forEach((item, index) => {
        newObj.push({
          key: item.id.toString() || '',
          value: item.name.toString() || ''
        })
      })
      return newObj
    }
  },
  methods: {
    ...mapActions(['setNewUserInfo', 'getTextbookAllVersion']),
    _onChangeGrade (item) {
      this.grade = item
    },
    _onChangeMath (item) {
      this.math = item
    },
    _onChangePhysisc (item) {
      this.physics = item
    },
    _complete () {
      this.setNewUserInfo({
        name: this.username,
        school: this.school,
        mobile: this.registerMobile,
        subject: {
          math: this.math,
          physics: this.physics
        },
        grade: this.grade
      })
      .then(() => {
        this.$router.replace('/')
      })
    }
  },
  data () {
    return {
      username: '',
      school: '',
      math: '',
      physics: '',
      grade: '10',
      gradeList: [{key: '7', value: '七年级'}, {key: '8', value: '八年级'}, {key: '9', value: '九年级'}, {key: '10', value: '高中'}]
    }
  },
  computed: {
    ...mapGetters(['registerMobile', 'textBookAllVersion']),
    disable () {
      return false
    }
  },
  created () {
    this.getTextbookAllVersion({grade: this.grade})
    .then((res) => {
      this.math = this.textBookAllVersion.math[0].id.toString()
      this.textBookAllVersion.physics.length === 0
      ? (this.physics = '') : (this.physics = this.textBookAllVersion.physics[0].id.toString())
    })
  },
  watch: {
    grade () {
      this.getTextbookAllVersion({grade: this.grade})
      .then((res) => {
        this.math = this.textBookAllVersion.math[0].id.toString()
        this.textBookAllVersion.physics.length === 0
        ? (this.physics = '') : (this.physics = this.textBookAllVersion.physics[0].id.toString())
      })
    }
  }
}
</script>
