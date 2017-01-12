<template>
  <view-box v-ref:view-box class='myClassMate'>
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
        <x-header :left-options="{showBack: true}">
            {{ClassMyClassmate.classname}}
        </x-header>
    </div>
    
    <div style="padding-top:46px;">
        <template v-if="ClassMyClassmate">
          <group title="我的老师">
            <cell v-if="ClassMyClassmate.teacher" :title="ClassMyClassmate.teacher.name">
                <img slot="icon" width="30" height="30" style="display:block;margin-right:5px;border-radius:50%" v-lazy="ClassMyClassmate.teacher.headImg">
            </cell>
          </group>
          <group title="我的同学">
              <template v-for="student in ClassMyClassmate.students">
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
    </div>
  </view-box>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import {token,id} from '../../../common/getters'
import {ClassMyClassmate} from '../getters'
import {getMyClassmateList} from '../actions/class'
import {XHeader,Cell,Group,ViewBox} from 'vux'
import './myClass.less'
export default {
  components: {
    XHeader,
    Cell,
    Group,
    ViewBox,InfiniteLoading
  },
  vuex: {
      getters: {
        token,id,ClassMyClassmate
      },
      actions: {
        getMyClassmateList
      }
  },
  methods: {
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
