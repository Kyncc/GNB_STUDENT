<template>
  <view-box body-padding-top="46px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '筛选'}">
        <div slot="right" @click='_finish()'>确定</div>
      </x-header>
    </div>
    <div>
      <div style='padding:10px;'>
        <span class='searchtitle'>学段：</span>
        <checker style='padding-left:.5rem;' v-model="grade" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
          <checker-item value="789">初中</checker-item>
          <checker-item value="10">高中</checker-item>
        </checker>

        <span class='searchtitle'>学科：</span>
        <checker style='padding-left:.5rem;' v-model="subjectId" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
          <checker-item value="2">数学</checker-item>
          <checker-item value="7">物理</checker-item>
        </checker>
        <span class='searchtitle'>版本：</span>
        <checker style='padding-left:.5rem;' v-model="editionId" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
          <checker-item v-for='(item, index) in CameraOptions.textbookList[grade][subjectId]' :key='index' :value="item.id">{{item.name}}</checker-item>
        </checker>
        <template v-if='!isPoints'>
          <span class='searchtitle'>教材：</span>
          <checker style='padding-left:.5rem;' v-model="textbookId" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
            <checker-item v-for='(item, index) in CameraOptions.textbookList[grade][subjectId][0].textbook' :key='index' :value="item.id">{{item.name}}</checker-item>
          </checker>
        </template>
      </div>
    </div>
  </view-box>
</template>
<script>
import {XButton, Checker, CheckerItem, XHeader, ViewBox, Group, Cell, Spinner} from 'vux'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'options',
  components: {
    XButton, Checker, CheckerItem, XHeader, ViewBox, Group, Cell, Spinner
  },
  computed: {
    ...mapGetters(['User', 'CameraOptions'])
  },
  data () {
    return {
      grade: '10',
      subjectId: '',
      editionId: '',
      textbookId: '',
      loading: true,
      isPoints: false
    }
  },
  methods: {
    ...mapActions(['Route', 'setCameraOptions', 'getCameraOptionsTextbook']),
    _finish () {
      this.setCameraOptions({
        textbook: this.textbookId,
        editionId: this.editionId,
        subject: this.subjectId,
        grade: this.grade
      })
      this.$router.go(-1)
    }
  },
  watch: {
    grade () {
      this.editionId = this.CameraOptions.textbookList[this.grade][this.subjectId.toString()][0]['id']
      this.textbookId = this.CameraOptions.textbookList[this.grade][this.subjectId.toString()][0]['textbook'][0].id
    },
    subjectId () {
      this.editionId = this.CameraOptions.textbookList[this.grade][this.subjectId.toString()][0]['id']
      this.textbookId = this.CameraOptions.textbookList[this.grade][this.subjectId.toString()][0]['textbook'][0].id
    }
  },
  created () {
    this.subjectId = this.User.subjectId
    this.getCameraOptionsTextbook().then(() => {
      this.editionId = this.CameraOptions.textbookList[this.grade][this.subjectId.toString()][0]['id']
      this.textbookId = this.CameraOptions.textbookList[this.grade][this.subjectId.toString()][0]['textbook'][0].id
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.isPoints = (from.name === 'camera_points')
    })
  }
}
</script>
<style lang="less" scoped>
.searchtitle{
  font-size:14px;
  color:#333;
}
.demo4-item {
  background-color: #fff;
  color: #333;
  font-size: 14px;
  width:22%;
  border:1px solid #ccc;
  text-align: center;
  padding:7px 0;
  margin:.25rem;
  line-height: 18px;
  border-radius: 5px;
}
.demo4-item-selected {
  border:1px solid #4cc0be;
  background-color: #4cc0be;
  color: #fff;
}
.demo4-item-disabled {
  color: #999;
}
</style>
