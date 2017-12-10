<template >
  <div>
    <group v-for="(item, pindex) in errorList" :title="item.name" :gutter="(pindex ? '10px' : '0px')" :key="pindex">
      <card v-for="(img, index) in item.imgList" :key="index" >
        <div slot="content">
          <div @click.native="show(pindex,index)">
            <img v-lazy="img.url+'-errorList'">
          </div>
        </div>
        <div slot="footer">
          <div class="weui-cell">
            <flexbox class="weui-cell__bd">
              <!-- <flexbox-item :span="4">
                <x-button mini type="primary" :plain="error.errorComment.length > 0" @click.native="_showErrorPopup(error, index)">{{error.errorComment.length ? error.errorComment : '错误原因'}}</x-button>
              </flexbox-item>
              <flexbox-item :span="4">
                <x-button mini type="primary" plain @click.native="$router.push({name: 'comment', params: {wbeid: error.id}})" v-if='error.comment'>查看点评</x-button>
              </flexbox-item> -->
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
    <!--错误选择 -->
    <div v-transfer-dom>
      <popup v-model="showErrorPopup" class="checker-popup">
        <group title='选择错误原因：'>
          <div style="padding:10px 10px 0 10px;">
            <checker type="radio" v-model="errorType.errorComment" default-item-class="check-item" selected-item-class="check-item-selected" disabled-item-class="check-item-disabled">
              <checker-item value="概念模糊" @on-item-click="onItemClick">概念模糊</checker-item>
              <checker-item value="粗心大意" @on-item-click="onItemClick">粗心大意</checker-item>
              <checker-item value="能力不够" @on-item-click="onItemClick">能力不够</checker-item>
            </checker>
          </div>
        </group>
      </popup>
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
import {Tabbar, TabbarItem, Checker, CheckerItem, Group, Card, Cell, Previewer, Flexbox, XButton, Popup, FlexboxItem, TransferDomDirective as TransferDom} from 'vux'
import {mapGetters} from 'vuex'
import Share from '@/components/share'

export default {
  name: 'error',
  components: {
    Tabbar, TabbarItem, Checker, CheckerItem, Flexbox, FlexboxItem, Card, Group, Popup, Cell, Previewer, XButton, Share
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
      errorType: {
        chapterId: '',
        id: '',
        errorComment: '',
        index: ''
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
    // 类型错误弹窗
    _showErrorPopup (error, index) {
      this.showErrorPopup = true
      this.errorType.index = index
      this.errorType.errorComment = error.errorComment
      this.errorType.id = error.id
      this.errorType.chapterId = error.chapterId
    },
    // 选择错误原因
    onItemClick (value) {
      this.showErrorPopup = false
      this.getStatisticsComment({
        chapterId: this.errorType.chapterId,
        index: this.errorType.index,
        errorComment: value,
        id: this.errorType.id,
        type: 'remember'
      }).then(() => {
        this.errorType.errorComment = ''
        this.$vux.toast.show({text: '设置错误原因成功!', type: 'text', time: 1500, position: 'bottom'})
      }).catch(() => {
        this.errorType.errorComment = ''
      })
    }
  }
}
</script>
<style scoped>
.checker-popup{
  background: #fff;
}
.check-item {
  background-color: #ddd;
  color: #222;
  font-size: 14px;
  padding: 8px 0;
  width:32%;
  margin-right: 0px;
  line-height: 18px;
  text-align:center;
  margin-bottom: 10px;
  border-radius: 15px;
}
.check-item-selected {
  background-color: #4cc0be;
  color: #fff;
}
.check-item-disabled {
  color: #999;
}
</style>