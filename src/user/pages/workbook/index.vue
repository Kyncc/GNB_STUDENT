<template>
<view-box v-ref:view-box class='workbookIndex'>

   <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true,preventGoBack:true}" @on-click-back="_back()">
          我的习题册
          <a slot="right" >
              科目
          </a>
      </x-header>
  </div>

  <div style="padding-top:46px;">
      <group title="必修一">
          <cell title="5年高考三年模拟" ></cell>
          <cell title="启东中学作业本" ></cell>
          <cell title="全科王" ></cell>
      </group>

      <group title="必修二">
          <cell title="5年高考三年模拟" ></cell>
          <cell title="启东中学作业本" ></cell>
          <cell title="全科王" ></cell>
      </group>

  </div>  
  <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom" >
      <x-button style="width:100%;border-radius:0px;"  @click="_addWorkbook()">习题册添加</x-button>
  </tabbar>

</view-box>
</template>

<script>
import {XHeader, XInput,Cell,Group, ViewBox,Tabbar,XButton} from 'vux'
import { period_id,subject_id,token } from '../../../common/getters'
import gnbChangeSub from '../../../components/changesub/index.vue'
import './index.less'

export default {
  components: {
    XHeader, XInput,Cell,Group, ViewBox,Tabbar,XButton
  },
  methods: {
    _back() {
      this.$router.go('/main/user');
    },
    _addWorkbook(){
      this.$router.go('add');
    }
  }
}
</script>


