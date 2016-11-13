<template >
    <view-box v-ref:view-box class="rememberSelect">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                第一课时
            </x-header>
        </div>

        <div style="padding-top:46px;">
            <header class="sectionHeader ellipsis">课时1</header>
            <div class="section">
                <article class="recordBlock">
                    <header><h1 style="color:#487d68">过基础</h1></header>
                    <p class="point">知识点1</p>
                    <div><p class="per-20 tl">1</p><p class="per-60">错<span style="color:orange">3</span>人</p><x-button class="per-20" type='primary' mini>例题</x-button></div>
                    <div><p class="per-20 tl">1</p><p class="per-60">错<span style="color:orange">3</span>人</p><x-button class="per-20" type='primary' mini>例题</x-button></div>
                    <div><p class="per-20 tl">1</p><p class="per-60">错<span style="color:orange">3</span>人</p><x-button class="per-20" type='primary' mini>例题</x-button></div>
                    <div><p class="per-20 tl">1</p><p class="per-60">错<span style="color:orange">3</span>人</p><x-button class="per-20" type='primary' mini>例题</x-button></div>
                    <div><p class="per-20 tl">1</p><p class="per-60">错<span style="color:orange">3</span>人</p><x-button class="per-20" type='primary' mini>例题</x-button></div>
                    <div><p class="per-20 tl">1</p><p class="per-60">错<span style="color:orange">3</span>人</p><x-button class="per-20" type='primary' mini>例题</x-button></div>
                </article>
            </div>
        </div>
    </view-box>


</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import { XHeader,Panel,ViewBox,Group,Cell,XButton} from 'vux'
import { period_id,subject_id,token } from '../../common/getters'
import '../index.less'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,XButton
  },
  methods: {

  },
  vuex: {
    getters:{
        period_id,subject_id,token
    },
    actions:{

    }
  },
  store,
  data(){
		return {
		}
	},
  ready(){

  }
}
</script>
<style lang="less" scoped>
.rememberSelect{
    p{
        font-size:.8rem;
        display: inline-block;
        text-align: center;
    }
    .section{
        .tl{
            text-align: left;
        }
         .tr{
            text-align: right;
        }
        article{
            background:#fff; margin-top:.3rem;
            padding:.3rem 0rem;
            .point{
                padding: 0 1rem;
            }
            header{
                border-bottom:1px solid #ccc;
                padding-bottom:.2rem;
                h1{
                    font-size:.8rem;font-weight: normal;
                    width:35%;
                    padding: 0 1rem;
                    text-align: left;
                }
            }
            div{
                border-bottom: 1px dashed #ccc;
                padding: .3rem 1rem;
            }
        }
    }
    .sectionHeader{
        background: #fff;text-align: center;
        position: relative;
        padding:5px 0;
    }
    .per-20{
        width:20%;
    }
    .per-21{
        width:21.6%;
    }
    .per-25{
        width:25%;
    }
    .per-35{
        width:35%;
    }
    .per-40{
        width:40%;
    }
    .per-60{
        width:60%;
    }
}

</style>
