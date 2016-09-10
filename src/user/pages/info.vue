<template>
    <div class='info'>
        <x-header :left-options="{showBack: true}">个人资料 <a slot="right" v-touch:tap="_complete">完成</a></x-header>
        <group>
            <group>
                <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name"></x-input>
            </group>
            <group>
                <cell title="性别">
                    <checker :value.sync="sex" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
                        <checker-item value="1">男</checker-item>
                        <checker-item value="2">女</checker-item>
                    </checker>
                </cell>
            </group>
            <group>
                <x-input title="年级" name="grade" value="高中" readonly></x-input>
            </group>
            <group>
                <x-input title="学校" name="school" placeholder="请输入学校名称" ></x-input>
            </group>
        </group>
    </div>
</template>

<script>
import {Checker, CheckerItem, XHeader, XInput, Group, Cell} from 'vux'

export default {
    components: {
        Checker, CheckerItem, XHeader, XInput, Group, Cell
    },
    data(){
        return {
            sex:['男','女']
        }
    },
    methods: {
        _complete(){
            alert(1);
        },
        change (value) {
            console.log('change:', value)
        }
    }
}
</script>

<style lang="less">
.info{

    .weui_cells{margin-top:0;}
    .vux-no-group-title{margin-top:0;}
    .weui_input{text-align: right;}
    .demo2-item {
        width: 40px;
        height: 40px;
        border: 1px solid #ccc;
        display: inline-block;
        border-radius: 50%;
        line-height: 40px;
        text-align: center;
    }
    .demo2-item-selected {
        border-color: green;
    }
}
</style>
