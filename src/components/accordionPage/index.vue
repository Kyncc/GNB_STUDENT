<template >
    <div class="container">
        <section class="ac-container-page">
            <div v-for="items in list" class="gnb-accordion">
                <input :id="'ac-'+$index" name="accordion-1" type="checkbox" :checked="items.checked" @click="onClickBack($index)"/>
                <label class="header" :for="'ac-'+$index">{{items.name}}<span class="with_arrow"></span></label>
                <article class="ac-small">
                    <group>
                        <cell v-for="item in items.chapter_list" :title="item.name" :link="link+item.chapter_id"></cell>
                    </group>
                </article>
            </div>
        </section>
    </div>
</template>


<script>
import {Cell, Group} from 'vux'
import './index.less'

export default {
    name:'accordionPage',
    components:{
        Cell,Group
    },
     methods:{
        /** 点击科目提交的回调*/
        onClickBack(index){
            this.$emit('on-click-back',index);
        }
    },
    props: ['list','link']
}
</script>
