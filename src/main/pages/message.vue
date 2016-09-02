<template>
  <div class='mainMessage vux-scroller-header-box'>
    <div style="height:46px;">
      <x-header :left-options="{showBack: false}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">消息</x-header>
    </div>
    <scroller lock-x scrollbar-y use-pulldown :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}"  @pulldown:loading="load">
      <group>
				<!--<cell title="作业消息" link="../message/homework" inline-desc='这是张老师布置的一道作业' >
          <div slot="value">2016.02.15</div>
          <div class="vux-reddot" slot="icon" style="margin-right:.5em;" >
            <img width="40" class="vux-reddot" style="margin-right:.5em;" src="../../assets/message/homework.png">
          </div> 
				</cell>-->
        <cell title="班级消息" link="../message/class" inline-desc='这是张老师布置的一道作业' >
          <div slot="value">2016.02.15</div>
          <div class="vux-reddot" slot="icon" style="margin-right:.5em;" >
            <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/class.png">
          </div> 
				</cell>
        <cell title="纠错消息" link="../message/correct" inline-desc='这是张老师布置的一道作业' >
           <div slot="value">2016.02.15</div>
           <div class="vux-reddot" slot="icon" style="margin-right:.5em;" >
              <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/correct.png">
           </div>
        </cell>
        <cell title="意见反馈" link="../message/advice" inline-desc='这是张老师布置的一道作业' >
          <div slot="value">2016.02.15</div>
          <div class="vux-reddot" slot="icon" style="margin-right:.5em;" >
            <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/advice.png">
          </div>
        </cell>
				<cell title="系统消息" link="../message/system" inline-desc='这是张老师布置的一道作业' >
          <div slot="value">2016.02.15</div>
          <div class="vux-reddot" slot="icon" style="margin-right:.5em;" >
            <img slot="icon" width="40" style="margin-right:.5em;" src="../../assets/message/system.png">
          </div>
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



