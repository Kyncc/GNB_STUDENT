<template>
<view-box v-ref:view-box class='user vux-scroller-header-box'>
  <div style="height:46px;">
    <x-header :left-options="{showBack: false}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">个人中心<a slot="right" v-touch:tap="_quit">退出</a></x-header>
  </div>
  <scroller lock-x v-ref:scroller height="-46px">
    <div>
      <div class="info">
        <img class="defaultimg" src="../../assets/user/defaultimg.png" alt="" />
        <p class="phone">15812341234</p>
        <div class="upload" v-touch:tap="_upload">
          上传头像
        </div>
      </div>
      <group style="padding-bottom:100px;">
        <cell title="个人资料" link="../user/info/">
          <span class="icon icon-info" slot="icon"></span>
        </cell>
        <!-- <cell title="我的教材" link="../user/textBook/">
          <span class="icon icon-textbook" slot="icon"></span>
        </cell> -->
        <cell title="我的班级" link="../user/class/">
          <span class="icon icon-class" slot="icon"></span>
        </cell>
        <cell title="我的会员" link="../user/member/">
          <span class="icon icon-member" slot="icon"></span>
        </cell>
        <cell title="邀请好友" link="../user/invite/">
          <span class="icon icon-invite" slot="icon"></span>
        </cell>
        <cell title="设置" link="../user/settings/">
          <span class="icon icon-settings" slot="icon"></span>
        </cell>
        <cell title="修改密码" link="../user/resetPwd/">
          <span class="icon icon-resetPwd" slot="icon"></span>
        </cell>
      </group>
    </div>
  </scroller>
  <actionsheet :show.sync="showsheet" cancel-text="取消" :menus="menus" @on-click-menu="_uploadclick" show-cancel></actionsheet>
  <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="确定退出当前登陆账号么" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>

  <ul id="files" style="display:none;">

  </ul>

</view-box>
</template>

<script>
import {XHeader,Cell,Group,Confirm,Scroller,Actionsheet,ViewBox} from 'vux'
import {quitToken} from '../actions.js'
import {fetchToken } from '../../user/getters.js'
import * as _ from '../../config/whole.js'

export default {
  components: {
    XHeader,Cell,Group,Confirm,Scroller,Actionsheet,ViewBox
  },
  vuex:{
    actions:{
        quitToken
    },
    getters:{
        fetchToken
    }
  },
  methods: {
    onAction(type) {
        if(type=='确认'){
            this.quitToken({token:this.fetchToken},()=>{
                this.$router.replace('/')
            })
        }else{

        }
    },
    _quit(){
        this.show = true
    },
    _upload(){
        this.showsheet = true
    },
    _uploadclick (key) {
        var server = "http://demo.dcloud.net.cn/helloh5/uploader/upload.php";
		var files = [];
        var index = 1;
         if(key == 'menu2'){
             plus.gallery.pick(function(p) {
                var fe = document.getElementById("files");
				var li = document.createElement("li");
				var n = p.substr(p.lastIndexOf('/') + 1);
				li.innerText = n;
				fe.appendChild(li);
				files.push({
					name: "uploadkey" + index,
					path: p
				});
				index++;
                var task = plus.uploader.createUpload(server, {
						method: "POST"
					},
					function(t, status) {
						if(status == 200) {
                            _.toast('上传成功' + t.responseText)
							plus.storage.setItem("uploader", t.responseText);

						} else {
                            _.toast('上传失败'+ status)
						}
					}
				);
				task.addData("client", "HelloH5+");
				task.addData("uid", Math.floor(Math.random() * 100000000 + 10000000).toString());
				for(var i = 0; i < files.length; i++) {
					var f = files[i];
					task.addFile(f.path, {
						key: f.name
					});
				}
				task.start();
			});
           }
         }
  },
  data(){
    return {
      show: false,
      showsheet: false,
      menus: {
        menu2: '从相册选择'
      },
    }
  },
  ready () {
    this.$nextTick(() => {
      this.$refs.scroller.reset()
    })
  }
}
