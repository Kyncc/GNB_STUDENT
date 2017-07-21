<template>
  <div class="gnbCompoents_selectBook">
    <p>{{name}}
      <b class="header_title_select_arrow"></b>
    </p>
    <select v-model="currentValue">
      <template v-for="item in list">
        <option v-bind:value="item.id">{{item.name}}</option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  name: 'gnb_textbook',
  props: {
    value: {
      type: [String, Number, Object, Boolean]
    },
    list: {
      type: Array
    }
  },
  data () {
    return {
      name: this.list[0].name,
      currentValue: this.value
    }
  },
  watch: {
    currentValue (val) {
      this.list.forEach((arr) => {
        if (arr.id.toString() === val.toString()) {
          this.name = arr.name
        }
      })
      this.$emit('on-change', val)
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
.gnbCompoents_selectBook{
  p{font-size:.8rem;color:#4BB7AA;}
  position: relative;
  height:35px;
  text-align: center;
  width:100%;
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
    border-color: #4BB7AA;
    border-style: solid;
    margin-left:5px;
    transition-duration: .2s;
  }
}
</style>
