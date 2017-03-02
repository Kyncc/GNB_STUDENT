<template>
  <div>
    <group class="workbookList">
      <cell v-for="workbook in item.list">
        <div slot="icon" @click="show(index,workbook)"><img class="workbookListImg" v-lazy="workbook.img+'?imageView2/0/format/png/w/90/h/120'" width="45" height="60" style="margin-right:.3rem"/></div>
        <div slot="after-title" >
          <div style="width:80%;display:inline-block;float:left" @click="show(index,workbook)">
            {{workbook.workbookName}}
          </div>
          <div style="width:20%;display:inline-block;float:left">
            <x-button type="primary" @click="onClickAdd(workbook.workbookId)">添加</x-button>
          </div>
        </div>
      </cell>
    </group>
    <previewer :list="list" v-ref:previewer></previewer>
  </div>
</template>

<script>
import {Group,Cell,XButton,Previewer} from 'vux'
export default  {
    props: ['item'],
    components:{
      Group,Cell,XButton,Previewer 
    },
    data(){
      return{
        list: [{
          src: '',
          w: 600,
          h: 400
        }]
      }
    },
    methods:{
       show (index,item) {
          this.list[0].src = `${item.img}`
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