<template>
    <view-box v-ref:view-box class="cameraHistory">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">拍题记录</x-header>
        </div>

        <div style="margin-top:46px;" class="main">
            <flexbox class="list" v-for="item in list">
                <flexbox-item :span="2/5">
                    <img class="previewer-demo-img" src="https://placekitten.com/250/180"  @click="$refs.previewer.show($index)">
                </flexbox-item>
                <flexbox-item :span="3/5" style="position:relative">
                     <div v-touch:tap="_record(item.knowledgeId)">
                        <div class="title">{{{item.knowledge}}}</div>
                        <div class="difficult">
                            难度：
                            <template v-for="1 in item.difficult">
                                <i class="icon iconfont icon-collect"></i>
                            </template>
                        </div>
                        <div class="time">{{{item.cameraTime | ymd}}} </div>
                     </div>
                     <i class="icon iconfont icon-clear"  v-touch:tap="_remove(item.id)"></i>
                </flexbox-item>
            <flexbox>
        </div>
	</view-box>
    
    <previewer :list="imgList" v-ref:previewer :options="options"></previewer>
    <confirm :show.sync="clearShow" confirm-text="是" cancel-text="否" title="确定将此题移除收藏么?" @on-confirm="_onAction('是')" @on-cancel="_onAction('否')"></confirm>
</template>

<script>
import {XHeader,Panel,ViewBox,FlexboxItem,Flexbox,Previewer,Confirm} from 'vux'

const DATA = {
    "code": 1,
    "data":[
        {
            "collectTime":"1473682257",
            "difficult": 3,
            "knowledge": "2.5 函数零点判定原理 ",
            "knowledgeId": 31,
            "cameraTime": "1473682257",
            "id":1,
            "src":"https://placekitten.com/1400/1200",
            "width":1400,
            "height":1200
	    },
        {
            "collectTime":"1473682257",
            "difficult": 3,
            "knowledge": "2.5 函数零点判定原理 ",
            "knowledgeId": 12,
            "cameraTime": "1473682257",
            "id":1,
            "src":"https://placekitten.com/1400/1200",
            "width":1400,
            "height":1200
	    },
        {
            "collectTime":"1473682257",
            "difficult": 2,
            "knowledge": "2.5 函数零点判定原理 ",
            "knowledgeId": 12,
            "cameraTime": "1473682257",
            "id":1,
            "src":"https://placekitten.com/1400/1200",
            "width":1400,
            "height":1200
	    }
    ],
    "msg": 1
}


export default {
    components: {
       XHeader,Panel,ViewBox,Flexbox,FlexboxItem,Previewer,Confirm
    
    },
    methods: {
        _remove(id){
			this.clearShow = true;
		},
        _record(id){
            this.$router.go(`/camera/record/${id}`);
		},
    },
    data(){
        return{
            clearShow: false,
            list:DATA.data,
            imgList: [{
                src: 'https://placekitten.com/600/400',
                w: 600,
                h: 400
            }],
            options: {
                getThumbBoundsFn (index) {
                    let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                    let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                    let rect = thumbnail.getBoundingClientRect()
                    return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                }
            }
        }
    },
    computed:{

    }
}
</script>
