<template>
  <div>
    <group-title style="margin:10px 0;">答案列表</group-title>
    <flexbox wrap="wrap"  align="baseline" :gutter="0">
      <flexbox-item :span="3" v-for="(img, index) in resultImg" :key="index" @click.native="show(index)" style="text-align:center">
        <img :src="img.url+'-answer'" class="previewer-answer-img"/>
      </flexbox-item>
    </flexbox>
    <previewer :list="list" ref="previewer" :options="options"></previewer>
  </div>
</template>

<script>
import {Flexbox, FlexboxItem, GroupTitle, Previewer} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'result',
  components: {Flexbox, FlexboxItem, GroupTitle, Previewer},
  computed: {
    ...mapGetters(['workbookExercise']),
    resultImg () {
      return this.workbookExercise.list.resultImg
    },
    list () {
      let list = []
      if (this.resultImg) {
        for (let arr of this.resultImg) {
          list.push({
            w: Number(arr.width) / 2,
            h: Number(arr.height) / 2,
            src: `${arr.url}-answerBig`
          })
        }
      }
      return list
    }
  },
  data () {
    return {
      options: {
        preload: [1, 1],
        bgOpacity: 1,
        fullscreenEl: false,
        history: true,
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-answer-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      }
    }
  },
  methods: {
    show (index) {
      this.$refs.previewer.show(index)
    }
  }
}
</script>
