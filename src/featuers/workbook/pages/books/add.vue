<template>
  <view-box ref="workbookAdd" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: '添加习题册'}"></x-header>
    <group gutter="0">
      <cell v-for="i in 7" :key="i">
        <img class="previewer-workbook-img" src="https://placekitten.com/60/80" @click="show" slot="icon" width="60" height="80">
        <p slot="after-title">&nbsp;&nbsp;&nbsp;我是练习册标题</p>
        <x-button mini type="primary" slot="default">+添加</x-button>
        <x-button mini type="warn" slot="default">-删除</x-button>
      </cell>
    </group>
    <previewer :list="list" ref="workbookPreviewer" :options="options"></previewer>
  </view-box>
</template>

<script>
import {XHeader, Group, Cell, XButton, ViewBox, Previewer, TransferDomDirective as TransferDom} from 'vux'
import {mapActions} from 'vuex'

export default {
  name: 'workbookAdd',
  directives: {
    TransferDom
  },
  components: {
    XHeader, Group, Cell, XButton, ViewBox, Previewer
  },
  data () {
    return {
      textbookId: '',
      list: [{
        src: 'https://placekitten.com/600/400',
        w: 600,
        h: 400
      }],
      options: {
        history: true,
        pinchToClose: true,
        closeOnScroll: false,
        closeOnVerticalDrag: false,
        errorMsg: '加载图片失败...',
        getThumbBoundsFn: (index) => {
          let thumbnail = document.querySelectorAll('.previewer-workbook-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      }
    }
  },
  methods: {
    ...mapActions(['']),
    show () {
      this.$refs.workbookPreviewer.show('0')
    }
  }
}
</script>
