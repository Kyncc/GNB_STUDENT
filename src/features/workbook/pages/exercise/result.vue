<template>
  <div>
    <template v-if="!isUpload">
      <flexbox wrap="wrap" :gutter="0" style="margin-top:5rem;" @click.native="$router.push({name:'workbook_uploader'})">
        <flexbox-item :span="12">
          <div style="text-align:center">
            <i class="icon iconfont icon-camera" style="font-size:5rem;color:#4BB7AA"></i>
          </div>
        </flexbox-item>
        <flexbox-item :span="12">
          <p style="text-align:center;margin-top:-1rem;font-size:.85rem;color:#4BB7AA">请先上传作业再查看答案，最多5张</p>
        </flexbox-item>
      </flexbox>
    </template>
    <template v-else>
      <group-title style="margin:10px 0;">答案列表</group-title>
      <flexbox wrap="wrap" align="baseline" :gutter="0">
        <flexbox-item :span="3" v-for="(img, index) in resultImg" :key="index" @click.native="show(index)" style="text-align:center;margin-bottom:10px;">
          <img v-lazy="img.url+'?imageMogr2/auto-orient/thumbnail/65x90!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim'"  width="65" height="90" class="previewer-answer-img"/>
        </flexbox-item>
      </flexbox>
    </template>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
import {Flexbox, FlexboxItem, GroupTitle, Previewer, TransferDomDirective as TransferDom} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'result',
  components: {Flexbox, FlexboxItem, GroupTitle, Previewer},
  directives: {
    TransferDom
  },
  computed: {
    ...mapGetters(['workbookExercise']),
    resultImg () {
      return this.workbookExercise.list.resultImg
    },
    isUpload () {
      if (!this.workbookExercise.list.bindTeacher) return true
      else {
        return Boolean(this.workbookExercise.list.bindTeacher && this.workbookExercise.list.practiceImg.length)
      }
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
