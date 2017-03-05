<template>
  <div>
    <group class="workbookList">
      <cell v-for="workbook in item.list">
        <div slot="icon" @click="show(index,workbook)"><img class="workbookListImg" v-lazy="workbook.img.url+'?imageView2/0/format/png/w/90/h/120'" width="45" height="60" style="margin-right:.3rem"/></div>
        <div slot="after-title" >
          <div style="width:9rem;display:inline-block;float:left" @click="show(index,workbook)">
            {{workbook.workbookName}}
          </div>
          <div style="width:4rem;display:inline-block;float:right">
            <x-button type="primary" @click="onClickAdd(workbook.workbookId)">添加</x-button>
          </div>
        </div>
      </cell>
    </group>
    <previewer :list="list" :options="options" v-ref:previewer></previewer>
  </div>
</template>

<script>
import {Group,Cell,XButton,Previewer} from 'vux'
export default {
    props: ['item'],
    components:{
      Group,Cell,XButton,Previewer 
    },
    data(){
      return{
        list: [{
          src: '',
          w: '',
          h: ''
        }],
         options: {
            bgOpacity:0.7,
            showAnimationDuration :0,
            fullscreenEl: false,
        }
      }
    },
    methods:{
       show (index,item) {
          this.list[0].src = `${item.img.url}?imageView2/2/w/700/h/1050/q|imageslim`
          this.list[0].w = item.img.width
          this.list[0].h = item.img.height
          // this.$refs.previewer.items.pop()
          // this.$refs.previewer.items.push(this.list)
          this.$refs.previewer.show(index)
        },
        onClickAdd(index){
           this.$emit('on-click-add',index)
        }
    }
}
</script>

<style scroped>
.workbookList .weui_btn{
  font-size:14px;
}
</style>