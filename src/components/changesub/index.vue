<template>
    <div>
        <mt-popup :visible.sync="show" popup-transition="popup-fade" class="gnb-changeSub">
            <p >数学</p>
            <p >物理</p>
            <p >化学</p>
        </mt-popup>
    </div>
</template>


<script>
import Vue from 'vue'
import { Popup } from 'mint-ui'
import './index.less'

Vue.component('mt-popup', Popup);

module.default = {
    props: {
        show: {
            type:Boolean,
            default:true
        }
    },
    methods: {



    }
}
</script>

