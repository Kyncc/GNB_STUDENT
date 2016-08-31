<template>
  <div class='messageHomework vux-scroller-header-box'>
    <div style="height:46px;">
      <x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">作业消息</x-header>
    </div>
    <scroller lock-x scrollbar-y  use-pulldown :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}"  @pulldown:loading="load">
      <group>
        <cell title="作业消息" link="message/homework" inline-desc='这是张老师布置的一道作业' >
          <div slot="value">
              <span>2016.02.15</span>
          </div>
          <img slot="icon" width="30" style="display:block;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
        </cell>
        </group>
    </scroller>
  </div>   
</template>

<script>
  
import Vue from 'vue'
import Router from 'vue-router'
import {XHeader,Group,Scroller,Cell} from 'vux'

export default {
  components: {
    XHeader,Scroller,Group,Cell
  },
  methods: {
		_refersh(){
			alert(1);
		},
		load (uuid) {
			setTimeout(() => {
				this.$broadcast('pulldown:reset', uuid)
			}, 1000)
		}
	}
}
</script>



