<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '修改资料'}"></x-header>
    <group gutter="0">
      <cell title="头像" @click.native="show = !show">
        <img slot="default" v-lazy="User.headImg" width="60" height="60"/>
      </cell>
      <x-input title="姓名" v-model="name" class="input_right"></x-input>
      <cell title="性别">
        <checker slot="default" v-model="sex" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
          <checker-item value="1">男</checker-item>
          <checker-item value="0">女</checker-item>
        </checker>
      </cell>
    </group>
    <group>
      <selector v-model="year" title="年级" :options="list"></selector>
      <x-input title="学校" v-model="school" class="input_right"></x-input>
    </group>
    <group>
      <selector v-if="math" v-model="math" title="数学" :options="mathList"></selector>
      <selector v-if="physics" v-model="physics" title="物理" :options="physicsList"></selector>
      <!-- <selector v-if="chemistry" v-model="chemistry" title="化学" :options="chemistryList"></selector> -->
    </group>
    <group>
      <cell title="修改密码" :link="{name: 'settings_pwd'}" is-link></cell>
    </group>
    <actionsheet v-model="show" :menus="menus" @on-click-menu="_menusClick"></actionsheet>
  </view-box>
</template>

<script>
import {XHeader, Group, ViewBox, XInput, Checker, CheckerItem, Selector, Cell, Actionsheet} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'update',
  components: {
    XHeader, Group, ViewBox, XInput, Checker, CheckerItem, Selector, Cell, Actionsheet
  },
  computed: {
    ...mapGetters(['User']),
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
    chemistryList () {
      let newObj = []
      this.User.textbookAll.chemistry.forEach((item, index) => {
        newObj.push({
          key: item.id.toString() || '',
          value: item.name.toString() || ''
        })
      })
      return newObj
    }
  },
  data () {
    return {
      name: '',
      sex: 0,
      school: '',
      year: '',
      math: '',
      physics: '',
      chemistry: '',
      list: [{key: '7', value: '七年级'}, {key: '8', value: '八年级'}, {key: '9', value: '九年级'}, {key: '10', value: '高一'}, {key: '11', value: '高二'}, {key: '12', value: '高三'}],
      show: false,
      menus: {
        menu1: '拍照',
        menu2: '选择照片'
      }
    }
  },
  methods: {
    ...mapActions(['setHeadImg', 'setUserInfo', 'getTextbookVersion', 'getUserInfo']),
    _getImage () {
      // 唤起本机相机
      let cmr = plus.camera.getCamera()
      cmr.captureImage((p) => {
        plus.io.resolveLocalFileSystemURL(p, (entry) => {
          this.setHeadImg(entry.toLocalURL())
          this.$router.push({name: 'settings_photo'})
        })
      })
    },
    _galleryImgs () {
      plus.gallery.pick((e) => {
        this.setHeadImg(e.files[0])
        this.$router.push({name: 'settings_photo'})
      }, () => {
        this.$vux.toast.show({text: '您已取消选择图片', type: 'text', time: 1500, position: 'bottom'})
      }, {
        filter: 'image',
        multiple: true
      })
    },
    _menusClick (val) {
      val === 'menu1' ? this._getImage() : this._galleryImgs()
    }
  },
  watch: {
    year (value) {
      this.getTextbookVersion({'grade': value}).then(() => {
        this.math = this.User.textbookAll.math[0].id
        this.physics = (this.User.textbookAll.subjectType.indexOf('physics') >= 0 ? this.User.textbookAll.physics[0].id : '')
        this.chemistry = (this.User.textbookAll.subjectType.indexOf('chemistry') >= 0 ? this.User.textbookAll.chemistry[0].id : '')
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.name = vm.User.name
      vm.school = vm.User.school
      vm.year = vm.User.year
      vm.sex = vm.User.sex
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'user') {
      return (async () => {
        // 保存用户信息
        await this.setUserInfo({
          name: this.name, sex: this.sex, school: this.school, year: this.year, subject: { math: this.math, physics: this.physics, chemistry: this.chemistry }
        })
        // 若更改年级需要重启APP
        if (this.year !== this.User.year) plus.runtime.restart()
        // 重新获取用户信息
        await this.getUserInfo()
        next()
      })()
    } else {
      next()
    }
  }
}
</script>

<style lang="less">
.input_right .weui-input{
  text-align:right;
}
.demo2-item {
  width: 27px;
  height: 27px;
  border: 1px solid #ccc;
  display: inline-block;
  border-radius: 50%;
  line-height: 23px;
  text-align: center;
}
.demo2-item-selected{
  border: 1px solid #4cc0be;
  color: #4cc0be;
}
.weui-cell_select .weui-select{
  direction: rtl !important;
}
</style>
