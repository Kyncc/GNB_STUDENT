<template>
<view-box v-ref:view-box class='myClassMate'>
  <template v-for="item in fetchMyClassMate">
    <x-header :left-options="{showBack: true}">{{item.classname}}</x-header>
    <cell title="我的老师"></cell>
    <group>
      <cell :title="item.teacher.name">
          <img slot="icon" width="30" height="30" style="display:block;margin-right:5px;border-radius:50%" v-lazy="item.teacher.headImg">
      </cell>
    </group>

    <cell title="我的同学"></cell>
    <group>
      <template v-for="student in item.students">
        <cell :title="student.name">
            <img slot="icon" width="30" height="30" style="display:block;margin-right:5px;border-radius:50%" v-lazy="student.headImg">
        </cell>
      </template>
    </group>
  </template>

  <infinite-loading :on-infinite="_onInfinite" spinner="default">
    <span slot="no-results" style="color:#4bb7aa;">
      <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
      <p style="font-size:1rem;display:inline-block;">服务器出差了~</p>
    </span>
    <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
  </infinite-loading>


</view-box>
</template>

<script>
import './myClass.less'
import InfiniteLoading from 'vue-infinite-loading'
import {token,id} from '../../../common/getters'
import {fetchMyClassMate} from '../../getters'
import { getMyClassmateList} from '../../actions/class'
import {XHeader,Cell,Group,ViewBox} from 'vux'
export default {
  components: {
    XHeader,
    Cell,
    Group,
    ViewBox,InfiniteLoading
  },
  vuex: {
      getters: {
        token,id,fetchMyClassMate
      },
      actions: {
        getMyClassmateList
      }
  },
  methods: {
    _points() {
      this.$router.go('points')
    },
    _recharge() {
      this.$router.go('recharge')
    },
    _onInfinite(){
			let params = {
        classCode:this.id,
				token:this.token
			};
      this.getMyClassmateList(params,()=>{
          this.$broadcast('$InfiniteLoading:loaded');
					this.$broadcast('$InfiniteLoading:complete');
			});
    }
  }
}
</script>
