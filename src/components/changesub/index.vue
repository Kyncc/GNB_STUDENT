<template>
    <div>
        <mt-popup :visible.sync="visible" :subject="subject" :selected="selected" popup-transition="popup-fade" class="gnb-changeSub" >
            <template v-for="item in subjectList">
                <p @click="onClickBack(item)" class="{{item.id  == selected ? 'active':''}}">{{item.value}}</p>
            </template>
        </mt-popup>
    </div>
</template>


<script>
import Vue from 'vue'
import { Popup } from 'mint-ui'
import './index.less'

export default  {
    props: ['visible','subject','selected'],
    components:{
        'mt-popup': Popup
    },
    data(){
        return{
            subjectAllList:[
                {id:'2',value:'数学',key:'math'},
                {id:'7',value:'物理',key:'physics'},
                {id:'8',value:'化学',key:'chemistry'}
            ],
            subjectList:[],
            name:''
        }
    },
    methods:{
        /** 点击科目提交的回调*/
        onClickBack(item){
            if( this.selected == item.id){
                return;
            }
            this.$emit('on-click-back',item);
            this.selected = item.id;
        },
        /** 根据科目进行配置*/
        _convert(){
             let list = this.subject;
             let self = this;
             this.subjectAllList.forEach((value, index)=>{
                 let parent = value;
                 list.forEach((value, index)=>{
                     if(parent.key == value){
                         self.subjectList.push(parent);
                     }
                 })
            });
        }
    },
    watch:{
        selected(){
            let selected = this.selected;
            this.subjectAllList.forEach((value, index)=>{
                if(value.id == selected){
                    self.name = value.value
                }
            });
        }
    },
    ready(){
        this._convert();
    }

}
</script>
