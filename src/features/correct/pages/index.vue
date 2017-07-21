<template>
  <view-box ref="gnb_correct" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '我要纠错'}">
      <p slot="right" @click="_commit">提交</p>
    </x-header>
    <group title="纠错类型">
      <checker style="padding:.25rem .75rem 1rem;"
        v-model="type"
        :max="4"
        type="checkbox"
        default-item-class="select-item"
        selected-item-class="select-item-selected"
        >
          <checker-item :value="0">答案错误</checker-item>
          <checker-item :value="1">解析不全</checker-item>
          <checker-item :value="2">题目超纲</checker-item>
          <checker-item :value="3">题型太老</checker-item>
          <checker-item :value="4">其他</checker-item>
      </checker>
    </group>
    <group title="纠错内容">
      <x-textarea :max="200" :rows="5" v-model="content" placeholder="请简单描述纠错内容"></x-textarea>
    </group>
  </view-box>
</template>

<script>
import {XHeader, XButton, ViewBox, Checker, CheckerItem, Group, XTextarea} from 'vux'
import {mapActions} from 'vuex'
import store from '@/store'
import modules from '../modules/store'

export default {
  components: {
    XHeader, XButton, Checker, CheckerItem, Group, XTextarea, ViewBox
  },
  computed: {
    id () {
      return this.$store.state.route.params.id
    },
    subejectId () {
      return this.$store.state.route.params.subjectId
    }
  },
  data () {
    return {
      type: [],
      content: ''
    }
  },
  methods: {
    ...mapActions(['postCorrect']),
    _commit () {
      if (this.type[0].length) {
        this.$vux.toast.show({text: '请选择纠错类型', type: 'text', time: 1500, position: 'bottom'})
        return
      }
      if (this.type.indexOf(4) >= 0 && this.content.length === 0) {
        this.$vux.toast.show({text: '请填写纠错内容', type: 'text', time: 1500, position: 'bottom'})
        return
      }
      let params = {
        content: this.content,
        type: this.type
      }
      this.postCorrect(params).then(() => {
        this.content = ''
        this.type = []
        history.back()
      })
    }
  },
  activated () {
    this.type = []
    this.content = ''
  },
  beforeCreate () {
    store.registerModule('correct', {
      ...modules
    })
  }
}
</script>

<style scoped>
.select-item {
  width: 5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  border-radius: 3px;
  color: #4bb7aa;
  border: 1px solid #4bb7aa;
  background-color: #fff;
  margin-right: .3rem;
  margin-top: .75rem;
}
.select-item-selected {
  background: #ffffff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTZDOEJBQ0E3NkIxMTFFNEE3MzJFOUJCMEU5QUM0QkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTZDOEJBQ0I3NkIxMTFFNEE3MzJFOUJCMEU5QUM0QkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNkM4QkFDODc2QjExMUU0QTczMkU5QkIwRTlBQzRCQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNkM4QkFDOTc2QjExMUU0QTczMkU5QkIwRTlBQzRCQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnMGp3kAAAAJUExURf9KAP///////4Jqdw0AAAADdFJOU///ANfKDUEAAAAuSURBVHjaTMpBDgAABAPB5f+PlhLUpZMWuQcYMWLEyDN4ymqa5KS4+3G+KAEGACQmAGlKzr56AAAAAElFTkSuQmCC) no-repeat right bottom;
  border-color: #ff4a00;
}
</style>
