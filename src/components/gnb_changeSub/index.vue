<template>
  <div class="gnb-changeSub">
    <p @click='onDisplay()'>
      {{selected | subject}}
      <span class="with_arrow"></span>
    </p>
    <mt-popup v-model="visible" popup-transition="popup-fade" class="gnb-changeSub-popup">
      <template v-for="(item, index) in subjectAllList">
        <p @click="onClickBack(item)" :class="item.id  === selected ? 'active' : ''"  :key='index'>{{item.value}}</p>
      </template>
    </mt-popup>
  </div>
</template>

<script>
import { Popup } from 'mint-ui'
import './index.less'

export default {
  components: {
    'mt-popup': Popup
  },
  data () {
    return {
      visible: false,
      selected: 2,
      path: this.$route.fullPath,
      subjectAllList: [
        { id: 2, value: '数学', key: 'math' },
        { id: 7, value: '物理', key: 'physics' },
        { id: 8, value: '化学', key: 'chemistry' }
      ]
    }
  },
  methods: {
    onDisplay () {
      this.visible = true
    },
    // 点击科目确定的回调
    onClickBack (item) {
      if (this.selected !== item.id) {
        this.selected = item.id
        this.$emit('update:change', item.id)
      }
      this.visible = false
    }
  },
  created () {
    this.$emit('update:change', this.selected)
  }
}
</script>
