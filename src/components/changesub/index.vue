<template>
    <div>
        <mt-popup :visible.sync="visible" :subject="subject" :selected="selected" popup-transition="popup-fade" class="gnb-changeSub" >
            <template >
                <p v-for="item in subjectList" track-by="$index" @click="onClickBack(item)" class="{{item.id  == selected ? 'active':''}}">{{item.value}}</p>
            </template>
        </mt-popup>
    </div>
</template>


<script>
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
    computed: {
        /** 根据科目进行配置*/
        subjectList(){
            let self = this;
            let arr = [];
            this.subjectAllList.forEach((value, index)=>{
                 let parent = value;
                 self.subject.forEach((value, index)=>{
                     if(parent.key == value){
                         arr.push(parent);
                     }
                 })
            });
            return arr;
        }
    }
}
</script>
