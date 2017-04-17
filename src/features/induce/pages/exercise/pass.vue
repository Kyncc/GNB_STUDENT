<template>
   <div>
    弃题本
   </div>
</template>

<script>
import {ViewBox} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'pass',
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
