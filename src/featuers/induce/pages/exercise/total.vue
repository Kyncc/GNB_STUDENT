<template>
   <div>
    题型本
   </div>
</template>

<script>
import {ViewBox} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'total',
  components: {
    ViewBox
  },
  computed: {
    ...mapGetters(['Route'])
  },
  methods: {
  }
}
</script>
