<template>
  <div class="mainIndex">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{showBack: false}">归纳本-学生端</x-header>
    <swiper auto height="145px" :loop="true" :interval="8000">
      <swiper-item v-for="(item, index) in list" :key="index">
        <router-link :to="{path: `${item.url}`}">
          <img :src="item.img" style="width: 100%;height:145px">
        </router-link>
      </swiper-item>
    </swiper>
    <div style='padding-bottom:55px'>
      <flexbox style='height:6.3rem' :gutter='0'>
        <flexbox-item :span="4" @click.native="$router.push({ name: 'workbook'})" class='workbook'></flexbox-item>
        <flexbox-item :span="4" @click.native="$router.push({ name: 'camera'})" class='camera'></flexbox-item>
        <flexbox-item :span="4" @click.native="$router.push({ name: 'homework'})" class='homework'></flexbox-item>
      </flexbox>
      <flexbox style='height:6.3rem' :gutter='0'>
        <flexbox-item :span="4" @click.native="$router.push({ name: 'induce'})" class='induce'></flexbox-item>
        <flexbox-item :span="4" @click.native="$router.push({ name: 'statistics'})" class='statistics'></flexbox-item>
        <flexbox-item :span="4" @click.native="$router.push({ name: 'download'})" class='download'></flexbox-item>
      </flexbox>
      <flexbox style='height:6.3rem' :gutter='0'>
        <flexbox-item :span="4" @click.native="$router.push({ name: 'class'})" class='class'></flexbox-item>
        <flexbox-item :span="4" class='blank'></flexbox-item>
        <flexbox-item :span="4" class='blank'></flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import {XHeader, ViewBox, XButton, Swiper, SwiperItem, Flexbox, FlexboxItem} from 'vux'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, ViewBox, XButton, Swiper, SwiperItem, Flexbox, FlexboxItem
  },
  computed: {
    ...mapGetters(['User']),
    list () {
      return this.User.swiper.map((item, index) => ({
        url: `/article/${item.id}`,
        img: item.img + ''
      }))
    }
  },
  methods: {
    ...mapActions(['getUserInfo'])
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style>
.weui-loading_toast .weui-mask_transparent{
  z-index: 2 !important;
}
</style>
