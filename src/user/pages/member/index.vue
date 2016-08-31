<style lang="less">
body {
    -webkit-touch-callout: none
}

.calendar {
    .vux-header {
        color: #fff;
        background-color: #4bb7aa;
    }
    .headimg {
        width: 100%;
        height: 286/40em;
        background: url('../../../assets/user/headbg.jpg') no-repeat;
        background-size: 100%;
        padding-top: 80/40em;
        img {
            width: 139/40em;
            height: 139/40em;
            margin: 0 auto;
            display: block;
        }
        p {
            color: #fff;
            text-align: center;
            margin-top: 50/40em;
        }
    }
    .weui_cells {
        margin-top: 0;
    }
    .vux-no-group-title {
        margin-top: 0;
    }
    .vux-header .vux-header-left,
    .vux-header .vux-header-right {
        font-size: 16px;
    }
    .vux-header .vux-header-left .vux-header-back:before {
        border-color: #fff;
    }
    .vux-header .vux-header-title,
    .vux-header h1 {
        margin-left: 88px;
    }
    .vux-flexbox-item{
        margin: 0 !important;
        padding: 0 36/40em;
        .flex-key{
            height: 96/40em;
            line-height: 96/40em;
            text-align: center;
            font-size: 32/40em;
        }
        .flex-value{
            height: 96/40em;
            line-height: 96/40em;
            text-align: center;
            color: #ff9800;
            font-size: 32/40em;
        }
    }
}
.vux-1px-r{
    border-right: 1px solid #d2d2d2;
}
.vux-1px-b{
    border-bottom: 1px solid #d2d2d2;
}
</style>

<template>

<div class='calendar'>
    <x-header :left-options="{showBack: true}">我的会员</x-header>
    <div class="headimg">
        <img src="../../../assets/user/headimg.png" alt="" />
        <p>普通会员</p>
    </div>
    <flexbox class="vux-1px-b">
        <flexbox-item class="vux-1px-r">
            <flexbox orient="vertical" :margin-left=0>
                <flexbox-item>
                    <div class="flex-key vux-1px-b" >我的积分</div>
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-value" >1000</div>
                </flexbox-item>
            </flexbox>
        </flexbox-item>
        <flexbox-item>
            <flexbox orient="vertical" :margin-left=0>
                <flexbox-item>
                    <div class="flex-key vux-1px-b" >余额</div>
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-value" >0元</div>
                </flexbox-item>
            </flexbox>
        </flexbox-item>
    </flexbox>

</div>

</template>

<script>

import {
    XHeader, Cell, Group, Alert, Flexbox, FlexboxItem
}
from 'vux'
export default {
    components: {
        XHeader, Cell, Group, Alert, Flexbox, FlexboxItem
    },
    data() {
        return {
            show: false
        }
    },
    methods: {}
}

</script>
