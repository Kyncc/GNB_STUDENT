webpackJsonp([50,62],{272:function(o,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=l(3);e.default={components:{XHeader:t.XHeader,Cell:t.Cell,Group:t.Group,Confirm:t.Confirm,Scroller:t.Scroller,ViewBox:t.ViewBox},ready:function(){var o=this;this.$nextTick(function(){o.$refs.scroller.reset()})}}},412:function(o,e){o.exports=' <view-box class="bag vux-scroller-header-box"> <div style=height:46px> <x-header :left-options="{showBack: false}" style=position:fixed;left:0;top:0;width:100% class=vux-scroller-header>书包</x-header> </div> <scroller lock-x v-ref:scroller height=-47px> <div> <group style=padding-bottom:10px> <cell title=刷题本 link=bag/brushed/ > <span class="icon iconfont icon-brush" style=color:#33CC99 slot=icon></span> </cell> <cell title=斩题本 link=bag/break/ > <span class="icon iconfont icon-book1" style=color:#5ECFE7 slot=icon></span> </cell> <cell title=弃题本 link=bag/pass/ > <span class="icon iconfont icon-lajitong16" style=color:#ffb660 slot=icon></span> </cell> </group> <group style=padding-bottom:10px> <cell title=知识图谱 link=bag/report/ > <span class="icon iconfont icon-pie-chart" style=color:#794BB8 slot=icon></span> </cell> </group> <group> <cell title=我的收藏本 link=bag/collect/ > <span class="icon iconfont icon-box" style=color:#6DC6FF slot=icon></span> </cell> <cell title=我的习题册 link=bag/workbook/ > <span class="icon iconfont icon-workbook" style=color:#ABC97C slot=icon></span> </cell> </group> </div> </scroller> </view-box> '},477:function(o,e,l){var t,c,s={};t=l(272),c=l(412),o.exports=t||{},o.exports.__esModule&&(o.exports=o.exports.default);var n="function"==typeof o.exports?o.exports.options||(o.exports.options={}):o.exports;c&&(n.template=c),n.computed||(n.computed={}),Object.keys(s).forEach(function(o){var e=s[o];n.computed[o]=function(){return e}})}});