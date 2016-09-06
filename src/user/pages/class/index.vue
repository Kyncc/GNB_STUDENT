<style lang="less">
body {
    -webkit-touch-callout: none;
}

.class {
    .weui_cells{
        margin-top: 0;
    }
    .weui_search_bar:after{
        border: none;
    }
    .vux-flexbox{
        .vux-flexbox-item{
            margin-left: 0 !important;
        }
    }
    .btn-wrap{
        height:43px;width:100%;position:relative;
        .search-btn{
            position:absolute;top:0;bottom:0;margin:auto;height:28px;line-height:28px;font-size:14px;text-align:center;width:80%;background:#fff;border-radius:5px;
        }
    }
}
</style>

<template>
<div class='class'>
  <x-header :left-options="{showBack: true}">我的班级</x-header>
  <scroller lock-x scrollbar-y use-pulldown :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @pulldown:loading="load">
    <group>
        <flexbox>
            <flexbox-item :span="17/20">
                <search placeholder="Search" :auto-fixed="false"></search>
            </flexbox-item>
            <flexbox-item style="background:#efeff4;" :span="3/20">
                <div class="btn-wrap" style="">
                    <div class="search-btn"  v-touch:tap="_search">搜索</div>
                </div>
            </flexbox-item>
        </flexbox>
    </group>
    <group>
        <cell title="数学一班" link="detail" v-touch:tap="_detail">
           <span class="demo-icon" slot="icon"></span>
       </cell>
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
  Scroller,
  Search
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
    Search
  },
  methods: {
    load(uuid) {
      setTimeout(() => {
        this.$broadcast('pulldown:reset', uuid)
      }, 1000)
    },
    _search(){
        this.$router.go('addClass')
    },
    _detail() {
      this.$router.go('detail')
    }
  }
}
</script>
