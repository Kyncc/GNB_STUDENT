<template >
    <view-box v-ref:view-box class="rememberChapter">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                第一课时
            </x-header>
        </div>

        <div style="padding-top:46px;">
            <header class="sectionHeader ellipsis">课时1</header>
            <div class="section">
                <article class="recordBlock">
                    <header><h1 style="color:#487d68">过基础</h1></header>
                    <p class="point">知识点1</p>
                    <div><p class="per-20 tl">1</p><p class="per-60">错<span style="color:orange">3</span>人</p><x-button class="per-20" type='primary' mini>例题</x-button></div>
                    <div><p class="per-20 tl">1</p><p class="per-60">错<span style="color:orange">3</span>人</p><x-button class="per-20" type='primary' mini>例题</x-button></div>
                    <div><p class="per-20 tl">1</p><p class="per-60">错<span style="color:orange">3</span>人</p><x-button class="per-20" type='primary' mini>例题</x-button></div>
                    <div><p class="per-20 tl">1</p><p class="per-60">错<span style="color:orange">3</span>人</p><x-button class="per-20" type='primary' mini>例题</x-button></div>
                    <div><p class="per-20 tl">1</p><p class="per-60">错<span style="color:orange">3</span>人</p><x-button class="per-20" type='primary' mini>例题</x-button></div>
                    <div><p class="per-20 tl">1</p><p class="per-60">错<span style="color:orange">3</span>人</p><x-button class="per-20" type='primary' mini>例题</x-button></div>
                </article>
            </div>
        </div>
    </view-box>


</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import { XHeader,Panel,ViewBox,Group,Cell,XButton} from 'vux'
import { token } from '../../common/getters'
import '../index.less'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,XButton
  },
  methods: {

  },
  vuex: {
    getters:{
        token
    },
    actions:{

    }
  },
  store
}
</script>
