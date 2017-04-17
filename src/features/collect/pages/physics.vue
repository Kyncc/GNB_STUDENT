<template>
  <div>
    <template v-for="item in list">
      <card :header="{title:`${item.chapter_name}`}">
        <div slot="content" class="content" @click="$router.push({name:'example', params: {subjectId: '7', id: item.exercises_id}})">
          <div v-html="item.stem"></div>
          <div v-if="item.opt_jo.hasOwnProperty('A')">
            <template v-for="(value, key) in item.opt_jo">
              <div style="padding-top:5px;">{{ key }}： <p v-html="value" style="display:inline-block"></p></div>
            </template>
          </div>
        </div>
        <div slot="footer">
          <div class="weui-cell weui-cell_access weui-cell_link">
            <div class="weui-cell__bd">收藏时间: {{item.collect_time | ymd}}</div>
          </div>
        </div>
      </card>
    </template>
    <infinite-loading :on-infinite="_onInfinite" ref="infiniteLoading" spinner="spiral">
      <div slot="no-results" style="color:#4bb7aa;">
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
        <p style="font-size:1rem;display:inline-block;">快去收藏更多题目吧~</p>
      </div>
      <div slot="no-more"></div>
    </infinite-loading>
  </div>
</template>

<script>
import {XHeader, Card} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'physics',
  components: {
    XHeader, Card, InfiniteLoading
  },
  computed: {
    ...mapGetters(['collectPhysics']),
    list () {
      return this.collectPhysics.list
    }
  },
  methods: {
    ...mapActions(['getCollect']),
    _onInfinite () {
      this.getCollect().then(() => {
        if (this.list.length !== 0) this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  padding:10px 15px;
  font-size:14px;
}
</style>
