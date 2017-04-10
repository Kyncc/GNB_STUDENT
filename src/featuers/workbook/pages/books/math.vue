<template>
  <div>
    <p>{{textbook}}</p>
    <select dir="rtl" v-model="textbook">
      <template v-for="text in list">
        <option v-bind:value="text.id">{{text.name}}</option>
      </template>
    </select>
  </div>
</template>

<script>
import {Group, XButton} from 'vux'
import {mapActions} from 'vuex'

export default {
  name: 'math',
  components: {
    Group, XButton
  },
  data () {
    return {
      list: [
        {id: '1', name: '必修1'},
        {id: '2', name: '必修3'},
        {id: '3', name: '必修3'}
      ]
    }
  },
  methods: {
    ...mapActions([''])
  },
  computed: {
    textbook () {
      return this.list[0].id
    }
  }
}
</script>
