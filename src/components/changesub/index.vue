<template>
    <div>
        <mt-popup :visible.sync="visible" popup-transition="popup-fade" class="gnb-changeSub">
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


export default  {
    props: ['visible'],
    components:{
        'mt-popup': Popup
    },
    methods: {

    }
}
</script>
