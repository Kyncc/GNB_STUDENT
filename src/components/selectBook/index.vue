<template>
  <div class="gnbCompoents_selectBook">
    <p>{{name}}<span class="header_title_select_arrow"></span></p>
    <select dir="rtl" v-model="value">
      <template v-for="item in list">
        <option v-bind:value="item.id">{{text.name}}</option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  name: 'selectBook',
  props: {
    value: {
      type: String
    },
    list: {
      type: Array
    }
  },
  data () {
    return {
      show: false
    }
  },
  created () {
    this.show = this.value
  },
  watch: {
    value (val) {
      let value = this.value
      this.list.forEach((arr) => {
        if(arr.id == value){
          this.name = arr.name
          break 
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.gnbCompoents_selectBook{
  position: relative;
  select{
    -webkit-appearance: none;
    border: 0;
    outline: 0;
    background-color: transparent;
    width: 100%;
    text-align: center;
    font-size: inherit;
    width:100%;
    height: 44px;
    line-height: 44px;
    position: relative;
    z-index: 1;
    top:-40px;
    color:#fff;
    opacity: 0;
  }
  .header_title_select_arrow{
    display: inline-block;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #fff;
    border-style: solid;
    margin-left:5px;
    transition-duration: .2s;
  }
}
</style>
