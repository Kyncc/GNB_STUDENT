<template>
  <div class='settings'>
      <x-header :left-options="{showBack: true}">设置</x-header>
      <group>
          <cell title="清除缓存" link="javascript:;">
              <span class="demo-icon" slot="icon"></span>
          </cell>
          <cell title="检查更新" value="当前版本号:7.2.2" link="javascript:;">
              <span class="demo-icon" slot="icon"></span>
          </cell>
           <cell title="关注我们" value="微信公众号:guina_book" link="javascript:;">
              <span class="demo-icon" slot="icon"></span>
          </cell>
           <cell title="加入我们" value="qq群:458410557" link="javascript:;">
              <span class="demo-icon" slot="icon"></span>
          </cell>
           <cell title="关于我们" link="./about" >
              <span class="demo-icon" slot="icon"></span>
          </cell>
      </group>
  </div>
  
</template>

<script>
import {XHeader,Cell,Group} from 'vux'
export default {
  components: {
    XHeader,Cell,Group
  }
}
</script>

<style lang="less">
@import '~vux/dist/vux.css';
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