<template>
  <div>
  <template v-for="item in workbookList.list">
    <template v-if="item">
      <group :title="item.textbookName">
        <cell v-for="workbook in item.list">
          <div slot="icon"><img v-lazy="workbook.img+'?imageView2/0/format/png/w/90/h/120'" width="45" height="60" style="margin-right:.3rem"/></div>
          <div slot="after-title">
            <div style="width:80%;display:inline-block;float:left">
              {{workbook.workbookName}}
            </div>
            <div style="width:20%;display:inline-block;float:left">
              <x-button type="primary" plain style="font-size:14px" @click="_del(workbook.workbookId)">删除</x-button>
            </div>
        </cell>
      </group>
    </template>
  </template>

    <confirm :show.sync="delFc" confirm-text="确定" cancel-text="取消" title="是否确定删除此习题册" @on-confirm="onClickDel(delId)" @on-cancel="_quit"></confirm>
  </div>
</template>

<script>

import {Group,Cell,XButton,Confirm} from 'vux'
export default  {
    props: ['workbook-list'],
    components:{
      Group,Cell,XButton,Confirm
    },
    data(){
      return{
         delFc:false,
         delId:''
      }
    },
    methods:{
        show(index,item) {
          this.list[0].src = `${item.img}/xtc.jpg`
        },
        _del(index){
           this.delFc = true 
           this.delId = index
        },
        _quit(type) {
           this.delFc = false 
        },
        onClickDel(){
          this.$emit('on-click-del',this.delId)
        }
    }
}
</script>

<style scroped>
.workbookList .weui_btn{
  font-size:14px;
}
</style>