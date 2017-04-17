<template>
   <div>
    练习本列表
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
