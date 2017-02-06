<template >
  <div class="header_title_select select_textbook">
    <p>{{name}}<span class="header_title_select_arrow"></span></p>
    <select dir="rtl"  v-model="value" :userTextbook="userTextbook" :subjectId="subjectId">
      <template v-for="text in textBookArray">
        <option v-bind:value="text.id">{{text.name}}</option>
      </template>
    </select>
  </div>
</template>

<script>
import './index.less'

export default  {
    props: ['value','userTextbook','subjectId'],
    data(){
      return{
        name:''
      }
    },
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
    ready(){
      this.name = this.textBookArray[0].name;
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
      },
      value(){
        let value = this.value;
        this.textBookArray.forEach((arr)=>{  
          if(arr.id == value){
            this.name = arr.name;
            return ;
          }
        })
      }
    }
}
</script>