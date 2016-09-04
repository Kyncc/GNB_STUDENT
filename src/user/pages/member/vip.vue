<style lang="less">
body {
    -webkit-touch-callout: none;
}

.member {
    .headimg {
        width: 100%;
        height: 286/40rem;
        background: url('../../../assets/user/headbg.jpg') no-repeat;
        background-size: 100%;
        padding-top: 80/40rem;
        img {
            width: 139/40rem;
            height: 139/40rem;
            border-radius: 70/40rem;
            margin: 0 auto;
            display: block;
        }
        p {
            color: #fff;
            text-align: center;
            margin-top: 50/40rem;
        }
    }
    .vux-flexbox-item {
        background: #fff;
        margin: 0 !important;
        padding: 0 36/40rem;
        .flex-key {
            height: 96/40rem;
            line-height: 96/40rem;
            text-align: center;
            font-size: 32/40rem;
        }
        .flex-value {
            height: 96/40rem;
            line-height: 96/40rem;
            text-align: center;
            color: #ff9800;
            font-size: 32/40rem;
        }
        .points {
            height: 96/40rem;
            background: url('../../../assets/user/points.png') no-repeat right center /52/40rem auto;
        }
        .dollar {
            height: 96/40rem;
            background: url('../../../assets/user/dollar.png') no-repeat right center /52/40rem auto;
        }
    }
    .content {
        background: #fff;
        margin-top: 12/40rem;
        .title{
            height: 90/40rem !important;
        }
        .vux-flexbox {
            .vux-flexbox-item {
                align-items: center;
                display: flex;
                height: 125/40rem;
                font-size: 32/40rem;
                text-align: center;
                padding: 0 1.4rem;
                justify-content: center;
                .upgrade {
                    color: #29b6f6;
                    font-size: 28/40rem;
                    border: 1px solid #cacaca;
                    background: #fff;
                    border-radius: 3px;
                    padding: 14/40rem 24/40rem;
                }
            }
        }
    }
}

.disable {
    color: #adadad;
}

.padnone {
    padding: 0 !important;
}

.vux-1px-r {
    border-right: 1px solid #d2d2d2;
}

.vux-1px-b {
    border-bottom: 1px solid #d2d2d2;
}

.vux-1px-t {
    border-top: 1px solid #d2d2d2;
}
</style>

<template>
<div class='member'>
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
</div>
</template>

<script>
import {
  XHeader,
  Cell,
  Group,
  Alert,
  Flexbox,
  FlexboxItem,
  Scroller
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
    Scroller
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
