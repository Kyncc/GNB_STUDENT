<template>
  <div>
    <group class="workbookList">
      <cell v-for="workbook in item.list">
        <div slot="icon" @click="onClickShow($index,workbook)">
          <img class="workbookListImg" v-lazy="workbook.img.url+'?imageView2/0/format/png/w/90/h/120'" width="45" height="60" style="margin-right:.3rem;background:#ddd"/>
        </div>
        <div slot="after-title" >
          <div style="width:9rem;display:inline-block;float:left" @click="onClickShow($index,workbook)">
            {{workbook.workbookName}}
          </div>
          <div style="width:4rem;display:inline-block;float:right">
            <x-button type="primary" @click="onClickAdd(workbook.workbookId)">添加</x-button>
          </div>
        </div>
      </cell>
    </group>
  </div>
</template>

<script>
import {Group,Cell,XButton} from 'vux'
export default {
    props: ['item'],
    components:{
      Group,Cell,XButton
    },
    methods:{
       onClickShow(index,item) {
          this.$emit('on-click-show',index,item)
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