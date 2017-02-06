<template >
    <div class="container">
        <section class="ac-container-page">
            <div v-for="items in list.chaper" class="gnb-accordion">
                <input :id="'ac-'+$index" name="accordion-1" type="checkbox" checked="true" @click="onClickOpen($index)"/>
                <label class="header" :for="'ac-'+$index">{{items.name}}<span class="with_arrow"></span></label>
                <article class="ac-small">
                    <div style="background: #fff;padding:.5rem;">
                        <div class="vux-checker-item vux-tap-active select-item "  v-for="item in items.pages" :class="(item.isUsed == 'true' ? 'select-item-selected':'')" @click="onClickChapter(item.id)"> 第{{item.number}}页 </div>
                    </div>
                </article>
            </div>
        </section>
    </div>
</template>


<script>
import {Cell,Group,XButton} from 'vux'
import './index.less'

export default {
    name:'accordionPage',
    components:{
        Cell,Group,XButton
    },
     methods:{
        /** 点击科目提交的回调*/
        onClickOpen(index){
            this.$emit('on-click-open',index);
        },
        onClickChapter(index){
            this.$emit('on-click-chapter',index);
        }
    },
    props: ['list']
}
</script>



<style scoped>
.select-item{
    width: 5.3rem;
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: center;
    border-radius: 3px;
    color: #4bb7aa;
    border: 1px solid #4bb7aa;
    background-color: #fff;
    margin-right: 0.5rem;
    margin-top: 0.75rem;
    font-size:.85rem;
}
.select-item-selected {
    background: #ffffff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTZDOEJBQ0E3NkIxMTFFNEE3MzJFOUJCMEU5QUM0QkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTZDOEJBQ0I3NkIxMTFFNEE3MzJFOUJCMEU5QUM0QkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNkM4QkFDODc2QjExMUU0QTczMkU5QkIwRTlBQzRCQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNkM4QkFDOTc2QjExMUU0QTczMkU5QkIwRTlBQzRCQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnMGp3kAAAAJUExURf9KAP///////4Jqdw0AAAADdFJOU///ANfKDUEAAAAuSURBVHjaTMpBDgAABAPB5f+PlhLUpZMWuQcYMWLEyDN4ymqa5KS4+3G+KAEGACQmAGlKzr56AAAAAElFTkSuQmCC) no-repeat right bottom;
    border-color: #ff4a00;
}

</style>