webpackJsonp([52,62],{266:function(e,t,o){"use strict";function s(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t.default=e,t}function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=o(4),c=i(n),r=o(3),l=o(6),a=o(7);s(a);t.default={components:{Checker:r.Checker,CheckerItem:r.CheckerItem,XHeader:r.XHeader,XInput:r.XInput,Group:r.Group,Cell:r.Cell,Confirm:r.Confirm,PopupPicker:r.PopupPicker,Selector:r.Selector},data:function(){return{edit:"编辑",show:!1,name:"",school:"",sex:"",grade:"",math:"",physics:"",gradeList:[{key:"7",value:"七年级"},{key:"8",value:"八年级"},{key:"9",value:"九年级"},{key:"10",value:"高中"}]}},filters:{covert:function(e){var t=[];return e.forEach(function(e,o){t.push({key:e.id.toString()||"",value:e.name.toString()||""})}),t}},created:function(){this.name=this.User.name,this.school=this.User.school,this.sex=this.User.sex,this.grade=this.User.grade},methods:(0,c.default)({},(0,l.mapActions)(["getUserInfo","setUserInfo","getTextbookAllVersion"]),{_onChangeGrade:function(e){this.grade=e},_onChangeMath:function(e){this.math=e},_onChangePhysisc:function(e){this.physics=e},_back:function(){"完成"==this.edit?this.show=!0:(this.edit="编辑")&&this.$router.go("/main/user")},onAction:function(e){var t=this;"确认"==e&&setTimeout(function(){t.$router.go("/main/user")},300)},_complete:function(){var e=this;"编辑"==this.edit?this.edit="完成":"完成"==this.edit&&this.setUserInfo({name:this.name,sex:this.sex,school:this.school,grade:this.grade,subject:{math:this.math,physics:this.physics}}).then(function(){e.getUserInfo().then(function(){e.edit="编辑"})})}}),watch:{grade:function(){var e=this;this.getTextbookAllVersion({grade:this.grade}).then(function(t){e.math=e.textBookAllVersion.math[0].id.toString(),0==e.textBookAllVersion.physics.length?e.physics="":e.physics=e.textBookAllVersion.physics[0].id.toString()})}},computed:(0,c.default)({},(0,l.mapGetters)(["User","textBookAllVersion"]))}},406:function(e,t){e.exports=' <div class=userinfo> <x-header :left-options="{showBack: true,preventGoBack: true}" @on-click-back=_back()> 个人资料 <a slot=right @click=_complete>{{edit}}</a> </x-header> <div v-show="edit==\'编辑\'"> <group title=基本资料> <cell title=姓名 :value=User.name></cell> <cell title=性别 :value="(User.sex == \'0\' ? \'女\':\'男\')"></cell> <cell title=年级 :value="User.grade | gradeName"></cell> <cell title=学校 :value=User.school></cell> </group> <group title=课本版本> <cell title=数学 :value=User.subject.math.name></cell> <cell title=物理 v-if="User.subject.physics.length != 0" :value=User.subject.physics.name></cell> </group> </div> <div v-show="edit==\'完成\'"> <group title=基本资料> <x-input title=姓名 name=username placeholder=请输入姓名 is-type=china-name :value.sync=name></x-input> <cell title=性别> <checker :value.sync=sex default-item-class=demo2-item selected-item-class=demo2-item-selected> <checker-item value=1>男</checker-item> <checker-item value=0>女</checker-item> </checker> </cell> <selector title=年级 :options=gradeList :value.sync=grade @on-change=_onChangeGrade></selector> <x-input title=学校 name=school placeholder=请输入学校名称 :value.sync=school></x-input> </group> <group title=版本选择> <selector title=数学 :options="textBookAllVersion.math | covert" :value.sync=math @on-change=_onChangeMath></selector> <selector title=物理 v-show="textBookAllVersion.physics.length != 0" :options="textBookAllVersion.physics | covert " :value.sync=physics @on-change=_onChangePhysisc></selector> </group> </div> <confirm :show.sync=show confirm-text=确定 cancel-text=取消 title=还未保存,确定返回吗 @on-confirm="onAction(\'确认\')" @on-cancel="onAction(\'取消\')"></confirm> </div> '},471:function(e,t,o){var s,i,n={};s=o(266),i=o(406),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var c="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(c.template=i),c.computed||(c.computed={}),Object.keys(n).forEach(function(e){var t=n[e];c.computed[e]=function(){return t}})}});