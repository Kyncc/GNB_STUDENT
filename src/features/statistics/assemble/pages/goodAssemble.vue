<template>
  <view-box body-padding-top="46px" body-padding-bottom="40px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '精选题'}"></x-header>
    </div>
    <div slot='default'>
      <div v-for="(list, pindex) in block" :key="pindex" v-show='!loading'>
        <div class="weui-cells__title">{{list.name}}</div>
        <card v-for="(item, index) in list.list" :key="index">
          <div slot="content"
           @click="$router.push({name:'example', params: {subjectId: item.subject_id, grade: item.grade, id: item.exercisesId, type: (item.form === 1 ? 'exercises' : 'lxexercises')}})">
            <div v-html="item.stem"></div>
            <div v-for="(value, key) in item.opt" :key='key' style="padding-top:5px;">
              {{ key }}：<p v-html="value" style="display:inline-block"></p>
            </div>
          </div>
          <div slot="footer">
            <div class="weui-cell weui-cell_link">
              <div class="weui-cell__bd">
                <flexbox>
                  <flexbox-item :span="4" class='center' @click.native="setStatisticsGoodAssembleOrder({type: 'up', pindex:pindex, index:index})">
                    <i class="icon iconfont icon-up"></i>上移
                  </flexbox-item>
                  <flexbox-item :span="4" class='center' @click.native="setStatisticsGoodAssembleOrder({type: 'down', pindex:pindex, index:index})">
                    <i class="icon iconfont icon-down"></i>下移
                  </flexbox-item>
                  <flexbox-item :span="4" class='center' @click.native="setStatisticsGoodAssembleOrder({type: 'del', pindex:pindex, index:index})">
                    <i class="icon iconfont icon-lajitong16"></i>删除
                  </flexbox-item>
                </flexbox>
              </div>
            </div>
          </div>
        </card>
      </div>
      <div style="text-align:center;padding:10px 0;">
        <spinner v-if="loading" type="lines"></spinner>
        <p v-else-if="!block.length" style="font-size:16px;color:#4cc0be">该科目还未组卷</p>
        <p v-else-if="error" @click='_getData()' style="font-size:16px;color:#4cc0be">出错了点我重新加载</p>
      </div>
      <share :change.sync='showAction' :showAction='showAction' :content='share.content'
        :title='share.title'
        :href='share.href'
        @on-share-success='_shareSuccess()'>
      </share>
    </div>
    <tabbar slot="bottom" style='background-color:#4cc0be;color:#fff' v-show='block && block.length'>
      <flexbox-item :span="12" style="font-size:.8rem;text-align:center;padding:.25rem 0" @click.native="_download()">
        <i class="icon iconfont icon-download"></i>下载</flexbox-item>
      </flexbox>
    </tabbar>
  </view-box>
</template>

<script>
import {ViewBox, Tabbar, XHeader, Group, Card, Cell, Spinner, Flexbox, FlexboxItem, XButton} from 'vux'
import {mapActions, mapGetters} from 'vuex'
import Share from '@/components/share'

export default {
  name: 'goodAssemble',
  components: {
    ViewBox, Tabbar, XHeader, Group, Card, Cell, Spinner, Flexbox, FlexboxItem, XButton, Share
  },
  computed: {
    ...mapGetters(['AssembleGood']),
    block () {
      return this.AssembleGood.download || []
    }
  },
  data () {
    return {
      loading: true,
      error: false,
      showAction: false,
      share: {
        content: '试卷分享',
        title: '我的记错题组卷',
        href: ''
      }
    }
  },
  methods: {
    ...mapActions(['getStatisticsGoodAssemble', 'clearStatisticsDownload', 'getStatisticsAssemblUrl', 'setStatisticsGoodAssembleOrder', 'setStatisticsGoodAssembleList']),
    _getData () {
      this.clearStatisticsDownload({type: 'good'})
      this.loading = true
      this.getStatisticsGoodAssemble().then(() => {
        this.error = false
        this.loading = false
      }).catch((e) => {
        this.error = true
        this.loading = false
      })
    },
    _shareSuccess () {
      let that = this
      this.$vux.alert.show({
        title: '下载成功',
        content: '请到我的下载查看',
        dialogTransition: '',
        onHide () {
          that._getData()
        }
      })
    },
    _download () {
      this.getStatisticsAssemblUrl({type: 'good'})
        .then((res) => {
          this.share.href = res.data.data.url
          this.showAction = true
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm._getData()
    })
  },
  beforeRouteLeave (to, from, next) {
    // 弹窗的返回键处理
    if (this.showAction) {
      this.showAction = false
    }
    next()
  }
}
</script>
<style scoped>
.weui-btn + .weui-btn{
  margin-top:0;
}
.center{
  text-align:center;
}
</style>
