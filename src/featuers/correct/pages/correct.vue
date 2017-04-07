<template>
  <view-box class="correctDetail">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">我要纠错
        <a slot="right" @click.native="_commit">提交</a>
      </x-header>
    </div>
    <div style="padding-top:46px">
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
        <x-textarea :max="200" :rows="6" v-model="content" placeholder="请简单描述纠错内容"></x-textarea>
      </group>
    </div>
  </view-box>
</template>

<script>
import { XHeader, XButton, ViewBox, Checker, CheckerItem, Group, XTextarea } from 'vux'
import { mapActions,mapGetters } from 'vuex'
import store from 'src/store'
import modules from '../modules/store'

store.registerModule('correct', {
  ...modules
})

export default {
  components: {
    XHeader, XButton, Checker, CheckerItem, Group, XTextarea, ViewBox 
  },
  methods: {
    ...mapActions(['postCorrect']),
    _commit () {
      if (!this.type[0] && this.type[0] != '0') {
        this.$vux.toast.show({text: '请选择纠错类型', type: 'text', time: 1000, position: 'bottom'})
        return
      }
      if (this.type.indexOf(4) >= 0 && this.content.length === 0) {
        this.$vux.toast.show({text: '请填写纠错内容', type: 'text', time: 1000, position: 'bottom'})
        return
      }
      let params = {
        content: this.content,
        type: this.type
      }
      this.postCorrect(params)
      .then(() => {
        this.content = ''
        this.type = []
        history.back()
      })
    }
  },
  data () {
    return {
       type: [],
       content:''
    }
  },
  computed: {
     id () {
       return this.$store.state.route.params.id
     },
     subejectId () {
       return this.$store.state.route.params.subjectId
     }
  }
}
</script>

