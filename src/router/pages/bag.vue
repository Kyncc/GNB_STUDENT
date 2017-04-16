<template>
  <div class='bag'>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{showBack: false}">书包</x-header>
    <swiper :list="list" auto height="155px" :loop="true" :show-desc-mask="false" :interval="5000"></swiper>
    <group gutter="0">
      <cell title="知识图谱" link="report">
        <i class="icon iconfont icon-pie-chart" style="color:#794BB8" slot="icon"></i>
      </cell>
      <cell title="我的收藏本" link="collect">
        <i class="icon iconfont icon-box" style="color:#6DC6FF" slot="icon"></i>
      </cell>
      <cell title="我的班级" link="class">
        <i class="icon iconfont icon-hat" style="color:#ABC97C" slot="icon"></i>
        <template>
          <badge text="新通知" style="position:relative;top:-2px;"></badge>
        </template>
      </cell>
    </group>
  </div>
</template>

<script>
import {XHeader, Badge, Cell, Group, ViewBox, Swiper, SwiperItem} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'bag',
  components: {
    XHeader, Badge, Cell, Group, ViewBox, Swiper, SwiperItem
  },
  computed: {
    ...mapGetters(['User']),
    list () {
      return this.User.swiper['bag'].map((item, index) => ({
        url: 'javascript:;',
        img: item.url,
        title: item.title
      }))
    }
  }
}
</script>
