webpackJsonp([41],{P6DD:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("Dd8w"),i=s.n(o),n=s("ABCa"),c=s("1DHf"),a=s("rHil"),l=s("1sNz"),r=s("D8a4"),d=s("NYxO"),h=s("xJtg"),u={name:"user",components:{XHeader:n.a,Cell:c.a,Group:a.a,ViewBox:l.a,Badge:r.a,Share:h.a},computed:i()({},Object(d.mapGetters)(["User","System","News"])),data:function(){return{showAction:!1,share:{content:"好东西，自然与朋友共分享",title:"替老师批改作业，帮学生归纳错题",href:"http://a.app.qq.com/o/simple.jsp?pkgname=com.sanbao.guinaben.student"}}},methods:{_openStore:function(){window.location.href="market://details?id=com.sanbao.guinaben.student"}},beforeRouteLeave:function(t,e,s){this.showAction?(this.showAction=!1,s(!1)):s()}},f=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"user"},[s("x-header",{staticStyle:{width:"100%",position:"absolute",left:"0",top:"0","z-index":"100"},attrs:{slot:"header","left-options":{showBack:!1}},slot:"header"},[t._v("\n    个人中心\n  ")]),t._v(" "),s("group",{staticClass:"headInfo",attrs:{gutter:"0"}},[s("cell",{staticClass:"userBg",attrs:{link:{name:"settings_update"}}},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.User.headImg,expression:"User.headImg"}],staticStyle:{"border-radius":"50%","margin-right":"1rem"},attrs:{slot:"icon",width:"70",height:"70"},slot:"icon"}),t._v(" "),s("div",{staticStyle:{color:"#fff"},attrs:{slot:"after-title"},slot:"after-title"},[t._v(t._s(t.User.name))]),t._v(" "),s("div",{staticStyle:{color:"#fff","padding-top":".25rem"},attrs:{slot:"inline-desc"},slot:"inline-desc"},[t._v(t._s(t.User.mobile))])])],1),t._v(" "),s("group",{staticStyle:{"margin-top":"-2px"},attrs:{gutter:"0"}},[s("cell",{attrs:{title:"我的收藏本",link:"collect"}},[s("i",{staticClass:"icon iconfont icon-my_collection",staticStyle:{color:"#4cc0be"},attrs:{slot:"icon"},slot:"icon"})]),t._v(" "),s("cell",{attrs:{title:"我的习题册",link:"myBook"}},[s("i",{staticClass:"icon iconfont icon-my_exercisebook",staticStyle:{color:"#4cc0be"},attrs:{slot:"icon"},slot:"icon"})]),t._v(" "),s("cell",{attrs:{title:"邀请好友","is-link":""},nativeOn:{click:function(e){t.showAction=!0}}},[s("i",{staticClass:"icon iconfont icon-share",staticStyle:{color:"#4cc0be"},attrs:{slot:"icon"},slot:"icon"})]),t._v(" "),s("cell",{attrs:{title:"设置",link:"settings"}},[s("i",{staticClass:"icon iconfont icon-settingfull",staticStyle:{color:"#4cc0be"},attrs:{slot:"icon"},slot:"icon"})]),t._v(" "),s("cell",{attrs:{title:"消息通知",link:"message"}},[s("i",{staticClass:"icon iconfont icon-comment2",staticStyle:{color:"#4cc0be"},attrs:{slot:"icon"},slot:"icon"}),t._v(" "),t.News.correct||t.News.system?s("badge"):t._e()],1),t._v(" "),"IOS"!=t.System&&"3.7.0"!==t.User.version?s("cell",{attrs:{title:"版本更新","is-link":""},nativeOn:{click:function(e){t._openStore(e)}}},[s("i",{staticClass:"icon iconfont icon-gengxin",staticStyle:{color:"#4cc0be"},attrs:{slot:"icon"},slot:"icon"}),t._v(" "),s("badge")],1):t._e()],1),t._v(" "),s("share",{attrs:{change:t.showAction,showAction:t.showAction,content:t.share.content,title:t.share.title,href:t.share.href},on:{"update:change":function(e){t.showAction=e}}})],1)},m=[],g={render:f,staticRenderFns:m},p=g,v=s("VU/8"),_=v(u,p,!1,null,null,null);e.default=_.exports}});