<template>
    <view-box v-ref:view-box class='myClass'>
        <x-header :left-options="{showBack: true}">我的班级</x-header>

        <group>
            <flexbox>
                <flexbox-item :span="17/20">
                    <search placeholder="请输入班级编号" :value.sync="code" :auto-fixed="false"></search>
                </flexbox-item>
                <flexbox-item style="background:#efeff4;" :span="3/20">
                    <div class="btn-wrap" style="">
                        <div class="search-btn" v-touch:tap="_search">搜索</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </group>

        <group>

            <template  v-for="item in fetchMyClass">
                <cell :title="item.name" :link="'/user/class/detail/'+item.classCode"> </cell>
            </template>

            <infinite-loading :on-infinite="_onInfinite" spinner="default">
                <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">您还未加入任何班级~</p>
                </span>
            </infinite-loading>

        </group>

    </view-box>
</template>

<script>
import './myClass.less'
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader,Cell, Group,Alert,Flexbox,FlexboxItem,Search,ViewBox} from 'vux'
import {
    getMyClass,getMyClassSearchClass
} from '../../actions/class'
import {
    fetchMyClass,
    fetchToken
} from '../../getters'

export default {
    components: {
        XHeader,Cell, Group,Alert,Flexbox,FlexboxItem,Search,ViewBox,InfiniteLoading
    },
    vuex: {
        getters: {
            fetchMyClass,             //加入班级
            fetchToken
        },
        actions: {
            getMyClass,getMyClassSearchClass
        }
    },
    methods: {
        _search() {
            let self = this
            if(self.code){
                self.getMyClassSearchClass({classCode:self.code,token:self.fetchToken},()=>{
                    console.log("查询成功")
                    self.$router.go('/user/class/addClass')
                },()=>{
                    console.log("查询失败")
                })
            }else{
                console.log("请输入内容")
            }

        },
        _onInfinite(){
            this.getMyClass({
                token:this.fetchToken
            },()=>{
                setTimeout(()=>{
                    if(this.fetchMyClass.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
                    this.$broadcast('$InfiniteLoading:complete');
                },300);
            });




        }
    },

    ready() {
        // console.log(this.fetchToken)
        // this.myClassList({token:this.fetchToken})
    },
    data(){
        return{
            code:''
        }
    }
}
</script>
<style lang="less" >
.myClass{
    .infinite-status-prompt{
        display: none;
    }
}
</style>
