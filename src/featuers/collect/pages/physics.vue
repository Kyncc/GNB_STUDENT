<template>
  <div>
    物理
  </div>
</template>

<script>
import {XHeader, XInput, Group, XButton, ViewBox, Tab, TabItem, Sticky} from 'vux'
import {mapActions} from 'vuex'
export default {
  name: 'physics',
  components: {
    XHeader, XInput, Group, XButton, ViewBox, Tab, TabItem, Sticky
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([''])
  }
}
</script>
