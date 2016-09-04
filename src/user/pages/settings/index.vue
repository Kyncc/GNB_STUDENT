<template>
  <div class='settings'>
      <x-header :left-options="{showBack: true}">设置</x-header>
      <group>
          <cell title="清除缓存" link="javascript:;" v-touch:tap="_clear">
              <span class="demo-icon" slot="icon"></span>
          </cell>
          <cell title="检查更新" value="当前版本号:V1.0.0" link="javascript:;">
              <span class="demo-icon" slot="icon"></span>
          </cell>
           <cell title="关注我们" value="微信公众号:guina_book" link="javascript:;">
              <span class="demo-icon" slot="icon"></span>
          </cell>
           <cell title="加入我们" value="qq群:458410557" link="javascript:;" v-touch:tap="_openQQ">
              <span class="demo-icon" slot="icon"></span>
          </cell>
           <cell title="关于我们" link="aboutUs">
              <span class="demo-icon" slot="icon"></span>
          </cell>
           <cell title="应用评分" link="javascript:;" v-touch:tap="_openStore">
              <span class="demo-icon" slot="icon"></span>
          </cell>
          <cell title="意见反馈" link="advice">
              <span class="demo-icon" slot="icon"></span>
          </cell>
      </group>
       <alert :show.sync="show" title="清除缓存成功"></alert>
  </div>

</template>

<script>
import {XHeader,Cell,Group,Alert} from 'vux'
import './setting.less'
export default{
  components: {
    XHeader,Cell,Group,Alert
  },
  data () {
    return {
      show: false
    }
  },
  methods:{
    _clear(){
      this.show = true;
    },
    _openQQ(){
      window.location.href = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=458410557&card_type=group&source=qrcode";
    },
    _openStore(){
      window.location.href = "market://details?id=io.dcloud.HelloH5";
    }
  }
}
</script>

<style lang="less">
body{
  -webkit-touch-callout:none
}
.settings{
  .vux-header{
    color:#fff;
    background-color:#4bb7aa;
  }
  .weui_cells{margin-top:0;}
  .vux-no-group-title{margin-top:0;}
  .vux-header .vux-header-left, .vux-header .vux-header-right{font-size:16px;}
  .vux-header .vux-header-left .vux-header-back:before{border-color:#fff;}
  .vux-header .vux-header-title, .vux-header h1{margin-left:88px;}
}
</style>
