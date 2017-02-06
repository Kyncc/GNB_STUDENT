<template>
  <div class='commentDetail vux-scroller-header-box'>
    <div style="height:46px;">
      <x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">点评
        <a slot="right" v-touch:tap="_commit">提交</a>
      </x-header>
    </div>
    <div>
      <group title="点评类型">
        <checker style="padding:.25rem .85rem 1rem;"
          :value.sync="type"
          default-item-class="select-item"
          selected-item-class="select-item-selected"
        >
            <checker-item :value="0">知识型错误</checker-item>
            <checker-item :value="1">方法型错误</checker-item>
            <checker-item :value="2">审题型错误</checker-item>
            <checker-item :value="3">计算型错误</checker-item>
            <!--<checker-item :value="4">理解错误</checker-item>-->
            <!--<checker-item :value="5">计算错误</checker-item>
            <checker-item :value="6">不会做</checker-item>
            <checker-item :value="7">其他</checker-item>-->
        </checker>
      </group>
      <!--<group title="点评一下">
        <x-textarea :max="200" :rows="6"  :value.sync="content" placeholder="请简单描述点评内容" ></x-textarea>
      </group>-->
    </div>
  </div>
</template>

<script>
import store from '../../store' 
import { comment } from '../actions'
import { token } from '../getters'
import {XHeader,XButton,Checker, Flexbox,FlexboxItem,CheckerItem,Group,XTextarea} from 'vux'
import * as _ from '../../config/whole'

export default {
  components: {
    XHeader,XButton,
    Checker, CheckerItem, XTextarea, Group,Flexbox,FlexboxItem
  },
  vuex: {
    getters: {
      token
    },
    actions: {
      comment
    }
  },
  methods: {
    _commit(){
      if(!this.type[0] && this.type[0]!='0'){
         _.toast("请选择评注类型");
         return;
      }
       
      let params = {
        options:{
          id:Number(this.id),
          subject_id:this.subejectId
        },
        data:{
          content:this.content,
          type:this.type
        },
        token:this.token
      }
      this.comment(params);
    }
  },
  store,
  data(){
    return{
       type: [],
       content:'',
       id:store.state.route.params.id,
       subejectId:store.state.route.params.subjectId
    }
  }
}
</script>