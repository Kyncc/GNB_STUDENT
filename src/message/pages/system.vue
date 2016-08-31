<template>
  <div class='systemHomework vux-scroller-header-box'>
		<div style="height:46px;">
			<x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">系统消息</x-header>
		</div>
    <scroller lock-x scrollbar-y use-pullup use-pulldown @pullup:loading="loadMore" @pulldown:loading="refresh" :pullup-status.sync="pullupStatus" v-ref:scroller>
      <div class="box2">
        <p v-for="i in n">placeholder {{i}}</p>
      </div>
      <!--pullup slot-->
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="pullupStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">↑</span>
        <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
    </scroller>
  </div>   
</template>
<script>
import Vue from 'vue'
import Router from 'vue-router'
import {XHeader,Group,Scroller,Cell,Spinner } from 'vux'

export default {
  components: {
    XHeader,Scroller,Group,Cell,Spinner
  },
   methods: {
    loadMore (uuid) {
      setTimeout(() => {
        this.n += 10
        this.$nextTick(() => {
          this.$broadcast('pullup:reset', uuid)
        })
      }, 2000)
    },
    refresh (uuid) {
      setTimeout(() => {
        this.n = 10
        this.$nextTick(() => {
          this.$broadcast('pulldown:reset', uuid)
        })
      }, 2000)
    },
    changePullupStatus (enabled) {
      if (enabled) {
        this.$broadcast('pullup:enable', this.$refs.scroller.uuid)
        this.pullupEnabled = true
      } else {
        this.$broadcast('pullup:disable', this.$refs.scroller.uuid)
        this.pullupEnabled = false
      }
    },
    loadMore1 (uuid) {
      setTimeout(() => {
        this.n1 += 10
        this.$nextTick(() => {
          this.$broadcast('pullup:reset', uuid)
          if (this.n1 >= 30) {
            this.$broadcast('pullup:disable', uuid)
            console.log('No more data, Pullup disabled!')
          }
        })
      }, 2000)
    }
  },
  data () {
    return {
      n: 10,
      n1: 10,
      pullupEnabled: true,
      pullupStatus: 'default'
    }
  }
}
</script>



