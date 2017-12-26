<template >
  <div>
    <group v-for="(item, pindex) in errorList" :title="item.name" :gutter="(pindex ? '10px' : '0px')" :key="pindex" style='background:#F3F9F8'>
      <card v-for="(img, index) in item.imgList" :key="index">
        <div slot="content">
          <div @click="show(pindex,index)">
            <img v-lazy="img.url+'-errorList'">
          </div>
        </div>
        <div slot="footer">
          <div class="weui-cell">
            <flexbox class="weui-cell__bd" style='color:#586C94;font-size:.7rem;'>
              <flexbox-item :span="4">
                <select v-model="img.errorType" @change='_changeErrorComment(pindex, index, img, img.errorType)' class='select-btn weui-btn weui-btn_primary'>
                  <option>概念模糊</option>
                  <option>粗心大意</option>
                  <option>能力不够</option>
                  <option>未填写</option>
                </select>
                <!-- <x-button mini type="primary" :plain="img.errorType !== '未填写'" @click='_showErrorPopup(img, index)'>{{img.errorType === '未填写' ? '错误原因' : img.errorType}}</x-button> -->
              </flexbox-item>
              <flexbox-item :span="3">
                难度{{img.degree}}
              </flexbox-item>
              <flexbox-item :span="5">{{img.chapterName}}</flexbox-item>
            </flexbox>
          </div>
        </div>
      </card>
    </group>
    <div v-if='errorList.length === 0'>
      <p style="font-size:16px;color:#4cc0be;text-align:center;padding:1rem 0;">暂无错题~</p>
    </div>
    <!--照片放大 -->
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
    <!--下载错题 -->
    <div v-transfer-dom>
      <tabbar>
        <tabbar-item style='line-height:42px;height:42px;' v-if="$route.name === 'workbook_exercise_error'">
          <div slot="label" style='line-height:42px;height:42px;'>
            <x-button v-if="errorList.length" type="primary" @click.native="showAction = true" style='border-radius:0;'>下载</x-button>
          </div>
        </tabbar-item>
      </tabbar>
    </div>
    <!--下载分享 -->
    <share :change.sync='showAction' :showAction='showAction' :content='share.content' :title='share.title' :href="workbookExercise.list.url"></share>
  </div>
</template>

<script>
import {Tabbar, TabbarItem, Checker, CheckerItem, Group, Card, Cell, Previewer, Flexbox, XButton, FlexboxItem, PopupRadio, TransferDomDirective as TransferDom} from 'vux'
import {mapActions, mapGetters} from 'vuex'
import Share from '@/components/share'

export default {
  name: 'error',
  components: {
    Tabbar, TabbarItem, Checker, CheckerItem, PopupRadio, Flexbox, FlexboxItem, Card, Group, Cell, Previewer, XButton, Share
  },
  computed: {
    ...mapGetters(['workbookExercise']),
    errorList () {
      return this.workbookExercise.list.errorList || []
    }
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      list: [{}],
      showErrorPopup: false,
      options: {
        preload: [1, 1],
        bgOpacity: 1,
        fullscreenEl: false,
        history: true
      },
      showAction: false,
      share: {
        content: '错题下载',
        title: '归纳本学生端',
        href: ''
      }
    }
  },
  methods: {
    ...mapActions(['workbookExErrorUpload']),
    show (pindex, index) {
      this.list = []
      this.list.push({
        src: this.errorList[pindex].imgList[index].url,
        w: this.errorList[pindex].imgList[index].width,
        h: this.errorList[pindex].imgList[index].height
      })
      this.$nextTick(() => {
        this.$refs.previewer.show(0)
      })
    },
    // 选择错误原因
    _changeErrorComment (pindex, index, error, val) {
      this.workbookExErrorUpload({
        errorComment: val,
        wbeid: error.wbeid
      })
    }
  }
}
</script>
<style scoped>
.select-btn{
  font-size: .7rem;
  -webkit-appearance: none;
  border: 0;
  outline: 0;
  margin: 0 !important;
}
</style>
