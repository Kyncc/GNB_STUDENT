<template>
    <view-box class='myClassAdd'>

        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                添加班级
            </x-header>
            <search @on-submit="_onSearch"  @on-change="_onSearch" :value.sync="searchCode" :auto-fixed="false" placeholder="请输入班级码"></search>
        </div>

        <div style="padding-top:96px;">
            <group>
                <template v-if="ClassSearch.name">
                    <cell :title="ClassSearch.name" >
                        <x-button type="primary" :mini="true" @click="_addClass(ClassSearch.classCode)">申请加入</x-button>
                    </cell>
                </template>
            </group>

            <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
                <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">没有查询到班级~</p>
                </span>
                <span slot="no-more"></span>
            </infinite-loading>
        </div>
        
    </view-box >
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader,XButton,Cell,Group, Alert,Flexbox,FlexboxItem,Search, ViewBox} from 'vux'
import { mapActions,mapGetters } from 'vuex'

export default {
  components: {
        XHeader,XButton,Cell,Group, Alert,Flexbox,FlexboxItem,Search, ViewBox,InfiniteLoading
  },
  data(){
    return {
        searchCode:''
    }
  },
  methods:{
      ...mapActions(['getMyClassSearchClass','postMyClassInto']),
    _onSearch(str){
        this.searchCode = str;
        this.$nextTick(() => {
            this.$broadcast('$InfiniteLoading:reset');
        });
    },
    _addClass(code){
        this.postMyClassInto({
            "classCode":code,
        })
        .then(()=>{
            _.toast('申请成功');
            history.back();
        });
    },
    _onInfinite(){
        this.getMyClassSearchClass({
            "classCode":this.searchCode,
        })
        .then(()=>{
            if(this.ClassSearch.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
            this.$broadcast('$InfiniteLoading:complete');
        });
    }
  },
  computed:{
    ...mapGetters(['ClassSearch'])
  }
}
</script>

