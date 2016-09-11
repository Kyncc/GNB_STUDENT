<template>
<view-box v-ref:view-box class='member'>
  <x-header :left-options="{showBack: true}">我的会员 <a slot="right" v-touch:tap="_recharge">充值</a></x-header>
  <scroller lock-x scrollbar-y use-pulldown :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @pulldown:loading="load">
    <group>
      <div class="headimg">
        <img src="../../../assets/user/headimg.png" alt="" />
        <p>VIP</p>
      </div>

      <flexbox class="vux-1px-b">
        <flexbox-item class="vux-1px-r">
          <flexbox orient="vertical" v-touch:tap="_points">
            <flexbox-item>
              <div class="flex-key vux-1px-b">我的积分</div>
            </flexbox-item>
            <flexbox-item>
              <flexbox>
                <flexbox-item :span="4/10" class="points padnone"></flexbox-item>
                <flexbox-item :span="4/10" class="flex-value padnone">1000</flexbox-item>
              </flexbox>
            </flexbox-item>
          </flexbox>
        </flexbox-item>
        <flexbox-item>
          <flexbox orient="vertical" v-touch:tap="_recharge">
            <flexbox-item>
              <div class="flex-key vux-1px-b">余额</div>
            </flexbox-item>
            <flexbox-item>
              <flexbox>
                <flexbox-item :span="4/10" class="dollar padnone"></flexbox-item>
                <flexbox-item :span="4/10" class="flex-value padnone">0元</flexbox-item>
              </flexbox>
            </flexbox-item>
          </flexbox>
        </flexbox-item>
      </flexbox>
      <div class="content vux-1px-b vux-1px-t">
        <flexbox class="vux-1px-b" >
          <flexbox-item class="padnone disable title" :span="7/20" >
            我的特权
          </flexbox-item>
        </flexbox>
        <flexbox>
          <flexbox-item>
            拍错题
          </flexbox-item>
          <flexbox-item>
            归纳本
          </flexbox-item>
          <flexbox-item class="disable">
            知识图谱
          </flexbox-item>
        </flexbox>
        <flexbox>
          <flexbox-item class="disable">
            报听写
          </flexbox-item>
          <flexbox-item class="disable">
            刷题型
          </flexbox-item>
          <flexbox-item class="disable">
            高考系数分布图
          </flexbox-item>
        </flexbox>
        <flexbox>
          <flexbox-item class="disable">
            单词练习
          </flexbox-item>
          <flexbox-item class="disable">
            组卷
          </flexbox-item>
          <flexbox-item class="disable">
            在线考试
          </flexbox-item>
        </flexbox>
        <flexbox>
          <flexbox-item class="disable">
            我的作业
          </flexbox-item>
          <flexbox-item class="disable">
            找辅导老师
          </flexbox-item>
          <flexbox-item class="disable">
            参与活动
          </flexbox-item>
        </flexbox>
      </div>
    </group>
  </scroller>
</view-box>
</template>

<script>
import './member.less'
import {
  XHeader,
  Cell,
  Group,
  Alert,
  Flexbox,
  FlexboxItem,
  Scroller,
  ViewBox
}
from 'vux'
export default {
  components: {
    XHeader,
    Cell,
    Group,
    Alert,
    Flexbox,
    FlexboxItem,
    Scroller,
    ViewBox
  },
  methods: {
    load(uuid) {
      setTimeout(() => {
        this.$broadcast('pulldown:reset', uuid)
      }, 1000)
    },
    _points() {
      this.$router.go('points')
    },
    _recharge() {
      this.$router.go('recharge')
    }
  }
}
</script>
