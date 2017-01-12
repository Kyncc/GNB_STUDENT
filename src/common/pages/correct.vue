<template>
	<div class='correctDetail  vux-scroller-header-box'>
		<div style="height:46px;">
			<x-header :left-options="{showBack: true}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">我要纠错
                <a slot="right" v-touch:tap="_commit">提交</a>
            </x-header>
		</div>
        <div>
            <group title="纠错类型">
                <checker style="padding:.25rem .75rem 1rem;"
                    :value.sync="type"
                    :max="4"
                    type="checkbox"
                    default-item-class="select-item"
                    selected-item-class="select-item-selected"
                    >
                        <checker-item :value="0">答案错误</checker-item>
                        <checker-item :value="1">解析不全</checker-item>
                        <checker-item :value="2">题目超纲</checker-item>
                        <checker-item :value="3">题型太老</checker-item>
                        <checker-item :value="4">其他</checker-item>
                </checker>
            </group>
            <group title="纠错内容">
                <x-textarea :max="200" :rows="6" :value.sync="content" placeholder="请简单描述纠错内容"></x-textarea>
            </group>
        </div>

    </div>
</template>

<script>
import {XHeader,XButton,Checker, Flexbox,FlexboxItem,CheckerItem,Group,XTextarea} from 'vux'
import store from '../../store' 
import { correct } from '../actions'
import { token,path } from '../getters'
import * as _ from '../../config/whole'

export default {
	components: {
		XHeader,XButton,
        Checker, CheckerItem, XTextarea, Group,Flexbox,FlexboxItem
	},
     vuex: {
        getters: {
            token,path
        },
        actions: {
            correct
        }
    },
	methods: {
		_commit(){
            if(!this.type[0] && this.type[0]!='0'){
               _.toast("请选择纠错类型");
               return;
            }
            if(this.type.indexOf(4) >= 0 && this.content==''){
                _.toast("请填写纠错内容");
               return;
            }
			 let params = {
                options:{
                    id:Number(this.id),
                    subject_id:this.subejectId
                },
                data:{
                    content:this.content,
                    type:this.type
                },
                token:this.token
            }
            this.correct(params);
		}
	},
    store,
    data(){
        return{
             type: [],
             content:'',
             id:store.state.route.params.id,
             subejectId:store.state.route.params.subjectId
        }
    },
    watch: {
        path(){
            if(this.path.indexOf('/correct') >=0 ){
                this.type = [];
                this.content = '';
            }
        }
    }
}
</script>

