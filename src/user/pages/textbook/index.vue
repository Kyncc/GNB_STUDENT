<template>
<div class='textbook'>
  <x-header :left-options="{showBack: true}">我的教材</x-header>
  <div style="margin-bottom: 1rem;position:relative;height:6rem;overflow:scroll;margin-top: 1rem;">
     <div class="swipe" style="height:6rem;position:absolute;left:0;top:0;">
         <flexbox>
           <flexbox-item :span="4/20" v-for="book in booklist">
             <div class="bookswipe">
               {{book.name}}
             </div>
           </flexbox-item>
         </flexbox>
     </div>
 </div>
  <group>
    <selector placeholder="人教版1" title="数学" :options="list" @on-change="onChange"></selector>
  </group>
  <scroller class="bookwrap" lock-x scrollbar-y use-pulldown :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @pulldown:loading="load">
    <div class="book" v-for="book in booklist">
      {{book.name}}
    </div>
  </scroller>
</div>
</template>

<script>
import {
  XHeader,
  XInput,
  Group,
  Selector,
  Flexbox,
  FlexboxItem,
  Scroller
} from 'vux'

export default {
  data() {
    return {
      list: [{
        key: '2',
        value: '人教版2'
      }, {
        key: '3',
        value: '人教版3'
      }],
      booklist: [{
        name: '必修1'
      }, {
        name: '必修2'
      }, {
        name: '必修3'
      }, {
        name: '必修4'
      }, {
        name: '必修5'
      }, {
        name: '必修6'
      }, {
        name: '必修7'
      }, {
        name: '必修8'
      }, {
        name: '必修9'
      }, {
        name: '必修10'
      }, {
        name: '必修11'
      }, {
        name: '必修12'
      }, {
        name: '必修13'
      }, {
        name: '必修14'
      }, {
        name: '必修15'
      }, {
        name: '必修16'
      }]
    }
  },
  components: {
    XHeader,
    XInput,
    Group,
    Selector,
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
    onChange() {

    }
  }
}
</script>

<style lang="less">
.textbook {
    .vux-no-group-title {
        margin-top: 0;
    }
    .bookswipe {
        width: 4rem;
        height: 6rem;
        line-height: 6rem;
        text-align: center;
        background-color: #ccc;
    }
    .bookwrap {
        background-color: #edf2f1;
        padding: 1rem 0 1rem 2%;
        .book {
            width: 22%;
            margin-right: 3%;
            margin-bottom: 1rem;
            height: 6rem;
            line-height: 6rem;
            text-align: center;
            background-color: #ccc;
            float: left;
        }
    }

}
</style>
