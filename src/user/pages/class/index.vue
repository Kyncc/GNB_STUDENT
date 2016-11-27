<template>
    <view-box v-ref:view-box class='myClass'>
        <x-header :left-options="{showBack: true}">我的班级</x-header>

        <group>
            <search  placeholder="请输入班级编号" @result-click="resultClick" :auto-fixed="false" @on-change="getResult" :results="results" ></search>
        </group>

        <group v-show="!value">
            <template  v-for="item in fetchMyClass" >
                <cell :title="item.name" :link="'/user/class/detail/'+item.classCode"> </cell>
            </template>
        </group>

        <infinite-loading :on-infinite="_onInfinite" spinner="default">
            <span slot="no-results" style="color:#4bb7aa;">
                <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                <p style="font-size:1rem;display:inline-block;">您还未加入任何班级~</p>
            </span>
        </infinite-loading>
    </view-box>
</template>

<script>
import './myClass.less'
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader,Cell,Group,Alert,Flexbox,FlexboxItem,Search,ViewBox} from 'vux'
import {getMyClass,getMyClassSearchClass,postMyClassInto} from '../../actions/class'
import {fetchMyClass,fetchToken,fetchMyClassSearchClass} from '../../getters'

export default {
    components: {
        XHeader,Cell,Group,Alert,Flexbox,FlexboxItem,Search,ViewBox,InfiniteLoading
    },
    vuex: {
        getters: {
            fetchMyClass,             //加入班级
            fetchToken,
            fetchMyClassSearchClass
        },
        actions: {
            getMyClass,getMyClassSearchClass,postMyClassInto
        }
    },
    methods: {
        resultClick (item) {
            this.postMyClassInto({classCode:item.code,token:this.fetchToken},()=>{
                console.log("添加成功")
            },()=>{
                console.log("添加失败")
            })
        },
        getResult (val) {
            let self = this
            self.results= []
            this.getMyClassSearchClass({classCode:self.value,token:self.fetchToken},()=>{
                console.log("查询成功"+self.value)
                if(self.fetchMyClassSearchClass.name){
                    self.results.push({title:self.fetchMyClassSearchClass.name,code:self.fetchMyClassSearchClass.classCode})
                }
            })
        },
        _onInfinite(){
            console.log(this.fetchMyClass);
            this.getMyClass({
                token:this.fetchToken
            },()=>{
                if(this.fetchMyClass.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
                this.$broadcast('$InfiniteLoading:complete');
            });
        }
    },
    data(){
        return{
            results: []
        }
    }
}

</script>
<style lang="less" >
.myClass{
    .infinite-status-prompt{
        display: none;
    }
    .weui_search_inner .weui_search_input{
        height:1.6rem;
        .weui_search_inner .weui_search_input{
            line-height:1.6rem;
        }

        .weui_search_text span{
            font-size:16px;
        }
    }
    .weui_search_text{
        padding-top:4px;
    }
    .weui_search_inner .weui_icon_search{
        top:2px;
    }
}
</style>
