<template >
  <div class="header_title_select">
    <select dir="rtl"  v-model="value" :userTextbook="userTextbook" :subjectId="subjectId">
      <template v-for="text in textBookArray">
        <option v-bind:value="text.id">{{text.name}}</option>
      </template>
    </select>
    <span class="header_title_select_arrow"></span>
  </div>
</template>

<script>
import './index.less'

export default  {
    props: ['value','userTextbook','subjectId'],
    computed: {
      textBookArray(){
        if(Number(this.subjectId) == 2){
          return this.userTextbook['math'];
        }
        else if(Number(this.subjectId) == 7){
          return this.userTextbook['physics'];
        }
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
      },
      textBookArray(){
          this.value = this.textBookArray[0].id;
      }
    }
}
</script>