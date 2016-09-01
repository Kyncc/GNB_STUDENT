<template>
  <div class='messageHomework vux-scroller-header-box'>
    <div style="height:46px;">
      <x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">作业消息</x-header>
    </div>
    <scroller class="messageSection" lock-x scrollbar-y use-pulldown :pulldown-config={content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'} @pulldown:loading="load">
			<div class="scollMain">
				<section>
					<h3>2016.02.16</h3>
					<article>
						这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈是意见反馈
						这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈是意见反馈
						这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈是意见反馈
						这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈是意见反馈
						这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈是意见反馈
					</article>
				</section>
				<section>
					<h3>2016.02.16</h3>
					<article>
						这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈是意见反馈
						这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈是意见反馈
						这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈是意见反馈
						这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈是意见反馈
						这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈是意见反馈
					</article>
				</section>
				<section>
					<h3>2016.02.16</h3>
					<article>
						这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈是意见反馈
						这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈是意见反馈
						这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈是意见反馈
						这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈是意见反馈
						这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈这里是意见反馈是意见反馈
					</article>
				</section>
			</div>
		</scroller>
	</div>
</template>

<script>
import {XHeader,XInput,Group,Scroller,Cell} from 'vux'

export default {
	components: {
		XHeader,XInput,Group,Cell,Scroller
	},
	methods: {
		load (uuid) {
			setTimeout(() => {
				this.$broadcast('pulldown:reset', uuid)
			}, 2000)
		}
	}
}
</script>







