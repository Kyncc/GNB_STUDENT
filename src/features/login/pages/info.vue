<template >
  <view-box class="registerInfo">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:1">
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
        <selector v-model="grade" title="年级" :options="gradeList"></selector>
      </group>
      <group title="版本选择">
        <selector v-model="math" title="数学" :options="mathList"></selector>
        <selector v-if="User.textbookAll.subjectType.length === 2" v-model="physics" title="物理" :options="physicsList"></selector>
      </group>
      <div style="width:90%;margin:1.5rem auto">
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
  methods: {
    ...mapActions(['setUserInfo', 'getTextbookVersion']),
    _onChangeMath (item) {
      this.math = item
    },
    _onChangePhysisc (item) {
      this.physics = item
    },
    _complete () {
      this.setUserInfo({
        name: this.username,
        school: this.school,
        mobile: this.registerMobile,
        subject: {
          math: this.math,
          physics: this.physics
        },
        grade: this.grade
      }).then(() => {
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
    ...mapGetters(['registerMobile', 'textBookAllVersion', 'User']),
    mathList () {
      let newObj = []
      this.User.textbookAll.math.forEach((item, index) => {
        newObj.push({
          key: item.id.toString() || '',
          value: item.name.toString() || ''
        })
      })
      return newObj
    },
    physicsList () {
      let newObj = []
      this.User.textbookAll.physics.forEach((item, index) => {
        newObj.push({
          key: item.id.toString() || '',
          value: item.name.toString() || ''
        })
      })
      return newObj
    },
    disable () {
      return false
    }
  },
  watch: {
    grade (value) {
      this.getTextbookVersion({'grade': value}).then(() => {
        this.math = this.User.textbookAll.math[0].id
        if (this.User.textbookAll.subjectType.length === 2) {
          this.physics = this.User.textbookAll.physics[0].id
        }
      })
    }
  },
  mounted () {
    this.getTextbookVersion({'grade': this.grade}).then(() => {
      this.math = this.User.textbookAll.math[0].id
      if (this.User.textbookAll.subjectType.length === 2) {
        this.physics = this.User.textbookAll.physics[0].id
      }
    })
  }
}
</script>
