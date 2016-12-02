<template>
    <view-box v-ref:view-box class='myClass'>

        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                我的班级
            </x-header>
        </div>

         <div style="padding-top:46px;">
            <group> 
                <template v-for="item in ClassMy">
                   <cell :title="item.name" :link="'/user/class/detail/'+item.classCode"> </cell>
                </template>
            </group>

            <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
                <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">您还未加入班级~</p>
                </span>
                <span slot="no-more"></span>
            </infinite-loading>
        </div>

        <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
            <x-button style="width:100%;border-radius:0px;background:#fff;color:#000;border-top:1px solid #ddd" type="primary" @click="_addClass()">加入班级</x-button>
        </tabbar>

        
    </view-box>
</template>

<script>
import './myClass.less'
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader,Cell,Group,Alert,Flexbox,FlexboxItem,Search,ViewBox,Tabbar,XButton} from 'vux'
import {getMyClass} from '../../actions/class'
import {token} from '../../../common/getters'
import {ClassMy} from '../../getters'

export default {
    components: {
        XHeader,Cell,Group,Alert,Flexbox,FlexboxItem,Search,ViewBox,InfiniteLoading,Tabbar,XButton
    },
    vuex:{
        getters: {
            ClassMy,token             
        },
        actions: {
            getMyClass
        }
    },
    methods: {
        _addClass(){
            this.$router.go('/user/class/add');
        },
        _onInfinite(){
            this.getMyClass({
                token:this.token
            },()=>{
                if(this.ClassMy.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
                this.$broadcast('$InfiniteLoading:complete');
            });
        }
    }
}

</script>
