<template>
	<div class='correctDetail  vux-scroller-header-box'>
		<div style="height:46px;">
			<x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">我要纠错<a slot="right" v-touch:tap="_commit">提交</a></x-header>
		</div>
        <div>
            <group title="纠错类型">
                <checker style="padding:.25rem .75rem 1rem;"
                    :value.sync="select"
                    :max="5"
                    type="checkbox"
                    default-item-class="select-item"
                    selected-item-class="select-item-selected"
                >
                        <checker-item :value="0">答案错误</checker-item>
                        <checker-item :value="1">解析不全</checker-item>
                        <checker-item :value="2">题目超纲</checker-item>
                        <checker-item :value="3">题型太老</checker-item>
                        <checker-item :value="4">其它</checker-item>
                </checker>
            </group>
            <group title="纠错内容">
                <x-textarea :max="200" :rows="6"  placeholder="请简单描述纠错内容"></x-textarea>
            </group>
        </div>

    </div>
</template>

<script>
import {XHeader,XButton,Checker, Flexbox,FlexboxItem,CheckerItem,Group,XTextarea} from 'vux'
// import './collect.less'

export default {
	components: {
		XHeader,XButton,
        Checker, CheckerItem, XTextarea, Group,Flexbox,FlexboxItem
	},
	methods: {
		_commit(){
			alert(1);
		}
	},
    data(){
        return{
             select: []
        }
        
    }
}
</script>

<style lang="less">
.select-item {
  width: 100/20rem;
  height: 30/20rem;
  line-height:30/20rem;
  text-align: center;
  border-radius: 3px;
  color:#4bb7aa;
  border: 1px solid #4bb7aa;
  background-color: #fff;
  margin-right:6/20rem;
  margin-top:15/20rem;
}
.select-item-selected {
  background: #ffffff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTZDOEJBQ0E3NkIxMTFFNEE3MzJFOUJCMEU5QUM0QkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTZDOEJBQ0I3NkIxMTFFNEE3MzJFOUJCMEU5QUM0QkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNkM4QkFDODc2QjExMUU0QTczMkU5QkIwRTlBQzRCQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNkM4QkFDOTc2QjExMUU0QTczMkU5QkIwRTlBQzRCQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnMGp3kAAAAJUExURf9KAP///////4Jqdw0AAAADdFJOU///ANfKDUEAAAAuSURBVHjaTMpBDgAABAPB5f+PlhLUpZMWuQcYMWLEyDN4ymqa5KS4+3G+KAEGACQmAGlKzr56AAAAAElFTkSuQmCC)  no-repeat right bottom;
  border-color: #ff4a00;
}
</style>