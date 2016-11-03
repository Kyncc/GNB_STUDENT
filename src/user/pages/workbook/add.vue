<template>
<view-box v-ref:view-box class='textbook'>

   <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
          添加数学习题册
          <a slot="right" @click="_finish()">
              完成
          </a>
      </x-header>
  </div>

  <div style="padding-top:46px;">
      <group title="习题册列表">
         <checklist :options="textBookList" :value.sync="selectBookList" :required=false ></checklist>
      </group>
  </div>  

</view-box>
</template>

<script>
import {
  XHeader,
  XInput,
  Cell,
  Group,
  Selector,
  ViewBox,XButton,Checklist
} from 'vux'

export default {
  components: {
    XHeader,
    XInput,
    Group,
    Selector,
    Cell,
    ViewBox,XButton,Checklist
  },
   data() {
    return {
      selectBookList:[],
      textBookList:[{key: '1', value: '必修1'}, {key: '2', value: '必修2'}, {key: '3', value: '必修3'}],
    }
  },
  methods: {
    _finish(){
      if(this.selectBookList.length == 0){
        alert("还未选择教材");
      }else{
        history.back();
      }
    }
  }
}
</script>


