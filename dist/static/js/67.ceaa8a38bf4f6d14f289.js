webpackJsonp([67],{490:function(t,e,n){var o=n(57)(n(769),n(890),null,null);t.exports=o.exports},716:function(t,e,n){"use strict";n.d(e,"a",function(){return o}),n.d(e,"b",function(){return r});var o="ADVICE_LIST",r="ADVICE_LIST_CLEAR"},726:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"updateAdvice",function(){return d}),n.d(e,"adviceHistory",function(){return f}),n.d(e,"clearAdviceHistory",function(){return v});var o=n(192),r=n.n(o),i=n(128),u=n.n(i),a=n(51),c=n(716),s=n(195),d=function(t,e){var o=t.rootState;t.commit;return new u.a(function(t,i){n.i(s.a)({method:"post",url:"user/advice",data:r()({token:o.common.user.token},e)}).then(function(e){a.a.$vux.toast.show({text:"感谢您的反馈！",type:"text",time:1500,position:"bottom"}),t(e)})})},f=function(t){var e=t.rootState,o=t.commit;return new u.a(function(t,r){n.i(s.a)({method:"get",url:"user/adviceHistory",params:{token:e.common.user.token}}).then(function(e){o(c.a,e.data.data),t(e)})})},v=function(t){(0,t.commit)(c.b)}},727:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"historyList",function(){return o});var o=function(t){return t.adviceList}},728:function(t,e,n){"use strict";var o,r=n(196),i=n.n(r),u=n(716),a=n(727),c=n(726),s={adviceList:[]},d=(o={},i()(o,u.a,function(t,e){t.adviceList=e}),i()(o,u.b,function(t){t.adviceList=[]}),o);e.a={state:s,getters:a,actions:c,mutations:d}},769:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(192),r=n.n(o),i=n(84),u=n(728);e.default={name:"about",beforeCreate:function(){i.a.registerModule("about",r()({},u.a))}}},890:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("keep-alive",[n("router-view")],1)},staticRenderFns:[]}}});