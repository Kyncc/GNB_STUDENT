<template>
   <div>
    练习本
   </div>
</template>

<script>
import {ViewBox} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'practice',
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
