<template >
  <div class="header_title_select">
    <select :visible.sync="textBookId">
      <template v-for="text in textBookArray">
        <option  v-bind:value="text.id">{{text.name}}</option>
      </template>
    </select>
    <span class="header_title_select_arrow"></span>
  </div>
</template>

<script>
import Vue from 'vue'
import './index.less'

export default  {
    props: ['textBookId','userTextbook','subjectId'],
     data(){
        return{
            textBookArray:[]
        }
    },
    watch:{
      subjectId(){
          if(Number(this.subjectId) == 2){
            this.textBookArray = this.userTextbook['math']
          }
          else if(Number(this.subjectId) == 7){
            this.textBookArray = this.userTextbook['physics']
          }
      }
    }
}
</script>